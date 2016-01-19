import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';
import actionBinder from 'src/scripts/libs/redux-js/actions/action-binder';

export default function (appStore, agreementTypeService) {

  let agreementActions = {

    userAgreementTypesReceived(agreementTypes){
      return {
        type: constants.USER_AGREEMENT_TYPES_RECEIVED,
        agreementTypes
      };
    }
  };

  agreementActions = actionBinder.bindActionCreatorsToStore(agreementActions, appStore);

  return agreementActions;
};
