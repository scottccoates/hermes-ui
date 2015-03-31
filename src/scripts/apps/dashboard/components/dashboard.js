'use strict';

import React from 'react';
import Router  from 'react-router';
import Reflux from 'reflux';

import ComponentProvider from 'src/libs/components/component-provider';

import TaskActions from 'src/apps/task/actions/actions';

const {Link} = Router;

export default function (taskListProvider, taskListStore) {

  const TaskList = taskListProvider.componentType;

  const component = React.createClass({
    mixins: [Reflux.connect(taskListStore, "tasks")], //this providers getInitialState

    statics: {
      willTransitionTo(transition, params) {

        if (!taskListStore.data.size) {
          TaskActions.loadTasks().then((data)=> {
            console.log('here are the tasks:', data);
          });
        }
      }
    },

    render() {
      return (
          <div id="dashboard-wrapper" className="container">
            <h1 className="page-header">Dashboard</h1>
            <TaskList tasks={this.state.tasks}/>
          </div>
      );
    }
  });

  return new ComponentProvider(component);
};
