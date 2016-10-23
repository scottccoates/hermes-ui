import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import advancedSearchReducer from '../../../search/messaging/reducers/advanced-search-reducer';

import sessionReducer from '../../../session/messaging/reducers/session-reducer';

import userAgreementTypesReducer from '../../../../domain/agreement-type/messaging/reducers/user-agreement-types-reducer';
import userCounterpartiesReducer from '../../../../domain/counterparty/messaging/reducers/user-counterparties-reducer';
import userInfoReducer from '../../../../domain/user/messaging/reducers/user-info-reducer';
import userSmartViewsReducer from '../../../../domain/smart-view/messaging/reducers/user-smart-views-reducer';

const rootReducer = combineReducers({
  // routing
  routing: routerReducer,

  // domain
  advancedSearch: advancedSearchReducer,

  session: sessionReducer,

  userAgreementTypes: userAgreementTypesReducer,
  userCounterparties: userCounterpartiesReducer,
  userInfo: userInfoReducer,
  userSmartViews: userSmartViewsReducer,

});

export default rootReducer;
