/*
 This might have to wait a bit. It's confusing with async. Consider:

 logWrapper(log.info, "Get third part auth for user: %s", user.nickname, async ()=> {
   user = await authService.getThirdPartyAuth(token);
 });

 */

export default function (logMethod, msg, args = [], wrapped = null) {
  logMethod("Beginning: ", msg, ...args);
  wrapped();
  logMethod("Completed: ", msg, ...args);
};
