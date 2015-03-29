'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/components/component-provider';

import Separator from 'src/libs/components/separator';

const {Link} = Router;

export default function () {

  const component = React.createClass({
    render() {
      return (
          <div id="task-list-wrapper">
            <section className="row section-container">
              <div className="col-sm-24">
                <h3 className="section-header">Upcoming Tasks</h3>
                <div className="section-item">
                  <div className="simple-container">

                    <div className="col-sm-2">
                      <i className="fa fa-calendar"></i>
                    </div>

                    <div className="col-sm-22 task-content">
                      <span>The&nbsp;
                        <a href="#">License Agreement with Microsoft</a>
                      &nbsp;expires in 17 days.</span>

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
                <div className="section-item">
                  <div className="simple-container">

                    <div className="col-sm-2">
                      <i className="fa fa-exclamation-circle"></i>
                    </div>

                    <div className="col-sm-22 task-content">
                      <span>The&nbsp;
                        <a href="#">License Agreement with Bruce Baxter</a>
                      &nbsp;is due for review in 19 days.</span>
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
                <div className="section-item">
                  <div className="simple-container">

                    <div className="col-sm-2">
                      <i className="fa fa-refresh"></i>
                    </div>

                    <div className="col-sm-22 task-content">
                      <span>The&nbsp;
                        <a href="#">License Agreement with Adobe</a>
                      &nbsp;will automatically renew in 2 months.
                        <br/>
                        You need to give notice in 30 days.
                      </span>
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
                <div className="section-item task-list-separator">
                  <Separator/>
                </div>
              </div>
            </section>
          </div>
      );
    }
  });

  return new ComponentProvider(component);
};
