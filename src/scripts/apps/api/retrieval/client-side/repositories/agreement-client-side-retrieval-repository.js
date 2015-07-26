const agreementListItem1 = {
  id: "wd4SUp",
  name: "Licensing Agreement Between Microsoft and Hermes, Inc. for Microsoft Office Suite Products",
  counterparty: "Microsoft",
  image: "/assets/images/client-side/microsoft-logo.jpg",
  status: "Active",
  type: "Licensing agreement",
  expirationDate: '12/31/2016',
  modifiedDate: '06/01/2015',
  documentCount: 2
};

const agreementListItem2 = {
  id: "z5KyMg",
  name: "Licensing Agreement Between Hermes Inc. and Adobe for Adobe Master Suite",
  counterparty: "Adobe",
  image: "/assets/images/client-side/adobe-logo.jpg",
  status: "Expired",
  type: "Licensing agreement",
  expirationDate: '06/01/2015',
  modifiedDate: '07/01/2015',
  documentCount: 2
};

const agreementDetail1 = {
  id: "wd4SUp",
  name: "Licensing Agreement Between Microsoft and Hermes, Inc. for Microsoft Office Suite Products",
  counterparty: "Microsoft",
  type: "Licensing agreement",
  initialTermLength: '90 Days',
  description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a",
  documents: [
    {
      id: "bE4Au2",
      name: "Master Agreement.pdf",
      url: "xyz.com"
    },
    {
      id: "9T4Ac5",
      name: "Master Agreement.docx",
      url: "xyz.com"
    }
  ]
};

const agreementDetail2 = {
  id: "z5KyMg",
  name: "Licensing Agreement Between Hermes Inc. and Adobe for Adobe Master Suite",
  counterparty: "Adobe",
  type: "Licensing agreement",
  initialTermLength: '3 Years',
  description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a",
  documents: [
    {
      id: "bE4Au2",
      name: "Master Agreement.pdf",
      url: "xyz.com"
    },
    {
      id: "9T4Ac5",
      name: "Master Agreement.docx",
      url: "xyz.com"
    }
  ]
};

const listData   = [agreementListItem1, agreementListItem2];
const detailData = [agreementDetail1, agreementDetail2];

export default {

  init(appFlux) {
    const agreementActions     = appFlux.getActions('AgreementActions');
    const agreementDetailStore = appFlux.getStore('AgreementDetailStore');
    const agreementListStore   = appFlux.getStore('AgreementListStore');

    // keep track of state as the store will emit multiple changes.
    this.currentRequestedAgreementList   = {userId: null};
    this.currentRequestedAgreementDetail = {id: null};

    agreementListStore.on('change', _=> {
      // we don't need to do this the very first time (store.state will be null).
      if (agreementListStore.state.requestedAgreementList.userId) {

        // we only care when the store emits a requestedAgreement change.
        // the store will simply change state as a result of this action, and we don't really need to worry about that.
        if (this.currentRequestedAgreementList.userId !== agreementListStore.state.requestedAgreementList.userId) {

          this.currentRequestedAgreementList.userId = agreementListStore.state.requestedAgreementList.userId;

          // can't do action call within store dispatch, so let's do it on the next tick.
          setTimeout(agreementActions.agreementListReceived.bind(agreementActions, listData));
        }
      }
    });

    agreementDetailStore.on('change', _=> {
      // we don't need to do this the very first time (store.state will be null).
      if (agreementDetailStore.state.requestedAgreementDetail.id) {

        // we only care when the store emits a requestedAgreement change.
        // the store will simply change state as a result of this action, and we don't really need to worry about that.
        if (this.currentRequestedAgreementDetail.id !== agreementDetailStore.state.requestedAgreementDetail.id) {

          this.currentRequestedAgreementDetail.id = agreementDetailStore.state.requestedAgreementDetail.id;

          const detail = Array.find(detailData, d => d.id === this.currentRequestedAgreementDetail.id);

          setTimeout(agreementActions.agreementDetailReceived.bind(agreementActions, detail));
        }
      }
    });

  },
  close(){
    // not sure if we need this method
  }
};
