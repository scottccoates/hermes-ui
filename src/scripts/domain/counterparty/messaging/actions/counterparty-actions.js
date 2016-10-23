import * as constants from 'src/scripts/apps/messaging/common/constants';
import log from 'loglevel';
import actionBinder from 'src/scripts/libs/redux-js/actions/action-binder';

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
