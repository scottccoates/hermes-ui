import config from './common';

import DependencyProvider from '../scripts/libs/dependency-injection/utils/dependency-provider';

import * as constants from './constants';

import LoglevelErrorLogger from '../scripts/libs/js-utils/logging/loglevel-error-logger';

import devStore from '../scripts/apps/app-layout/messaging/redux/dev-store';

export default {
  init(){
    const container = config.init();

    container.register(constants.LOG_LEVEL, "debug");

    container.register(constants.ERROR_LOGGER, LoglevelErrorLogger);

    container.register(constants.APP_STORE_CONFIG, new DependencyProvider(devStore));

    return container;
  }
}
