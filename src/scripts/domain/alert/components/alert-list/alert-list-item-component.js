'use strict';

import React from 'react';

import moment from 'moment';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import {Link}  from 'react-router';

import cx from 'classnames';

const alertTypeIcons = {
  "expiration": "fa-exclamation-circle",
  "outcomeNotice": "fa-calendar"
};

const alertTypeMessages = {
  "expiration": "will expire",
  "outcomeNotice": "requires an outcome notice"
};

export default function () {

  const component = React.createClass({
    displayName: "AlertListItemComponent",

    render() {
      const classes = cx('fa', alertTypeIcons[this.props.alert.alertType]);

      const alertTypeMessage = alertTypeMessages[this.props.alert.alertType];
      const time             = moment(this.props.alert.dueDate).diff(moment(), 'days');
      const message          = `${alertTypeMessage} in ${time} days.`;

      return (

        <div className="alert-item">
          <div className="simple-container">
            <div className='row'>
              <div className="col-sm-2">
                <i className={classes}></i>
              </div>

              <div className="col-sm-22 alert-content">
                <Link to={`/agreements/${this.props.alert.agreementId}`}>
                  {this.props.alert.agreementName}
                </Link> {message}
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
