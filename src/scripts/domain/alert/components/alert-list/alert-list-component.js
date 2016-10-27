'use strict';

import React from 'react';
import {Link}  from 'react-router';

import Immutable from 'immutable';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import Separator from '../../../../libs/react-js/components/separator';

export default function (alertItemComponent) {

  const AlertItem = alertItemComponent.dependency;

  const component = React.createClass({
    displayName: "AlertListComponent",

    render() {
      const alertNodes = this.props.alerts.map(function (alert) {
        return (
          <div className="content-section-item space-top-sm" key={alert.id}>
            <AlertItem alert={alert}/>
          </div>
        );
      });

      return (
        <div className="agreement-list-wrapper">

          <div className="agreement-list-items">
            {alertNodes}
          </div>

        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
