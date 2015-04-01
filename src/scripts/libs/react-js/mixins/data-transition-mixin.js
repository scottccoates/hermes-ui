import Actions from 'src/libs/react-js/actions/actions';

const noop = ()=> true;

function doTransition(asyncAction, dataFetchCondition = noop, resolveAction = noop, rejectAction = noop) {

  var retVal;

  if (dataFetchCondition()) {

    Actions.dataTransition();
    retVal = asyncAction();
    retVal.then(Actions.dataTransition.completed);
    retVal.then(resolveAction, rejectAction);
  }

  return retVal;
}


const dataTransitionMixin = (dataActions)=> {

  const retVal = {

    statics: {

      willTransitionTo(transition, params, query, callback) {

        const actions = dataActions.reduce((accum, dataAction)=> {
          accum.push(doTransition(...dataAction));
          return accum;
        }, []);

        Promise.all(actions).then(()=>{
          callback();
        });
      }
    }
  };

  return retVal;
};

export default {connect: dataTransitionMixin};
