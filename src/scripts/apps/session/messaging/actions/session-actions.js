import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';

export default function (sessionService) {

  function _loginSuccessAction(loginInformation) {
    return {
      type: constants.LOGIN_SUCCESS,
      loginInformation
    };
  }

  function _sessionResumedSuccessAction(loginInformation) {
    return {
      type: constants.RESUME_SESSION_SUCCESS,
      loginInformation
    };
  }

  function _sessionResumedFailureAction(error) {
    log.info("SessionActions: Session error: %s", error.stack);

    return {
      type: constants.RESUME_SESSION_FAILURE,
      error
    };
  }

  const sessionActions = {

    login(token, user){
      return async dispatch => {
        const newUserLoginInformation = await sessionService.login(token, user, sessionActions.resumeSession);
        dispatch(_loginSuccessAction(newUserLoginInformation));
      };
    },

    resumeSession(){
      return async dispatch => {

        try {
          const loginInformation = await sessionService.resumeSession(sessionActions.resumeSession);
          dispatch(_sessionResumedSuccessAction(loginInformation));
        }
        catch (e) {
          // this will happen if we can't resume a session (first time here, logged out, etc). It's ok.
          dispatch(_sessionResumedFailureAction(e));
        }

      };
    }

    //async login(token, user) {
    //  const newUserLoginInformation = await sessionService.login(token, user, this.resumeSession); // needs to be `this` because flummox converts this whole thing to a class
    //
    //  return newUserLoginInformation;
    //},
    //
    //logout() {
    //  const retVal = sessionService.logout();
    //  return retVal;
    //},
    //
    //async resumeSession(){
    //  const loginInformation = await sessionService.resumeSession(this.resumeSession);
    //  return loginInformation;
    //}


  };

  return sessionActions;
};
