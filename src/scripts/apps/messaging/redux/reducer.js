import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

// todo get other reducers from IoC container? will they ever need injected deps? this leads to a fundamental question -
// who controls logic and deps - the actions or reducers in redux? in my app, i have actions worry about it (in which case, do reducers still need the IoC?)
// or should reducer worry about it (that is how slingshot does it.)
const rootReducer = combineReducers({
  routing: routerReducer
});

export default rootReducer;
