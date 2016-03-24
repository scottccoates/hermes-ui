const agreementListItem1 = {
  id: "wd4SUp",
  name: "Licensing Agreement Between Microsoft and Hermes, Inc. for Microsoft Office Suite Products",
  counterparty: "Microsoft",
  image: "/assets/images/client-side/microsoft-logo.jpg",
  status: "Active",
  type: "Licensing Agreement",
  outcomeDate: '12/31/2016',
  modifiedDate: '06/01/2015',
  documentCount: 2
};

const agreementListItem2 = {
  id: "z5KyMg",
  name: "Licensing Agreement Between Hermes Inc. and Adobe for Adobe Master Suite",
  counterparty: "Adobe",
  image: "/assets/images/client-side/adobe-logo.jpg",
  status: "Expired",
  type: "Licensing Agreement",
  outcomeDate: '06/01/2015',
  modifiedDate: '07/01/2015',
  documentCount: 2
};

const agreementDetail1 = {
  id: "wd4SUp",
  name: "Licensing Agreement Between Microsoft and Hermes, Inc. for Microsoft Office Suite Products",
  counterparty: "Microsoft",
  type: "Licensing Agreement",
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
  type: "Licensing Agreement",
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

  init(store) {
    const agreementActions     = store.getActions('AgreementActions');
    const agreementDetailStore = store.getStore('AgreementDetailStore');

    // keep track of state as the store will emit multiple changes.
    this.currentRequestedAgreementEdit = {id: null};

    // let's not worry about opening/closing connection for dashboard. just assume that we can always keep this open
    // because it's probably a frequently-visited screen.
    setTimeout(agreementActions.agreementListReceived.bind(agreementActions, listData));

    agreementDetailStore.on('change', _=> {
      // we don't need to do this the very first time (store.state will be null).
      if (agreementDetailStore.state.requestedAgreementDetail.id) {

        // we only care when the store emits a requestedAgreement change.
        // the store will simply change state as a result of this action, and we don't really need to worry about that.
        if (this.currentRequestedAgreementEdit.id !== agreementDetailStore.state.requestedAgreementDetail.id) {

          this.currentRequestedAgreementEdit.id = agreementDetailStore.state.requestedAgreementDetail.id;

          const detail = Array.find(detailData, d => d.id === this.currentRequestedAgreementEdit.id);

          setTimeout(agreementActions.agreementDetailReceived.bind(agreementActions, detail));
        }
      }
    });

  }
};
