import firebaseService from './firebase-service.js';

import storeObserver from 'src/scripts/libs/redux-js/store/store-observer';

import {dateFromTimestamp, ymdFormat} from 'src/scripts/libs/js-utils/type/date-utils';

import agreementEnums from 'src/scripts/apps/formatting/agreement/agreement-enums';

export default {
  init(container, store, rootRef) {
    const state  = store.getState();
    const meta   = state.session.meta;
    const userId = meta.appMetadata.hermes.userId;

    const userActions = container.get('UserActions');

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const userInfoRef = rootRef.child(`users/${userId}`);

    userInfoRef.on("value", snapshot => {

      try {
        const userInfo = firebaseService.prepareObject(snapshot);
        userActions.userInfoReceived(userInfo);
      }
      catch (error) {
        throw new Error(`Error providing user info data from firebase: Inner exception: ${error.stack}`);
      }
    }, error => {
      throw new Error(`Error retrieving user info data from firebase: Inner exception: ${error.stack}`);
    });
  }
};
