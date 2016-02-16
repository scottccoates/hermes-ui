import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import * as constants from 'src/scripts/apps/messaging/common/constants'

const defaultState = {
  agreement: {id: null},
  requestedAgreement: {id: null}
};

export default function () {
  function agreementEditReducer(state = defaultState, action = null) {
    // if state is `undefined` it'll used the default param
    // redux docs don't provide action with a default param, but I think this is more appropriate
    // refer to https://app.asana.com/0/10235149247655/47787389428342

    var retVal;

    switch (action.type) {

      case constants.AGREEMENT_EDIT_REQUESTED:
        retVal = Object.assign({}, state, {requestedAgreement: {id: action.agreementId}});
        break;

      case constants.AGREEMENT_EDIT_RECEIVED:
        retVal = Object.assign({}, state, {agreement: action.agreement});
        break;

      case constants.AGREEMENT_EDIT_SPECIFY_AGREEMENT_TYPE:
        const agreement = Object.assign({}, state.agreement, {typeId: action.agreementType.agreementTypeId});
        retVal          = Object.assign({}, state, {agreement});
        break;

      default:
        retVal = state;
        break;
    }

    return retVal;
  }

  return new DependencyProvider(agreementEditReducer);
}
