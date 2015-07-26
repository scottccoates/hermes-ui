import log from 'loglevel';

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

    requestAgreementList(userId) {
      log.info("AgreementActions: Request agreement list for user: %s", userId);

      return userId;
    },

    agreementListReceived(data){
      // in scone, we used 'from_attrs' when saving a prospect from arbitrary data structures
      // do we want free-floating data/json for rendering views? probably yes, very much.
      return agreementService.processAgreementListData(data);
    },

    requestAgreementDetail(agreementId) {
      log.info("AgreementActions: Request agreement detail: %s", agreementId);

      return agreementId;
    },

    agreementDetailReceived(agreementDetail){
      log.info("AgreementActions: Received agreement detail: %s", agreementDetail.id);

      return agreementService.processAgreementDetailData(agreementDetail);
    }

  };

  return agreementActions;
};
