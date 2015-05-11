'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/scripts/libs/react-js/components/component-provider';

const {Link} = Router;

import cx from 'classnames';

const activityTypeIcons = {
  "amend": "fa-edit",
  "comment": "fa-comment-o",
  "create": "fa-plus-square-o"
};

export default function () {

  const component = React.createClass({
    render() {
      const classes = cx('fa', activityTypeIcons[this.props.activityType]);

      return (
        <div className="activity-item">

          <div className="simple-container simple-container-bottom">

            <div className="col-sm-1 activity-action">
              <i className={classes}></i>
            </div>

            <div className="col-sm-1">
              <img alt="activity profile image" className="activity-profile-image"
                   src={this.props.actorImage}/>
            </div>

            <div className="col-sm-22 activity-content">
              <span>
                <a href="#"><strong><span>{this.props.actorName}</span></strong></a>
                <span> {this.props.activityTypeDisplayName} </span>
                <a href="#">{this.props.activitySubject}</a>
                <span> {this.props.activityAction}</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
  });

  return new ComponentProvider(component);
};
