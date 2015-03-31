'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/components/component-provider';

const {Link} = Router;

const cx = React.addons.classSet;

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

          <div className="simple-container">

            <div className="col-sm-2">
              <i className={classes}></i>
            </div>

            <div className="col-sm-22 task-content">
              <span>{this.props.taskName}</span>
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
      );
    }
  });

  return new ComponentProvider(component);
};
