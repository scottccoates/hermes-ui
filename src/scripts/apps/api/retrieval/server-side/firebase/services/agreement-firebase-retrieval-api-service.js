import FirebaseService from './firebase-service.js';

export default {
  init(container, store, rootRef) {
    //const agreementActions     = appFlux.getActions('AgreementActions');
    //const agreementDetailStore = appFlux.getStore('AgreementDetailStore');
    const state  = store.getState();
    const user   = state.session.user;
    const userId = user.appMetadata.hermes.userId;

    const agreementActions = container.get('AgreementActions');
    // keep track of state as the store will emit multiple changes.
    this.currentRequestedAgreementEdit = {id: null};

    this.agreementEditRef      = null;
    this.agreementEditCallback = null;

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    // also, we don't need to worry about users logging off, because the whole app will just be refreshed.
    const agreementListRef = rootRef.child(`users/${userId}/agreements`);

    agreementListRef.on("value", snapshot => {

      try {
        const data = FirebaseService.prepareCollection(snapshot);

        //agreementActions.agreementListReceived(data);
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
              const agreementEdit = FirebaseService.prepareObject(snapshot, "documents");
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
    });
  }
};
