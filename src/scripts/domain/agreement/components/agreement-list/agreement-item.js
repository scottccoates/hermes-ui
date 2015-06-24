'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

const {Link} = Router;


export default function () {

  const component = React.createClass({
    displayName: "AgreementItem",
    render() {
      return (

        <div className="agreement-item">
          <div className="simple-container">
            {this.props.agreementName}
          </div>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
