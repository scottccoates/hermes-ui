import * as constants from '../../../../../settings/constants';
import log from 'loglevel';
import actionBinder from '../../../../libs/redux-js/actions/action-binder';

export default function (appStore, agreementTypeService) {

  let agreementTypeActions = {

    userAgreementTypesReceived(agreementTypes){
      return {
        type: constants.USER_AGREEMENT_TYPES_RECEIVED,
        agreementTypes
      };
    }

  };

  agreementTypeActions = actionBinder.bindActionCreatorsToStore(agreementTypeActions, appStore);

  return agreementTypeActions;
}
