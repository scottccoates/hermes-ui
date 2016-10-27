import * as constants from '../../../../../settings/constants';
import log from 'loglevel';
import actionBinder from '../../../../libs/redux-js/actions/action-binder';

export default function (appStore, agreementTypeService) {

  let agreementActions = {

    userCounterpartiesReceived(counterparties){
      return {
        type: constants.USER_COUNTERPARTIES_RECEIVED,
        counterparties
      };
    }
  };

  agreementActions = actionBinder.bindActionCreatorsToStore(agreementActions, appStore);

  return agreementActions;
}
