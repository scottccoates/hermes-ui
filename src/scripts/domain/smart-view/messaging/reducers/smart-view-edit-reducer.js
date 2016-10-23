import * as constants from '../../../../../settings/constants'

const defaultState = {
  // not following the same pattern for agreement-edit cause we're not loading from firebase - just passing small objects around
  smartView: null
};

export default function smartViewEditReducer(state = defaultState, action = null) {
  // if state is `undefined` it'll used the default param
  // redux docs don't provide action with a default param, but I think this is more appropriate
  // refer to https://app.asana.com/0/10235149247655/47787389428342

  var retVal;

  switch (action.type) {

    case constants.SMART_VIEW_EDIT_SELECTED:
      retVal = Object.assign({}, state, {smartView: action.smartView});
      break;

    case constants.SMART_VIEW_EDIT_CLEAR:
      retVal = Object.assign({}, state, defaultState);
      break;

    default:
      retVal = state;
      break;
  }

  return retVal;
}

