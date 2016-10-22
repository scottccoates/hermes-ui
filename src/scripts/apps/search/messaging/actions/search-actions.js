import * as constants from 'src/scripts/apps/messaging/common/constants';
import log from 'loglevel';
import actionBinder from 'src/scripts/libs/redux-js/actions/action-binder';

export default function (appStore, searchService) {

  function _advancedSearchSuccessAction(resultSet) {
    return {
      type: constants.ADVANCED_SEARCH_RESULTS_RECEIVED,
      resultSet
    };
  }

  function _agreementEditedFailureAction(error) {
    log.info("SearchActions: Search error: %s", error.stack);

    setTimeout(_=>alert('There was an error performing the search.'));

    return {
      type: constants.ADVANCED_SEARCH_QUERY_FAILURE,
      error
    };
  }

  let searchActions = {

    specifyAdvancedSearchParameters(parameters){
      return {
        type: constants.ADVANCED_SEARCH_SPECIFY_PARAMETERS,
        parameters
      };
    },

    resetAdvancedSearchParameters(){
      return {
        type: constants.ADVANCED_SEARCH_RESET_PARAMETERS
      };
    },

    performAdvancedSearch(parameters){
      return async dispatch => {

        try {
          const resultSet         = await searchService.advancedSearch(parameters);
          const foundAgreementIds = resultSet.results.map(r => r.id);

          const allUserAgreements  = appStore.getState().userAgreements.agreements;
          const filteredAgreements = allUserAgreements.filter(a => foundAgreementIds.indexOf(a.id) >= 0);
          const newResultSet       = {count: filteredAgreements.length, results: filteredAgreements};
          dispatch(_advancedSearchSuccessAction(newResultSet));
        }
        catch (e) {
          dispatch(_agreementEditedFailureAction(e));
        }
      };
    }

  };

  searchActions = actionBinder.bindActionCreatorsToStore(searchActions, appStore);

  return searchActions;
}
