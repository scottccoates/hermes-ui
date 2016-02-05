import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';
import actionBinder from 'src/scripts/libs/redux-js/actions/action-binder';

export default function (appStore, alertService) {

  let alertActions = {

    userAlertsReceived(alerts){
      return {
        type: constants.USER_ALERTS_RECEIVED,
        alerts
      };
    }

  };

  alertActions = actionBinder.bindActionCreatorsToStore(alertActions, appStore);

  return alertActions;
};
