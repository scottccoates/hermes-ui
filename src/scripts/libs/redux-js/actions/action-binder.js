import { bindActionCreators } from 'redux';

export default {
  bindActionCreatorsToStore(actionCreators, store){
    const retVal = bindActionCreators(actionCreators, store.dispatch);

    return retVal;
  }
};
