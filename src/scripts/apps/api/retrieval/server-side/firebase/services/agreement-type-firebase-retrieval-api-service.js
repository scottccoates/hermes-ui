import firebaseService from './firebase-service.js';

import storeObserver from 'src/scripts/libs/redux-js/store/store-observer';

import agreementEnums from 'src/scripts/apps/formatting/agreement/agreement-enums';

export default {
  init(container, store, rootRef) {
    const state  = store.getState();
    const user   = state.session.user;
    const userId = user.appMetadata.hermes.userId;

    const agreementTypeActions = container.get('AgreementTypeActions');

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const agreementTypesRef = rootRef.child(`users-agreement-types/${userId}/`);

    agreementTypesRef.on("value", snapshot => {

      try {
        const agreementTypes = firebaseService.prepareCollection(snapshot);

        agreementTypeActions.userAgreementTypesReceived(agreementTypes);
      }
      catch (error) {
        throw new Error(`Error providing agreement type data from firebase: Inner exception: ${error.stack}`);
      }
    }, error => {
      throw new Error(`Error retrieving agreement type data from firebase: Inner exception: ${error.stack}`);
    });
  }
};
