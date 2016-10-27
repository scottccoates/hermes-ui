import firebaseService from './firebase-service.js';

import * as constants from '../../../../../../../settings/constants';

import storeObserver from '../../../../../../libs/redux-js/store/store-observer';

import {stringify} from 'query-string';

import agreementEnums from '../../../../../formatting/agreement/agreement-enums';

export default {
  init(container, store, firebase) {
    const state  = store.getState();
    const meta   = state.session.meta;
    const userId = meta.appMetadata.hermes.userId;

    const smartViewActions = container.get(constants.SMART_VIEW_ACTIONS);

    // let's not worry about opening/closing connection for sidebar. just assume that we can always keep this open
    // because it's always displayed.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const smartViewListRef = firebase.database().ref(`users-smart-views/${userId}/`);

    smartViewListRef.on("value", snapshot => {

      try {
        const userSmartViews = firebaseService.prepareCollection(snapshot);

        userSmartViews.forEach(userSmartView=> {
          userSmartView.query = userSmartView.query || {};

          const queryString = stringify(userSmartView.query);
          userSmartView.url = `/search?${queryString}`;
        });

        smartViewActions.userSmartViewsReceived(userSmartViews);
      }
      catch (error) {
        throw new Error(`Error providing smart view list data from firebase: Inner exception: ${error.stack}`);
      }
    }, error => {
      throw new Error(`Error retrieving smart view list data from firebase: Inner exception: ${error.stack}`);
    });
  }
};
