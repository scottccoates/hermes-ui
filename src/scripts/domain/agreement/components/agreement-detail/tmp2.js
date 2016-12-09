import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default class Component extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.displayName = 'Tmp';
  }

  render() {
    return (
      <div id="tmp-wrapper">
        HELLO
      </div>
    );
  }

}
