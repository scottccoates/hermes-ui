import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import storeEnhancer from 'redux-history-transitions';
import reducer from './reducer';

export default {
  init(container, initialState) {

    const history = container.get('History');

    const finalCreateStore = compose(
      storeEnhancer(history)
    )(createStore);

    const createStoreWithMiddleware = applyMiddleware(
      thunkMiddleware
    )(finalCreateStore);

    const rootReducer = reducer.init(container);
    const store       = createStoreWithMiddleware(rootReducer, initialState);

    return store;
  }
};
