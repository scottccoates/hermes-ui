'use strict';

import React from 'react';
import Router  from 'react-router';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

import Immutable from 'immutable';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

import Separator from '../../../libs/react-js/components/separator';

const {Link} = Router;

export default function (TaskItemProvider) {

  const TaskItem = TaskItemProvider.dependency;

  const component = React.createClass({
    mixins: [
      ImmutableRenderMixin
    ],

    getDefaultProps() {
      return {"tasks": Immutable.List()}
    },

    render() {
      const taskNodes = this.props.tasks.map(function (task) {
        return (
          <div className="content-section-item space-top-sm" key={task.id}>
            <TaskItem taskSubject={task.taskSubject} taskAction={task.taskAction} taskType={task.taskType}/>
          </div>
        );
      });

      return (
        <div id="task-list-wrapper">
          <section className="row">
            <div className="col-sm-24">
              <h3 className="content-section-header">Upcoming Tasks</h3>
              {taskNodes}
              <Separator/>
            </div>
          </section>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
