import { combineReducers } from 'redux';
export default {
  init(container) {

    const sessionReducer            = container.get("SessionReducer").dependency;
    const agreementEditReducer      = container.get("AgreementEditReducer").dependency;
    const agreementDetailReducer    = container.get("AgreementDetailReducer").dependency;
    const userAgreementsReducer     = container.get("UserAgreementsReducer").dependency;
    const userAgreementTypesReducer = container.get("UserAgreementTypesReducer").dependency;
    const userCounterpartiesReducer = container.get("UserCounterpartiesReducer").dependency;
    const advancedSearchReducer     = container.get("AdvancedSearchReducer").dependency;

    const rootReducer = combineReducers({
      session: sessionReducer,
      agreementEdit: agreementEditReducer,
      agreementDetail: agreementDetailReducer,
      userAgreements: userAgreementsReducer,
      userAgreementTypes: userAgreementTypesReducer,
      userCounterparties: userCounterpartiesReducer,
      advancedSearch: advancedSearchReducer
    });

    return rootReducer;
  }
};
