import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root-reducer';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

export function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
