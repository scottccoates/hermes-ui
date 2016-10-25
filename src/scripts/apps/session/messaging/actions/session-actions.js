import * as constants from '../../../../../settings/constants';
import log from 'loglevel';
import actionBinder from '../../../../libs/redux-js/actions/action-binder';

export default function (appStore, sessionService) {

  function _loginSuccessAction(loginInformation) {
    return {
      type: constants.LOGIN_SUCCESS,
      loginInformation
    };
  }

  function _logoutSuccessAction() {
    return {
      type: constants.LOGOUT_SUCCESS
    };
  }

  function _sessionResumedSuccessAction(loginInformation) {
    return {
      type: constants.RESUME_SESSION_SUCCESS,
      loginInformation
    };
  }

  function _sessionResumedFailureAction(error) {
    log.info("SessionActions: Session error: %s", error.stack);
    return {
      type: constants.RESUME_SESSION_FAILURE,
      error
    };
  }

  let sessionActions = {

    login(token, keepAliveSessionFunc){
      return async dispatch => {

        const loginInfo = await sessionService.login(token, keepAliveSessionFunc);
        dispatch(_loginSuccessAction(loginInfo));
      };
    },

    resumeSession(keepAliveSessionFunc){
      return async dispatch => {

        try {
          const loginInformation = await sessionService.resumeSession(keepAliveSessionFunc);
          dispatch(_sessionResumedSuccessAction(loginInformation));
        }
        catch (e) {
          // this will happen if we can't resume a session (first time here, logged out, etc). It's ok.
          dispatch(_sessionResumedFailureAction(e));
        }
      };
    },

    logout()
    {
      return dispatch => {
        sessionService.logout();
        dispatch(_logoutSuccessAction());
      };
    }

  };

  sessionActions = actionBinder.bindActionCreatorsToStore(sessionActions, appStore);

  return sessionActions;
}
