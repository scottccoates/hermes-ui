import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';

export default function (agreementService) {

  function _agreementEditedSuccessAction(agreement) {
    return {
      type: constants.EDIT_AGREEMENT_SUCCESS,
      agreement,
      meta: {
        transition: (state, action) => ({
          path: '/dashboard'
        })
      }
    };
  }

  function _agreementEditedFailureAction(error) {
    log.info("AgreementActions: Agreement edit error: %s", error.stack);

    setTimeout(_=>alert('There was an error saving the agreement.'));

    return {
      type: constants.EDIT_AGREEMENT_FAILURE,
      error
    };
  }

  const agreementActions = {

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

    editAgreement(agreementData){
      return async dispatch => {

        try {
          const agreement = await agreementService.editAgreement(agreementData);
          dispatch(_agreementEditedSuccessAction(agreement));
        }
        catch (e) {
          dispatch(_agreementEditedFailureAction(e));
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

  return agreementActions;
};
