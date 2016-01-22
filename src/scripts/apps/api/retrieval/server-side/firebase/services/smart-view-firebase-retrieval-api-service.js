import firebaseService from './firebase-service.js';

import storeObserver from 'src/scripts/libs/redux-js/store/store-observer';

import {stringify} from 'query-string';

import agreementEnums from 'src/scripts/apps/formatting/agreement/agreement-enums';

export default {
  init(container, store, rootRef) {
    const state  = store.getState();
    const user   = state.session.user;
    const userId = user.appMetadata.hermes.userId;

    const smartViewActions = container.get('SmartViewActions');

    this.agreementEditRef      = null;
    this.agreementEditCallback = null;

    // let's not worry about opening/closing connection for sidebar. just assume that we can always keep this open
    // because it's always displayed.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const smartViewListRef = rootRef.child(`users-smart-views/${userId}/`);

    smartViewListRef.on("value", snapshot => {

      try {
        const userSmartViews = firebaseService.prepareCollection(snapshot);

        userSmartViews.forEach(userSmartView=> {
          userSmartView.query = userSmartView.query || {};

          const queryString = stringify(userSmartView.query);
          userSmartView.url = `/search?${queryString}`;
        });

        store.dispatch(smartViewActions.userSmartViewsReceived(userSmartViews));
      }
      catch (error) {
        throw new Error(`Error providing smart view list data from firebase: Inner exception: ${error.stack}`);
      }
    }, error => {
      throw new Error(`Error retrieving smart view list data from firebase: Inner exception: ${error.stack}`);
    });
  }
};
