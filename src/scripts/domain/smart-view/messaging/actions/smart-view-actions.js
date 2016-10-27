import * as constants from '../../../../../settings/constants';

import log from 'loglevel';

import actionBinder from '../../../../libs/redux-js/actions/action-binder';

export default function (appStore, smartViewService) {

  function _smartViewSavedSuccessAction(smartView) {
    return {
      type: constants.SMART_VIEW_SAVE_SUCCESS,
      smartView
    };
  }

  function _smartViewSaveedFailureAction(error) {
    log.info("SmartViewActions: SmartView save error: %s", (error.stack || error));

    setTimeout(_=>alert('There was an error saving the smartView.'));

    return {
      type: constants.SMART_VIEW_SAVE_FAILURE,
      error
    };
  }

  let smartViewActions = {

    userSmartViewsReceived(smartViews){
      return {
        type: constants.USER_SMART_VIEWS_RECEIVED,
        smartViews
      };
    },

    selectSmartViewEdit(smartView){
      return {
        type: constants.SMART_VIEW_EDIT_SELECTED,
        smartView
      };
    },

    clearSmartViewEdit(){
      return {
        type: constants.SMART_VIEW_EDIT_CLEAR
      };
    },

    saveSmartView(smartViewData){
      return async dispatch => {

        try {
          await smartViewService.saveSmartView(smartViewData);
          dispatch(_smartViewSavedSuccessAction(smartViewData));
        }
        catch (e) {
          dispatch(_smartViewSaveedFailureAction(e));
        }
      };
    },

    deleteSmartView(smartView){
      alert('coming soon');
      return {
        type: 'temp constant'
      };
    }

  };

  smartViewActions = actionBinder.bindActionCreatorsToStore(smartViewActions, appStore);

  return smartViewActions;
}
