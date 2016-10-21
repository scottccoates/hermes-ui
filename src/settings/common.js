import Intravenous from 'intravenous';
import SessionActions from '../scripts/apps/session/messaging/actions/session-actions';

import * as constants from './constants';

export default {
  init(){
    const container = Intravenous.create();

    container.register(constants.SESSION_ACTIONS, SessionActions);
    container.register(constants.SESSION_SERVICE,  _=>({
      async resumeSession(){
        throw new Error('error');
      }
    }));

    SessionActions.$inject = [constants.APP_STORE, constants.SESSION_SERVICE];

    return container;
  }
};
