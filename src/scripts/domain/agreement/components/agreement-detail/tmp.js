import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function () {


  class Component extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.displayName = 'Tmp';
    }

    render() {
      return (
        <div id="tmp-wrapper">
          HELLO fdsf!!!!
        </div>
      );
    }

  }

  return new DependencyProvider(Component);

}
