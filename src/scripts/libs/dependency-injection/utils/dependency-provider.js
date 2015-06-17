'use strict';


/*
 Any function returned from a registered IoC item is treated as a factory: https://github.com/RoyJacobs/intravenous/blob/6aa2f184d37021f350d02cc98fff320a60ac5be7/src/container.js#L318
 That means if you were passed a ReactComponent dependency, you'd have to call something like: myReactComponent.get();

 This is needed for returning a react component from an IoC container. This is because the IoC container loops through
 all props and appends them to the `InjectedInstance`. The problem though, is that React.createElement calls
 the constructor function of the provided type. We cannot pass in the `InjectedInstance` to React.
 */
function DependencyProvider(dependency) {
  this.dependency = dependency;
}

export default DependencyProvider;
