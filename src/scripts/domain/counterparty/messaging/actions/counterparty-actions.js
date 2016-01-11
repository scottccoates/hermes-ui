import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';

export default function (agreementTypeService) {

  const agreementActions = {

    userCounterpartiesReceived(counterparties){
      return {
        type: constants.USER_COUNTERPARTIES_RECEIVED,
        counterparties
      };
    }
  };

  return agreementActions;
};
