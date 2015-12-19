import { combineReducers } from 'redux';
export default {
  init(container) {

    const sessionReducer            = container.get("SessionReducer").dependency;
    const agreementEditReducer      = container.get("AgreementEditReducer").dependency;
    const agreementDetailReducer    = container.get("AgreementDetailReducer").dependency;
    const userAgreementsReducer     = container.get("UserAgreementsReducer").dependency;
    const userAgreementTypesReducer = container.get("UserAgreementTypesReducer").dependency;

    const rootReducer = combineReducers({
      session: sessionReducer,
      agreementEdit: agreementEditReducer,
      agreementDetail: agreementDetailReducer,
      userAgreements: userAgreementsReducer,
      userAgreementTypes: userAgreementTypesReducer
    });

    return rootReducer;
  }
};
