import rg4js from 'raygun4js';

export default function (apiKey) {

  const raygunLogger = {
    init(){
      rg4js.Raygun.init(apiKey).attach();
    },

    log(){
    }
  };

  return raygunLogger;
};
