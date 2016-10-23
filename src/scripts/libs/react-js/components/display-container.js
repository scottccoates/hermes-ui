'use strict';

import React from 'react';

export default class Component extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.displayName = 'DisplayContainerComponent';
  }

  render() {
    return (
      <div className="display-container" style={{display: this.props.open ? "block" : "none"}}>
        {this.props.children}
      </div>
    );
  }
}

Component.propTypes = {
  open: React.PropTypes.bool.isRequired
};
