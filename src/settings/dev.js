import config, {constants} from './common';

import LoglevelErrorLogger from '../scripts/libs/js-utils/logging/loglevel-error-logger';

export default {
  init(){
    const container = config.init();

    container.register(constants.LOG_LEVEL, "debug");

    container.register(constants.ERROR_LOGGER, LoglevelErrorLogger);

    return container;
  }
}
