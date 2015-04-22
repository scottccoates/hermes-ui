'use strict';

import React from 'react';
import ReactBootstrap from 'react-bootstrap';

const {DropdownStateMixin} = ReactBootstrap;

export default React.createClass({
  displayName: "Dropdown",
  mixins: [DropdownStateMixin],

  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  componentWillMount() {
    /*
     the dropdownmixin was originally designed to keep state internally and dicate if it should displayed or not.
     Now, we're encapsulating the dropdown and assuming a parent will consume this, and pass props down. Therefore,
     we don't really need any state at all. Removing all state will make things easier to debug.
     */
    this.replaceState({});
  },

  componentDidMount() {
    function setDropdownState(newState, onStateChangeComplete) {
      if (newState) {
        this.bindRootCloseHandlers();
      } else {
        this.unbindRootCloseHandlers();
        this.props.onClose();
      }
    }

    delete this.setDropdownState;
    this.setDropdownState = setDropdownState;
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.open != this.props.open) {
      // this could happen if this component has many dropdown siblings and one of them was activiated but not this one.
      // if that's the case, do not change the bind/unbind handlers and don't notify parent that it has closed.
      this.setDropdownState(nextProps.open);
    }
  },

  render() {
    if (this.props.noContainer) {
      return (
        this.props.children
      );
    }
    else {
      return (
        <div style={{display: this.props.open ? "block" : "none"}}>
          {this.props.children}
        </div>
      );
    }
  }
});
