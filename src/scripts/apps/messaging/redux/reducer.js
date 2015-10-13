import { combineReducers } from 'redux';
export default {
  init(container) {

    const sessionReducer       = container.get("SessionReducer").dependency;
    const agreementEditReducer = container.get("AgreementEditReducer").dependency;

    const rootReducer = combineReducers({
      session: sessionReducer,
      agreementEdit: agreementEditReducer
    });

    return rootReducer;
  }
};
