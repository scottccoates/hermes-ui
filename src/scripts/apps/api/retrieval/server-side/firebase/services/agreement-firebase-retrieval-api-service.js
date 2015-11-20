import FirebaseService from './firebase-service.js';

import storeObserver from 'src/scripts/libs/redux-js/store/store-observer';

import {dateFromTimestamp, ymdFormat} from 'src/scripts/libs/js-utils/type/date-utils';

export default {
  init(container, store, rootRef) {
    const state  = store.getState();
    const user   = state.session.user;
    const userId = user.appMetadata.hermes.userId;

    const agreementActions = container.get('AgreementActions');

    this.agreementEditRef      = null;
    this.agreementEditCallback = null;

    this.agreementDetailRef      = null;
    this.agreementDetailCallback = null;

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const agreementListRef = rootRef.child(`users/${userId}/dashboard-agreements`);

    agreementListRef.on("value", snapshot => {

      try {
        const data = FirebaseService.prepareCollection(snapshot);

        store.dispatch(agreementActions.userAgreementsReceived(data));
      }
      catch (error) {
        throw new Error(`Error providing agreement list data from firebase: Inner exception: ${error.stack}`);
      }
    }, error => {
      throw new Error(`Error retrieving agreement list data from firebase: Inner exception: ${error.stack}`);
    });

    const agreementEditStream = storeObserver.observeStateStream(store, state=> state.agreementEdit.requestedAgreement.id);

    agreementEditStream.onValue(requestedAgreementEditId=> {

      // clean up old connection (this will happen if we look at different agreement edits)
      if (this.agreementEditRef) this.agreementEditRef.off('value', this.agreementEditCallback);
      this.agreementEditRef      = rootRef.child(`agreement-edits/${requestedAgreementEditId}`);
      this.agreementEditCallback = this.agreementEditRef.on('value', snapshot=> {

        try {
          const agreementEdit = FirebaseService.prepareObject(snapshot);
          if (agreementEdit.executionDate) agreementEdit.executionDate = ymdFormat(dateFromTimestamp(agreementEdit.executionDate));
          store.dispatch(agreementActions.agreementEditReceived(agreementEdit));
        }
        catch (error) {
          throw new Error(`Error providing agreement edit data from firebase: Inner exception: ${error.stack}`);
        }
      }, error => {
        throw new Error(`Error retrieving agreement edit data from firebase: Inner exception: ${error.stack}`);
      });
    });

    const agreementDetailStream = storeObserver.observeStateStream(store, state=> state.agreementDetail.requestedAgreement.id);

    agreementDetailStream.onValue(requestedAgreementDetailId=> {

      // clean up old connection (this will happen if we look at different agreement edits)
      if (this.agreementDetailRef) this.agreementDetailRef.off('value', this.agreementDetailCallback);
      this.agreementDetailRef      = rootRef.child(`agreement-details/${requestedAgreementDetailId}`);
      this.agreementDetailCallback = this.agreementDetailRef.on('value', snapshot=> {
        try {
          const agreementDetail = FirebaseService.prepareObject(snapshot, "artifacts");
          if (agreementDetail.executionDate) agreementDetail.executionDate = ymdFormat(dateFromTimestamp(agreementDetail.executionDate));
          store.dispatch(agreementActions.agreementDetailReceived(agreementDetail));
        }
        catch (error) {
          throw new Error(`Error providing agreement detail data from firebase: Inner exception: ${error.stack}`);
        }
      }, error => {
        throw new Error(`Error retrieving agreement detail data from firebase: Inner exception: ${error.stack}`);
      });
    });
  }
};
