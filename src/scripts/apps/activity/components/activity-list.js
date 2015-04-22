'use strict';

import React from 'react';
import ReactAddons from 'react/addons';

import Router  from 'react-router';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

import Immutable from 'immutable';

import ComponentProvider from 'src/libs/react-js/components/component-provider';

import Separator from 'src/libs/react-js/components/separator';

const {Link} = Router;
const ReactCSSTransitionGroup = ReactAddons.addons.CSSTransitionGroup;

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
            <div className="section-item" key={activity.id}>
              <ActivityItem activityType={activity.activityType} actorName={activity.actorName} activityContent={activity.activityContent}/>
            </div>
        );
      }).toJS();

      return (
          <div id="activity-list-wrapper">
            <section className="row">
              <div className="col-sm-24">
                <h3 className="section-header">Recent Activity</h3>

                <ReactCSSTransitionGroup transitionName="content" transitionLeave={false}>
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
