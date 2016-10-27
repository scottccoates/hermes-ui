import * as constants from '../../../../../settings/constants'
import log from 'loglevel';
import actionBinder from '../../../../libs/redux-js/actions/action-binder';

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
