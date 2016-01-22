import firebaseService from './firebase-service.js';

import storeObserver from 'src/scripts/libs/redux-js/store/store-observer';

import {dateFromTimestamp, ymdFormat} from 'src/scripts/libs/js-utils/type/date-utils';

import agreementEnums from 'src/scripts/apps/formatting/agreement/agreement-enums';

export default {
  init(container, store, rootRef) {
    const state  = store.getState();
    const user   = state.session.user;
    const userId = user.appMetadata.hermes.userId;

    const counterpartyActions = container.get('CounterpartyActions');

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const counterpartiesRef = rootRef.child(`users-counterparties/${userId}/`);

    counterpartiesRef.on("value", snapshot => {

      try {
        const counterPartyValues = snapshot.val() || {};
        const userCounterparties = Object.keys(counterPartyValues).map(k => ({id: k, name: k}));

        store.dispatch(counterpartyActions.userCounterpartiesReceived(userCounterparties));
      }
      catch (error) {
        throw new Error(`Error providing counterparty data from firebase: Inner exception: ${error.stack}`);
      }
    }, error => {
      throw new Error(`Error retrieving counterparty data from firebase: Inner exception: ${error.stack}`);
    });
  }
};
