'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/react-js/components/component-provider';

const {Link} = Router;

const cx = React.addons.classSet;

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
                   src="/build/assets/images/man-profile-pic.jpg"/>
            </div>

            <div className="col-sm-22 activity-content">
              <span>
                <strong>
                  <span>{this.props.actorName} </span>
                </strong>
                {this.props.activityContent}
              </span>
            </div>
          </div>
        </div>
      );
    }
  });

  return new ComponentProvider(component);
};
