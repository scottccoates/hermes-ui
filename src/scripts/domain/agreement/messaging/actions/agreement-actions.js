export default function (agreementService) {

  const agreementActions = {

    async save(data) {
      const retVal = await agreementService.create(data);
      return retVal;
    },

    uploadContractBegan(data){
    },

    uploadContractProgressed(progress){
    },

    uploadContractCompleted(data){
    },

    agreementListReceived(data){
      // in scone, we used 'from_attrs' when saving a prospect from arbitrary data structures
      // do we want free-floating data/json for rendering views? probably yes, very much.
      return agreementService.processAgreementCollectionData(data);
    },

    requestAgreementDetails(agreementId) {

      return agreementId;
    },

    agreementDetailDataReceived(data){
      // in scone, we used 'from_attrs' when saving a prospect from arbitrary data structures
      // do we want free-floating data/json for rendering views? probably yes, very much.
      return agreementService.processAgreementCollectionData(data);
    }


  };

  return agreementActions;
};
