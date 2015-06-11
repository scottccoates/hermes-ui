import TestUtils from 'react/lib/ReactTestUtils';


/**
 * https://github.com/facebook/react/pull/3755
 * Finds the instances of components with id equal to `componentId`, or
 * throws exception if there is any other number of matches besides one.
 * @return {!ReactComponent} The one match
 */
const findRenderedDOMComponentWithId = function (root, componentId) {
  var all = TestUtils.findAllInRenderedTree(root, function (inst) {
    return TestUtils.isDOMComponent(inst) &&
      inst.props.id === componentId;
  });

  if (all.length !== 1) {
    throw new Error(
      'Did not find exactly one match for componentId:' + componentId
    );
  }
  return all[0];
};

export default {findRenderedDOMComponentWithId};
