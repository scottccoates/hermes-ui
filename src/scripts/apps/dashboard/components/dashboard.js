'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

import DataTransitionMixin from '../../../libs/react-js/mixins/data-transition-mixin';

import TaskActions from '../../../domain/task/messaging/task-actions';

import ActivityActions from '../../../domain/activity/messaging/activity-actions';

const {Link} = Router;


export default function (taskListProvider, taskListStore, activityListProvider, activityListStore) {
  const TaskList     = taskListProvider.dependency;
  const ActivityList = activityListProvider.dependency;

  const dataActions = [
    [TaskActions.getTasks, () => true],
    [ActivityActions.getActivities, () => true]
  ];

  const component = React.createClass({
    mixins: [DataTransitionMixin.connect(dataActions)],

    render() {
      return (
        <div id="dashboard-wrapper">

          <div className="content-section default-content-section space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Dashboard</h1>
            </div>
          </div>

          <div className="content-section default-content-section space-bottom">
            <div className="container">
              <TaskList tasks={this.state.tasks}/>
            </div>
          </div>

          <div className="content-section alt-content-section space-top space-bottom activity-list-content-section">
            <div className="container">
              <ActivityList activities={this.state.activities}/>
            </div>
          </div>

        </div>
      );
    }
  });
  return new DependencyProvider(component);
};
