'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

const {Link} = Router;

import cx from 'classnames';

const taskTypeIcons = {
  "expiration": "fa-calendar",
  "review": "fa-exclamation-circle",
  "renew": "fa-refresh"
};

export default function () {

  const component = React.createClass({
    render() {
      const classes = cx('fa', taskTypeIcons[this.props.taskType]);

      return (

        <div className="task-item">
          <div className="simple-container">

            <div className="col-sm-2">
              <i className={classes}></i>
            </div>

            <div className="col-sm-22 task-content">
              <span>The <a href="#">{this.props.taskSubject}</a> {this.props.taskAction}</span>
            </div>

            <div className="col-sm-3 task-action task-action-done">
              Done
            </div>
            <div className="col-sm-3 col-sm-pull-3 task-action task-action-snooze">
              Snooze
            </div>
            <div className="col-sm-3 col-sm-pull-6 task-action task-action-edit">
              Edit
            </div>
          </div>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
