import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

export default {
  init(container, initialState) {

    const rootReducer = reducer.init(container);
    const store       = createStoreWithMiddleware(rootReducer, initialState);

    return store;
  }
};
