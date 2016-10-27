import firebaseService from './firebase-service.js';

import * as constants from '../../../../../../../settings/constants';

import storeObserver from '../../../../../../libs/redux-js/store/store-observer';

import agreementEnums from '../../../../../formatting/agreement/agreement-enums';

export default {
  init(container, store, firebase) {
    const state  = store.getState();
    const meta   = state.session.meta;
    const userId = meta.appMetadata.hermes.userId;

    const agreementTypeActions = container.get(constants.AGREEMENT_TYPE_ACTIONS);

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const agreementTypesRef = firebase.database().ref(`users-agreement-types/${userId}/`);

    agreementTypesRef.on("value", snapshot => {

      try {
        const agreementTypes = firebaseService.prepareCollection(snapshot);

        agreementTypeActions.userAgreementTypesReceived(agreementTypes);
      }
      catch (error) {
        throw new Error(`Error providing agreement type data from firebase: Inner exception: ${(error.stack || error)}`);
      }
    }, error => {
      throw new Error(`Error retrieving agreement type data from firebase: Inner exception: ${(error.stack || error)}`);
    });
  }
};
