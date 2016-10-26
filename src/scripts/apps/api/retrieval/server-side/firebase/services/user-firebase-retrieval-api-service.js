import firebaseService from './firebase-service.js';

import storeObserver from '../../../../../../libs/redux-js/store/store-observer.js';

import * as constants from '../../../../../../../settings/constants';

export default {
  init(container, store, firebase) {
    const state  = store.getState();
    const meta   = state.session.meta;
    const userId = meta.appMetadata.hermes.userId;

    const userActions = container.get(constants.USER_ACTIONS);

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const userInfoRef = firebase.database().ref(`users/${userId}`);

    userInfoRef.on("value", snapshot => {

      try {
        // todo firebase rules currenlt don't work
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
