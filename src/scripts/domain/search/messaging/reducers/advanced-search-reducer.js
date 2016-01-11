import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import * as constants from 'src/scripts/apps/messaging/common/constants'

const defaultState = {
  parameters: {
    text: null,
    counterparty: null,
    typeId: null
  }
};

export default function () {
  function advancedSearchReducer(state = defaultState, action = null) {
    // if state is `undefined` it'll used the default param
    // redux docs don't provide action with a default param, but I think this is more appropriate
    // refer to https://app.asana.com/0/10235149247655/47787389428342

    var retVal;

    switch (action.type) {

      case constants.ADVANCED_SEARCH_SPECIFY_PARAMETERS:
        retVal = Object.assign({}, state, {parameters: action.parameters});
        break;

      case constants.ADVANCED_SEARCH_RESET_PARAMETERS:
        retVal = defaultState;
        break;

      default:
        retVal = state;
        break;
    }

    return retVal;
  }

  return new DependencyProvider(advancedSearchReducer);
}
