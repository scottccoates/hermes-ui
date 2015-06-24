import FirebaseService from '../services/firebase-service.js';

export default function (appFlux) {
  const agreementActions = appFlux.getActions('agreementActions');

  return {
    init(rootRef, user) {
      this.child = rootRef.child(`users/${user.user_id}/agreements`);
      this.ref = this.child.on("value", snapshot => {

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
};

