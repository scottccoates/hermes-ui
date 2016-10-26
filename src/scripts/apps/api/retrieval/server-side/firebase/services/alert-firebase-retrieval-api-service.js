import firebaseService from './firebase-service.js';

import storeObserver from 'src/scripts/libs/redux-js/store/store-observer';

import {dateFromTimestamp} from 'src/scripts/libs/js-utils/type/date-utils';

import agreementEnums from 'src/scripts/apps/formatting/agreement/agreement-enums';

export default {
  init(container, store, rootRef) {
    const state  = store.getState();
    const meta   = state.session.meta;
    const userId = meta.appMetadata.hermes.userId;

    const alertActions = container.get('AlertActions');

    // let's not worry about opening/closing connection for sidebar. just assume that we can always keep this open
    // because it's always displayed.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const alertListRef = rootRef.child(`users-alerts/${userId}/`);

    alertListRef.on("value", snapshot => {

      try {
        let userAlerts = firebaseService.prepareCollection(snapshot);
        userAlerts.forEach(userAlert=> {
          userAlert.dueDate = dateFromTimestamp(userAlert.dueDate);
        });

        // don't store expired alerts
        const now  = new Date();
        userAlerts = userAlerts.filter(userAlert => userAlert.dueDate >= now);

        alertActions.userAlertsReceived(userAlerts);
      }
      catch (error) {
        throw new Error(`Error providing alert list data from firebase: Inner exception: ${error.stack}`);
      }
    }, error => {
      throw new Error(`Error retrieving alert list data from firebase: Inner exception: ${error.stack}`);
    });
  }
};
