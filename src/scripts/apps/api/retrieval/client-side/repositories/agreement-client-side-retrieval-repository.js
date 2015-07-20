const agreement1 = {
  id: "wd4SUp",
  name: "Licensing Agreement Between Microsoft and Hermes, Inc. for Microsoft Office Suite Products",
  counterparty: "Microsoft",
  image: "/assets/images/client-side/microsoft-logo.jpg",
  status: "Active",
  type: "Licensing agreement",
  expirationDate: '12/31/2016',
  modifiedDate: '6/1/2015',
  documentCount: 2
};

const agreement2 = {
  id: "z5KyMg",
  name: "Licensing Agreement Between Hermes Inc. and Adobe for Adobe Master Suite",
  counterparty: "Adobe",
  image: "/assets/images/client-side/adobe-logo.jpg",
  status: "Expired",
  type: "Licensing agreement",
  expirationDate: '6/1/2015',
  modifiedDate: '7/1/2015',
  documentCount: 4
};

const data = [agreement1, agreement2];

export default {
  init(appFlux) {
    const agreementActions = appFlux.getActions('agreementActions');

    // can't do action call within store dispatch, so let's do it on the next tick.
    setTimeout(_=> {
      agreementActions.agreementsReceived(data);
    });
  },
  close(){
    // not sure if we need this method
  }
};
