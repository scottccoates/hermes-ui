'use strict';

import React from 'react';
import nanoScroller from 'nanoscroller';
import $ from 'jquery';

export default React.createClass({
  componentDidMount() {
    // remember to use non-arrow function here because that would bind it to undefined and then `this` wouldn't work.

    var scrollContainer = $(this.refs['scroll-container'].getDOMNode());

    scrollContainer.nanoScroller();
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
