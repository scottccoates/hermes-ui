'use strict';

import React from 'react/addons';

import Router  from 'react-router';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

import Immutable from 'immutable';

import ComponentProvider from 'src/scripts/libs/react-js/components/component-provider';

import Separator from 'src/scripts/libs/react-js/components/separator.js!jsx';

const {Link} = Router;
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default function (ActivityItemProvider) {

  const ActivityItem = ActivityItemProvider.componentType;

  const component = React.createClass({
    mixins: [
      ImmutableRenderMixin
    ],

    getDefaultProps() {
      return {"activities": Immutable.List()}
    },

    render() {
      const activityNodes = this.props.activities.map(function (activity) {
        return (
          <div className="content-section-item space-top-sm" key={activity.id}>
            <ActivityItem activityType={activity.activityType} actorName={activity.actorName}
                          actorImage={activity.actorImage}
                          activitySubject={activity.activitySubject} activityAction={activity.activityAction}
                          activityTypeDisplayName={activity.activityTypeDisplayName}/>
          </div>
        );
      });

      return (
        <div id="activity-list-wrapper">
          <section className="row">
            <div className="col-sm-24">
              <h3 className="content-section-header">Recent Activity</h3>

              <ReactCSSTransitionGroup component="div" transitionName="content" transitionLeave={false}>
                {activityNodes}
              </ReactCSSTransitionGroup>

              <Separator/>
            </div>
          </section>
        </div>
      );
    }
  });

  return new ComponentProvider(component);
};
