import humps from 'humps';

import log from 'loglevel';
// Store this interval function in the module root, just in case we get references to multiple instances of this service.
// If that happens, there'd be multiple timers running concurrently, surely to make debugging this difficult thing to debug.
let _renewSessionTimeout = null;
export default function (sessionRepository, authService) {

  const sessionService = {
    _prepareMetaObject: function (meta) {
      // auth0 doesn't follow a convention, so user_id is diff than isSocial, etc.
      const data = humps.camelizeKeys(meta);
      return data;
    },

    async login(token, keepAliveSessionFunc){
      const exp = authService.getTokenExp(token);

      let profileInfo = await authService.getProfileInfo(token);
      profileInfo     = this._prepareMetaObject(profileInfo);

      if (!keepAliveSessionFunc) {
        throw new Error('Missing keepAliveSessionFunc');
      }

      try {
        log.info("Beginning: Get third party auth for profileInfo: %s", profileInfo.nickname);

        let thirdPartyAuthInformation = await authService.getThirdPartyAuthToken(token);
        thirdPartyAuthInformation     = this._prepareMetaObject(thirdPartyAuthInformation);

        log.info("Completed: Get third party auth for profileInfo: %s", profileInfo.nickname);

        var newMetaInformation = Object.assign({}, profileInfo, thirdPartyAuthInformation);
      }
      catch (e) {
        throw new Error("Cannot get third party auth: " + e.stack);
      }

      try {
        sessionRepository.saveLoginInfo({tokenInfo: {token, exp}, meta: newMetaInformation});
      }
      catch (e) {
        throw  new Error("Cannot save login info: " + e.stack);
      }

      try {
        var loginInfo = sessionRepository.getLoginInfo();
      }
      catch (e) {
        throw new Error("Cannot retrieve login info after saving: " + e.stack);
      }

      if (_renewSessionTimeout) {
        clearTimeout(_renewSessionTimeout);
      }

      _renewSessionTimeout = setTimeout(keepAliveSessionFunc, 1000 * 60 * 60); // 1 hour // todo don't naively do every hour, do this based on the expiration of the current id token

      return loginInfo;
    },

    logout(){
      // prevent the auto refresh
      if (_renewSessionTimeout) {
        clearTimeout(_renewSessionTimeout);
        _renewSessionTimeout = null;
      }

      try {
        var retVal = sessionRepository.deleteLoginInfo();
      }
      catch (e) {
        throw new Error("Cannot logout: " + e.stack);
      }
      return retVal;
    },

    async renewSession(keepAliveSessionFunc){
      try {
        const loginInfo = sessionRepository.getLoginInfo();

        const currentIdToken = loginInfo.tokenInfo.token;

        log.info("Beginning: Renew auth for user: %s", loginInfo.meta.nickname);
        const renewedAuthToken = await authService.renewAuthToken(currentIdToken);
        log.info("Completed: Renew auth for user: %s", loginInfo.meta.nickname);

        return await sessionService.login(renewedAuthToken, loginInfo.meta, keepAliveSessionFunc);
      }
      catch (e) {
        throw new Error("Cannot renew: " + e.stack);
      }
    },

    async resumeSession(keepAliveSessionFunc){
      try {
        var retVal = sessionRepository.getLoginInfo();

        if (!retVal) {
          throw new Error('login info is missing');
        }

        const tokenExp         = retVal.tokenInfo.exp;
        const expDate          = new Date(tokenExp * 1000);
        const remainingSeconds = (expDate - new Date()) / 1000;

        if (remainingSeconds <= 60) {
          await sessionService.renewSession(keepAliveSessionFunc); // this will fail if they're not logged in or haven't logged in a while.
        }
      }
      catch (e) {
        throw new Error("Cannot resume session: " + e.stack);
      }
      return retVal;
    }
  };

  return sessionService;
}
