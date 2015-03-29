'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/components/component-provider';

import Actions from 'src/apps/management-item/actions';

const {Link} = Router;

export default function (TaskListProvider) {

  const TaskList = TaskListProvider.componentType;

  const component = React.createClass({
    render() {
      return (
          <div id="dashboard-wrapper" className="container">
            <h1 className="page-header">Dashboard</h1>
            <TaskList/>
          </div>
      );
    }
  });

  return new ComponentProvider(component);
};
