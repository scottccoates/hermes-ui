'use strict';

import React from 'react';
import Router  from 'react-router';
import Reflux from 'reflux';

import ComponentProvider from 'src/libs/components/component-provider';

import DataTransitionMixin from 'src/libs/react-js/mixins/data-transition-mixin';

import TaskActions from 'src/aggregates/task/actions/actions';

import ActivityActions from 'src/aggregates/activity/actions/actions';

const {Link} = Router;


export default function (taskListProvider, taskListStore, activityListProvider, activityListStore) {
  const TaskList = taskListProvider.componentType;
  const ActivityList = activityListProvider.componentType;

  const dataActions = [
    [TaskActions.loadTasks, () => !taskListStore.data.size, (data)=>console.log('hi data', data)],
    [ActivityActions.loadActivities, () => !activityListStore.data.size, (data)=>console.log('hi data', data)]
  ];

  const component = React.createClass({
    mixins: [
      Reflux.connect(taskListStore, "tasks"), //this providers getInitialState
      Reflux.connect(activityListStore, "activities"), //this providers getInitialState
      DataTransitionMixin.connect(dataActions)
    ],

    render() {
      return (
          <div id="dashboard-wrapper">

            <div className="section">
              <div className="container">
                <h1 className="page-header">Dashboard</h1>
                <TaskList tasks={this.state.tasks}/>
              </div>
            </div>

            <div className="section alt-section activity-list-section">
              <div className="container">
                <div className="section-container">
                  <ActivityList activities={this.state.activities}/>
                </div>
              </div>
            </div>

          </div>
      );
    }
  });
  return new ComponentProvider(component);
};
