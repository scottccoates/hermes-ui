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

  function _agreementDeletedSuccessAction(agreementId) {
    return {
      type: constants.AGREEMENT_DELETE_SUCCESS,
      agreementId,
      meta: {
        transition: (state, action) => ({
          path: '/dashboard'
        })
      }
    };
  }

  function _agreementDeletedFailureAction(error) {
    log.info("AgreementActions: Agreement delete error: %s", error.stack);

    setTimeout(_=>alert('There was an error deleting the agreement.'));

    return {
      type: constants.AGREEMENT_DELETE_FAILURE,
      error
    };
  }

  function _artifactDeletedSuccessAction(agreementId, artifactId) {
    return {
      type: constants.ARTIFACT_DELETE_SUCCESS,
      agreementId,
      artifactId
    };
  }

  function _artifactDeletedFailureAction(error) {
    log.info("AgreementActions: Artifact delete error: %s", error.stack);

    setTimeout(_=>alert('There was an error deleting the artifact.'));

    return {
      type: constants.ARTIFACT_DELETE_FAILURE,
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
          await agreementService.saveAgreement(agreementData);
          dispatch(_agreementSavedSuccessAction(agreementData));
        }
        catch (e) {
          dispatch(_agreementSavedFailureAction(e));
        }
      };
    },

    deleteAgreement(agreementId){
      return async dispatch => {

        if (window.confirm('Are you sure you want to delete this agreement?')) {

          try {
            await agreementService.deleteAgreement(agreementId);
            dispatch(_agreementDeletedSuccessAction(agreementId));
          }

          catch (e) {
            dispatch(_agreementDeletedFailureAction(e));
          }
        }

      };
    },

    deleteArtifact(agreementId, artifactId){
      return async dispatch => {

        if (window.confirm('Are you sure you want to delete this document?')) {

          try {
            await agreementService.deleteArtifact(agreementId, artifactId);
            dispatch(_artifactDeletedSuccessAction(agreementId, artifactId));
          }

          catch (e) {
            dispatch(_artifactDeletedFailureAction(e));
          }
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
