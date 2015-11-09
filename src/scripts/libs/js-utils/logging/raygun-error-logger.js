import rg4js from 'raygun4js';

export default function (apiKey) {

  const raygunLogger = {
    init(){
      rg4js.Raygun.init(apiKey).attach();
    },

    setUser(userId, userEmail, userFullName, userFirstName){
      rg4js.Raygun.setUser(userId, false, userEmail, userFullName, userFirstName);
    },

    log(){
    }
  };

  return raygunLogger;
};
