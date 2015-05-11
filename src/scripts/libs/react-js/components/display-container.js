'use strict';

import React from 'react';

export default React.createClass({
  displayName: "DisplayContainer",
  propTypes: {
    open: React.PropTypes.bool.isRequired
  },
  render() {
    return (
      <div style={{display: this.props.open ? "block" : "none"}}>
        {this.props.children}
      </div>
    );
  }
});
