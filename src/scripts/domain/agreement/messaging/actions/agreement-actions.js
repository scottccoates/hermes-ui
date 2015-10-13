import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';

export default function () {

  const agreementActions = {

    requestAgreementEdit(agreementId){
      return {
        type: constants.AGREEMENT_EDIT_REQUESTED,
        agreementId
      };
    }

  };

  return agreementActions;
};
