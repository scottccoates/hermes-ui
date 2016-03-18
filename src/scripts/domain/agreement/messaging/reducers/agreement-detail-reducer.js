import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import * as constants from 'src/scripts/apps/messaging/common/constants'

const defaultState = {
  agreement: {id: null},
  requestedAgreement: {id: null}
};

export default function () {
  function agreementDetailReducer(state = defaultState, action = null) {
    // if state is `undefined` it'll used the default param
    // redux docs don't provide action with a default param, but I think this is more appropriate
    // refer to https://app.asana.com/0/10235149247655/47787389428342

    var retVal;

    switch (action.type) {

      case constants.AGREEMENT_DETAIL_REQUESTED:
        retVal = Object.assign({}, state, {requestedAgreement: {id: action.agreementId}});
        break;

      case constants.AGREEMENT_DETAIL_RECEIVED:
        retVal = Object.assign({}, state, {agreement: action.agreement});
        break;

      case constants.AGREEMENT_DELETE_SUCCESS:
        retVal = Object.assign({}, state, {agreement: {id: null}, requestedAgreement: {id: null}});
        break;

      case constants.ARTIFACT_DELETE_SUCCESS:
        const agreement = state.agreement;

        const {artifacts} = agreement;

        //if (artifacts) {
        const newArtifacts = artifacts.filter(a=>a.id != action.artifactId);
        const newAgreement = Object.assign({}, agreement, {artifacts: newArtifacts});
        retVal             = Object.assign({}, state, {agreement: newAgreement});

        //}

        break;

      default:
        retVal = state;
        break;
    }

    return retVal;
  }

  return new DependencyProvider(agreementDetailReducer);
}
