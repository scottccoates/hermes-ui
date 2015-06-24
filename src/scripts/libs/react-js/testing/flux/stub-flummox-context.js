// https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html

import React from 'react';
import Flummox from 'flummox';

export default (Component, props, stubs, stores = []) => {
  function FluxStub() {
    Flummox.call(this);
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  FluxStub.prototype             = Object.create(Flummox.prototype);
  FluxStub.prototype.constructor = FluxStub;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  Object.assign(FluxStub.prototype, {
    put_some_methods_here: ()=> {
    }
  }, stubs);


  return React.createClass({
    displayName: "StubFluxContext",

    childContextTypes: {
      // https://github.com/acdlite/flummox/blob/0ff1255b4b896d426fb7896f1fc08a9431467ac4/src/addons/reactComponentMethods.js#L230
      flux: React.PropTypes.instanceOf(Flummox)
    },

    getChildContext () {
      const flux = new FluxStub();
      Object.keys(stores).forEach(s => flux.createStore(s, stores[s], this));
      return {
        flux: new FluxStub()
      };
    },

    render () {
      return <Component ref="component" {...props} />
    }
  });
};
