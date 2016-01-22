import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';
import actionBinder from 'src/scripts/libs/redux-js/actions/action-binder';

export default function (appStore, agreementService) {

  function _agreementSavedSuccessAction(agreement) {
    return {
      type: constants.AGREEMENT_SAVE_SUCCESS,
      agreement,
      meta: {
        transition: (state, action) => ({
          path: '/dashboard'
        })
      }
    };
  }

  function _agreementSavedFailureAction(error) {
    log.info("AgreementActions: Agreement edit error: %s", error.stack);

    setTimeout(_=>alert('There was an error saving the agreement.'));

    return {
      type: constants.AGREEMENT_SAVE_FAILURE,
      error
    };
  }

  let agreementActions = {

    userAgreementsReceived(agreements){
      return {
        type: constants.USER_AGREEMENTS_RECEIVED,
        agreements
      };
    },

    requestAgreementEdit(agreementId){
      return {
        type: constants.AGREEMENT_EDIT_REQUESTED,
        agreementId
      };
    },

    agreementEditReceived(agreementEdit){
      return {
        type: constants.AGREEMENT_EDIT_RECEIVED,
        agreement: agreementEdit
      };
    },

    saveAgreement(agreementData){
      return async dispatch => {

        try {
          const agreement = await agreementService.saveAgreement(agreementData);
          dispatch(_agreementSavedSuccessAction(agreement));
        }
        catch (e) {
          dispatch(_agreementSavedFailureAction(e));
        }
      };
    },

    requestAgreementDetail(agreementId){
      return {
        type: constants.AGREEMENT_DETAIL_REQUESTED,
        agreementId
      };
    },

    agreementDetailReceived(agreementDetail){
      return {
        type: constants.AGREEMENT_DETAIL_RECEIVED,
        agreement: agreementDetail
      };
    }

  };

  agreementActions = actionBinder.bindActionCreatorsToStore(agreementActions, appStore);

  return agreementActions;
};
