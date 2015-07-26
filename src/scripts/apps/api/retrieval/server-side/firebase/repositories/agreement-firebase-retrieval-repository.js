import FirebaseService from '../services/firebase-service.js';

export default {
  init(appFlux, rootRef, user) {
    const agreementActions     = appFlux.getActions('AgreementActions');
    const agreementDetailStore = appFlux.getStore('AgreementDetailStore');

    this.agreementDetailRef      = null;
    this.agreementDetailCallback = null;
    //this.agreementListChild = rootRef.child(`users/${user.user_id}/agreements`);
    //this.ref   = this.agreementListChild.on("value", snapshot => {

    //const data = FirebaseService.prepareCollection(snapshot);

    //  agreementActions.agreementListReceived(data);
    //}, error => {
    //  throw new Error(`Error retrieving agreement list data from firebase: Inner exception: ${error}`);
    //});

    // todo figure out how to do cleanup before creating a new conn.
    agreementDetailStore.on('change', agreementId=> {
      this.agreementDetailRef = rootRef.child(`agreement-details/${agreementId}`);

      this.agreementDetailCallback = this.agreementDetailRef.on('value', snapshot=> {
        const agreementDetail = FirebaseService.prepareObject(snapshot);
        agreementActions.agreementDetailReceived(agreementDetail);
      }, error => {
        throw new Error(`Error retrieving agreement detail data from firebase: Inner exception: ${error}`);
      });
    });
  },

  close(){
    //this.agreementListChild.off('value', this.ref);
    this.agreementDetailRef.off('value', this.agreementDetailCallback);
  }
};
