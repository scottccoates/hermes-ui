export default function (sessionService) {

  const sessionActions = {

    async login(token, user) {
      const newUserLoginInformation = await sessionService.login(token, user, this.resumeSession); // needs to be `this` because flummox converts this whole thing to a class

      return newUserLoginInformation;
    },

    async logout() {
      const retVal = await sessionService.logout();
      return retVal;
    },

    async resumeSession(){
      const loginInformation = await sessionService.resumeSession(this.resumeSession);
      return loginInformation;
    }
  };

  return sessionActions;
};
