import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';
import actionBinder from 'src/scripts/libs/redux-js/actions/action-binder';

export default function (appStore, agreementTypeService) {

  function _agreementTypeSavedSuccessAction(agreementType) {
    return {
      type: constants.AGREEMENT_TYPE_SAVE_SUCCESS,
      agreementType
    };
  }

  function _agreementTypeSavedFailureAction(error) {
    log.info("AgreementTypeActions: Agreement Type edit error: %s", error.stack);

    setTimeout(_=>alert('There was an error saving the agreement type.'));

    return {
      type: constants.AGREEMENT_TYPE_SAVE_FAILURE,
      error
    };
  }

  let agreementTypeActions = {

    userAgreementTypesReceived(agreementTypes){
      return {
        type: constants.USER_AGREEMENT_TYPES_RECEIVED,
        agreementTypes
      };
    },

    saveAgreementType(agreementTypeData){
      return async dispatch => {

        try {
          const agreementType = await agreementTypeService.saveAgreementType(agreementTypeData);
          dispatch({
            type: constants.AGREEMENT_EDIT_SPECIFY_AGREEMENT_TYPE,
            agreementType
          });
          dispatch(_agreementTypeSavedSuccessAction(agreementType));
        }
        catch (e) {
          dispatch(_agreementTypeSavedFailureAction(e));
        }
      };

    }
  };

  agreementTypeActions = actionBinder.bindActionCreatorsToStore(agreementTypeActions, appStore);

  return agreementTypeActions;
};
