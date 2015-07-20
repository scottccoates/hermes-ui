import FirebaseService from '../services/firebase-service.js';

export default {
  init(appFlux, rootRef, user) {
    const agreementActions = appFlux.getActions('agreementActions');

    this.child = rootRef.child(`users/${user.user_id}/agreements`);
    this.ref   = this.child.on("value", snapshot => {

      const data = FirebaseService.prepareCollection(snapshot);

      agreementActions.agreementsReceived(data);
    }, error => {
      throw new Error(`Error retrieving agreement data from firebase: Inner exception: ${error}`);
    });
  },

  close(){
    this.child.off('value', this.ref);
  }
};
