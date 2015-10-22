import FirebaseService from './firebase-service.js';

export default {
  init(container, store, rootRef) {
    const state  = store.getState();
    const user   = state.session.user;
    const userId = user.appMetadata.hermes.userId;

    const agreementActions = container.get('AgreementActions');
    // keep track of state as the store will emit multiple changes.
    this.currentRequestedAgreementEdit = {id: null};

    this.currentRequestedAgreementDetail = {id: null};

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

    // todo figure out how to do cleanup before creating a new conn.
    store.subscribe(_=> {
      const state = store.getState();

      // we need to do this the very first time (requestedAgreement will be null).
      const requestedAgreementEditId = state.agreementEdit.requestedAgreement.id;

      if (requestedAgreementEditId) {
        if (this.currentRequestedAgreementEdit.id !== requestedAgreementEditId) {
          // clean up old connection (this will happen if we look at different agreement edits)
          if (this.agreementEditRef) this.agreementEditRef.off('value', this.agreementEditCallback);

          this.currentRequestedAgreementEdit.id = requestedAgreementEditId;

          this.agreementEditRef = rootRef.child(`agreement-edits/${this.currentRequestedAgreementEdit.id}`);

          this.agreementEditCallback = this.agreementEditRef.on('value', snapshot=> {
            try {
              const agreementEdit = FirebaseService.prepareObject(snapshot);
              store.dispatch(agreementActions.agreementEditReceived(agreementEdit));
            }
            catch (error) {
              throw new Error(`Error providing agreement edit data from firebase: Inner exception: ${error.stack}`);
            }
          }, error => {
            throw new Error(`Error retrieving agreement edit data from firebase: Inner exception: ${error.stack}`);
          });
        }
      }

      const requestedAgreementDetailId = state.agreementDetail.requestedAgreement.id;

      if (requestedAgreementDetailId) {
        if (this.currentRequestedAgreementDetail.id !== requestedAgreementDetailId) {
          // clean up old connection (this will happen if we look at different agreement edits)
          if (this.agreementDetailRef) this.agreementDetailRef.off('value', this.agreementDetailCallback);

          this.currentRequestedAgreementDetail.id = requestedAgreementDetailId;

          this.agreementDetailRef = rootRef.child(`agreement-details/${this.currentRequestedAgreementDetail.id}`);

          this.agreementDetailCallback = this.agreementDetailRef.on('value', snapshot=> {
            try {
              const agreementDetail = FirebaseService.prepareObject(snapshot, "artifacts");
              store.dispatch(agreementActions.agreementDetailReceived(agreementDetail));
            }
            catch (error) {
              throw new Error(`Error providing agreement detail data from firebase: Inner exception: ${error.stack}`);
            }
          }, error => {
            throw new Error(`Error retrieving agreement detail data from firebase: Inner exception: ${error.stack}`);
          });
        }
      }
    });
  }
};
