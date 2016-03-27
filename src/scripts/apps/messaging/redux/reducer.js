import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

export default {
  init(container) {

    const sessionReducer            = container.get("SessionReducer").dependency;
    const agreementEditReducer      = container.get("AgreementEditReducer").dependency;
    const agreementDetailReducer    = container.get("AgreementDetailReducer").dependency;
    const userSmartViewsReducer     = container.get("UserSmartViewsReducer").dependency;
    const smartViewEditReducer      = container.get("SmartViewEditReducer").dependency;
    const userAgreementsReducer     = container.get("UserAgreementsReducer").dependency;
    const userAgreementTypesReducer = container.get("UserAgreementTypesReducer").dependency;
    const userCounterpartiesReducer = container.get("UserCounterpartiesReducer").dependency;
    const advancedSearchReducer     = container.get("AdvancedSearchReducer").dependency;
    const userAlertsReducer         = container.get("UserAlertsReducer").dependency;

    const rootReducer = combineReducers({
      form: formReducer,
      session: sessionReducer,
      agreementEdit: agreementEditReducer,
      agreementDetail: agreementDetailReducer,
      userSmartViews: userSmartViewsReducer,
      smartViewEdit: smartViewEditReducer,
      userAgreements: userAgreementsReducer,
      userAgreementTypes: userAgreementTypesReducer,
      userCounterparties: userCounterpartiesReducer,
      advancedSearch: advancedSearchReducer,
      userAlerts: userAlertsReducer
    });

    return rootReducer;
  }
};
