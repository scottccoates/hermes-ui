import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import sessionReducer from '../../../session/messaging/reducers/session-reducer';
import userInfoReducer from '../../../../domain/user/messaging/reducers/user-info-reducer';

const rootReducer = combineReducers({
  // routing
  routing: routerReducer,

  // domain
  session: sessionReducer,
  userInfo: userInfoReducer

});

export default rootReducer;
