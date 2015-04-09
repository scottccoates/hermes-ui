'use strict';

import React from 'react';
import Router  from 'react-router';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

import Immutable from 'immutable';

import ComponentProvider from 'src/libs/components/component-provider';

import Separator from 'src/libs/components/separator';

const {Link} = Router;

export default function (TaskItemProvider) {

  const TaskItem = TaskItemProvider.componentType;

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
            <div className="section-item" key={task.id}>
              <TaskItem taskName={task.taskName} taskType={task.taskType}/>
            </div>
        );
      }).toJS();

      return (
          <div id="task-list-wrapper">
            <section className="row">
              <div className="col-sm-24">
                <h3 className="section-header">Upcoming Tasks</h3>
                {taskNodes}
                <Separator/>
              </div>
            </section>
          </div>
      );
    }
  });

  return new ComponentProvider(component);
};
