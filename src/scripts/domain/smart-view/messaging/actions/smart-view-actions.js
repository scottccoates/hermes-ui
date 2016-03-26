import * as constants from 'src/scripts/apps/messaging/common/constants'
import log from 'loglevel';
import actionBinder from 'src/scripts/libs/redux-js/actions/action-binder';

export default function (appStore, smartViewService) {

  function _smartViewSaveedSuccessAction(smartView) {
    return {
      type: constants.SMART_VIEW_SAVE_SUCCESS,
      smartView
    };
  }

  function _smartViewSaveedFailureAction(error) {
    log.info("SmartViewActions: SmartView save error: %s", error.stack);

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
          dispatch(_smartViewSaveedSuccessAction(smartViewData));
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
};
