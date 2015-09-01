import * as constants from 'src/scripts/apps/messaging/common/constants'

export default function () {

  const sessionActions = {

    resumeSession(){
      return {
        type: constants.RESUME_SESSION
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
