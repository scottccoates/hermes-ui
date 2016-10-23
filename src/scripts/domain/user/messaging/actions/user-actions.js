import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';
import actionBinder from 'src/scripts/libs/redux-js/actions/action-binder';

export default function (appStore, userService) {

  function _userSubscribedSuccessAction(userId) {
    return {
      type: constants.USER_SUBSCRIBE_SUCCESS,
      userId
    };
  }

  function _userSubscribedFailureAction(error) {
    log.info("UserActions: User subscribe error: %s", error.stack);

    setTimeout(_=>alert('There was an error subscribing.'));

    return {
      type: constants.USER_SUBSCRIBE_FAILURE,
      error
    };
  }


  let userActions = {

    userInfoReceived(userInfo){
      return {
        type: constants.USER_INFO_RECEIVED,
        user: userInfo
      };
    },

    subscribeUser(userId, paymentToken){
      return async dispatch => {

        try {
          await userService.subscribeUser(userId, paymentToken);
          dispatch(_userSubscribedSuccessAction(userId));
        }
        catch (e) {
          dispatch(_userSubscribedFailureAction(e));
        }
      };
    },
  };

  userActions = actionBinder.bindActionCreatorsToStore(userActions, appStore);

  return userActions;
};
