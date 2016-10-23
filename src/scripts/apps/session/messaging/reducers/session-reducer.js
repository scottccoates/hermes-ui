import * as constants from '../../../../../settings/constants';

const defaultState = {
  loggedIn: false,
  token: null,
  meta: null
};

export default function sessionReducer(state = defaultState, action = null) {
  // if state is `undefined` it'll used the default param
  // redux docs don't provide action with a default param, but I think this is more appropriate
  // refer to https://app.asana.com/0/10235149247655/47787389428342

  let retVal;

  switch (action.type) {

    case constants.LOGIN_SUCCESS:
    case constants.RESUME_SESSION_SUCCESS:
      retVal = Object.assign({}, state, action.loginInformation, {loggedIn: true});
      break;

    case constants.LOGOUT_SUCCESS:
      retVal = defaultState;
      break;

    default:
      retVal = state;
      break;
  }

  return retVal;
}
