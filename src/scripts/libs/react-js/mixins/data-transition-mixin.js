import Actions from 'src/scripts/libs/react-js/actions/actions';

const noop = ()=> true;

async function doTransition(asyncAction, dataFetchCondition = noop, resolveAction = noop, rejectAction = noop) {
  if (dataFetchCondition()) {

    Actions.dataTransition();

    try {
      let asyncActionValue = await asyncAction();
      resolveAction(asyncActionValue);
    }
    catch (e) {
      rejectAction(e);
    }

    Actions.dataTransition.completed();
  }
}


const dataTransitionMixin = (dataActions)=> {

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
};

export default {connect: dataTransitionMixin};
