import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';

export default function (agreementTypeService) {

  const agreementActions = {

    userAgreementTypesReceived(agreementTypes){
      return {
        type: constants.USER_AGREEMENT_TYPES_RECEIVED,
        agreementTypes
      };
    }
  };

  return agreementActions;
};
