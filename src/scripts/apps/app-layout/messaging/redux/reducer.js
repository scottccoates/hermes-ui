import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import agreementEditReducer from '../../../../domain/agreement/messaging/reducers/agreement-edit-reducer';
import agreementDetailReducer from '../../../../domain/agreement/messaging/reducers/agreement-detail-reducer';
import userAgreementsReducer from '../../../../domain/agreement/messaging/reducers/user-agreements-reducer';

import advancedSearchReducer from '../../../search/messaging/reducers/advanced-search-reducer';

import sessionReducer from '../../../session/messaging/reducers/session-reducer';

import userAlertsReducer from '../../../../domain/alert/messaging/reducers/user-alerts-reducer';

import userAgreementTypesReducer from '../../../../domain/agreement-type/messaging/reducers/user-agreement-types-reducer';
import userCounterpartiesReducer from '../../../../domain/counterparty/messaging/reducers/user-counterparties-reducer';
import userInfoReducer from '../../../../domain/user/messaging/reducers/user-info-reducer';

import userSmartViewsReducer from '../../../../domain/smart-view/messaging/reducers/user-smart-views-reducer';
import smartViewEditReducer from '../../../../domain/smart-view/messaging/reducers/smart-view-edit-reducer';

const rootReducer = combineReducers({
  // routing
  routing: routerReducer,

  // app
  session: sessionReducer,

  // domain
  agreementEdit: agreementEditReducer,
  agreementDetail: agreementDetailReducer,
  userSmartViews: userSmartViewsReducer,
  smartViewEdit: smartViewEditReducer,
  userAgreements: userAgreementsReducer,
  userAgreementTypes: userAgreementTypesReducer,
  userCounterparties: userCounterpartiesReducer,
  advancedSearch: advancedSearchReducer,
  userAlerts: userAlertsReducer,
  userInfo: userInfoReducer

});

export default rootReducer;
