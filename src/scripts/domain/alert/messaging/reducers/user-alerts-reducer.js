import * as constants from '../../../../../settings/constants'

const defaultState = {
  alerts: []
};

export default function userAlertsReducer(state = defaultState, action = null) {
  // if state is `undefined` it'll used the default param
  // redux docs don't provide action with a default param, but I think this is more appropriate
  // refer to https://app.asana.com/0/10235149247655/47787389428342

  var retVal;

  switch (action.type) {

    case constants.USER_ALERTS_RECEIVED:
      retVal = Object.assign({}, state, {alerts: action.alerts});
      break;

    default:
      retVal = state;
      break;
  }

  return retVal;
}
