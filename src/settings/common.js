import Intravenous from 'intravenous';
import DependencyProvider from '../scripts/libs/dependency-injection/utils/dependency-provider';

import AppLayoutComponent from '../scripts/apps/app-layout/components/app-layout';

import SessionActions from '../scripts/apps/session/messaging/actions/session-actions';

import * as constants from './constants';

export default {
  init(){
    const container = Intravenous.create();

    container.register(constants.APP_LAYOUT_COMPONENT, AppLayoutComponent);

    container.register(constants.SESSION_ACTIONS, SessionActions);
    container.register(constants.SESSION_SERVICE, _=>({
      async resumeSession(){
        throw new Error('error');
      }
    }));

    SessionActions.$inject = [constants.APP_STORE, constants.SESSION_SERVICE];

    return container;
  }
};
