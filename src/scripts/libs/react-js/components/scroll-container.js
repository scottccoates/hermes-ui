'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import nanoScroller from 'nanoscroller';
import $ from 'jquery';

export default React.createClass({
  componentDidMount() {
    this.scrollContainer = $(ReactDOM.findDOMNode(this.refs['scroll-container']));

    this.scrollContainer.nanoScroller();
  },

  componentWillUnmount() {
    this.scrollContainer.nanoScroller({destroy: true});
  },

  render() {
    return (
      <div ref="scroll-container" {...this.props} className="nano">
        <div className="nano-content">
          {this.props.children}
        </div>
      </div>
    )
  }
});
