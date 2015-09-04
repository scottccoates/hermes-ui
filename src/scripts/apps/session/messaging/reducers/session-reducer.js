import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import * as constants from 'src/scripts/apps/messaging/common/constants'

const defaultState = {
  loggedIn: false,
  token: null,
  user: null
};

export default function () {
  function sessionReducer(state = defaultState, action = null) {
    // if state is `undefined` it'll used the default param
    // redux docs don't provide action with a default param, but I think this is more appropriate
    // refer to https://app.asana.com/0/10235149247655/47787389428342

    var retVal;

    switch (action.type) {

      case constants.LOGIN_SUCCESS:
      case constants.RESUME_SESSION_SUCCESS:
        retVal = Object.assign({}, state, action.loginInformation, {loggedIn: true});
        break;

      default:
        retVal = state;
        break;
    }

    return retVal;
  }

  return new DependencyProvider(sessionReducer);
}
