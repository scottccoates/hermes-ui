'use strict';

// This is needed for returning a react component from an IoC container. This is because the IoC container loops through
// all props and appends them to the `InjectedInstance`. The problem though, is that React.createElement calls
// the constructor function of the provided type. We cannot pass in the `InjectedInstance` to React.
function ComponentProvider(componentType) {
  this.componentType = componentType;
}

export default ComponentProvider;
