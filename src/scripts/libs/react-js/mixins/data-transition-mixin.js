import Actions from '../actions/react-js-actions';

const noop = ()=> true;

async function doTransition(asyncAction, dataFetchCondition = noop) {
  if (dataFetchCondition()) {
    return Actions.performAsyncAction(asyncAction);
  }
}

function dataTransitionMixin(dataActions) {

  const retVal = {

    statics: {

      asyncTransition(params) {
        // params is passed in from the router, state.params
        const actions = dataActions.reduce((accum, dataAction)=> {
          accum.push(doTransition(...dataAction));
          return accum;
        }, []);

        return actions;
      }
    }
  };

  return retVal;
}

export default {connect: dataTransitionMixin};
