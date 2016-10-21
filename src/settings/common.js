import Intravenous from 'intravenous';
import humps from 'humps';

export const constants = {};

function createConstant(constantLabel) {
  constants[humps.decamelize(constantLabel).toUpperCase()] = constantLabel;
}

createConstant("ErrorLogger");
createConstant("LogLevel");

export default {
  init(){
    const container = Intravenous.create();

    return container;
  }
};
