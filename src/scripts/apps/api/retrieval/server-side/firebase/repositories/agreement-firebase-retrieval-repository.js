import FirebaseService from '../services/firebase-service.js';

export default {
  init(appFlux, rootRef, user) {
    const agreementActions     = appFlux.getActions('AgreementActions');
    const agreementDetailStore = appFlux.getStore('AgreementDetailStore');

    // keep track of state as the store will emit multiple changes.
    this.currentRequestedAgreementDetail = {id: null};

    this.agreementListRef        = null;
    this.agreementListCallback   = null;
    this.agreementDetailRef      = null;
    this.agreementDetailCallback = null;

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    this.agreementListRef      = rootRef.child(`users/${user.userId}/agreements`);
    this.agreementListCallback = this.agreementListRef.on("value", snapshot => {

      try {
        const data = FirebaseService.prepareCollection(snapshot);

        agreementActions.agreementListReceived(data);
      }
      catch (error) {
        throw new Error(`Error providing agreement list data from firebase: Inner exception: ${error.stack}`);
      }
    }, error => {
      throw new Error(`Error retrieving agreement list data from firebase: Inner exception: ${error.stack}`);
    });

    // todo figure out how to do cleanup before creating a new conn.
    agreementDetailStore.on('change', _=> {
      // we don't need to do this the very first time (store.state will be null).
      if (agreementDetailStore.state.requestedAgreementDetail.id) {
        // we only care when the store emits a requestedAgreement change.
        // the store will simply change state as a result of this action, and we don't really need to worry about that.
        if (this.currentRequestedAgreementDetail.id !== agreementDetailStore.state.requestedAgreementDetail.id) {

          // clean up old connection (this will happen if we look at different agreement details)
          if (this.agreementDetailRef) this.agreementDetailRef.off('value', this.agreementDetailCallback);

          this.currentRequestedAgreementDetail.id = agreementDetailStore.state.requestedAgreementDetail.id;

          this.agreementDetailRef = rootRef.child(`agreement-details/${this.currentRequestedAgreementDetail.id}`);

          this.agreementDetailCallback = this.agreementDetailRef.on('value', snapshot=> {
            try {
              const agreementDetail = FirebaseService.prepareObject(snapshot, "documents");
              agreementActions.agreementDetailReceived(agreementDetail);
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
  },

  close(){
    if (this.agreementListRef) this.agreementListRef.off('value', this.agreementListCallback);
    if (this.agreementDetailRef) this.agreementDetailRef.off('value', this.agreementDetailCallback);
  }
};
