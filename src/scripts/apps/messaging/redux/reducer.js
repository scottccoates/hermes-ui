import { combineReducers } from 'redux';
export default {
  init(container) {

    const sessionReducer = container.get("SessionReducer").dependency;

    const rootReducer = combineReducers({
      session: sessionReducer
    });

    return rootReducer;
  }
};
