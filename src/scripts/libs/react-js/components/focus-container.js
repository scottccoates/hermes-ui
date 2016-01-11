'use strict';

import React from 'react';

import OnClickOutside from 'react-onclickoutside';

export default React.createClass({
  displayName: "FocusContainer",

  mixins: [
    OnClickOutside
  ],

  propTypes: {
    handleClickOutside: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      handleClickOutside: function () {
      }
    }
  },

  componentWillMount(){
    // this was happening because the react-select component was removing its contents before this event would fire.
    // by the time the event fired, the element was already removed from the DOM.
    this._oldHandleClickOutside = this.handleClickOutside;
    this.handleClickOutside     = (evt)=> {
      //http://stackoverflow.com/a/16820058/173957
      if (document.body.contains(evt.target)) {
        return this._oldHandleClickOutside(evt);
      }
    };
  },

  handleClickOutside(){
    this.props.handleClickOutside();
  },

  render() {
    return (
      this.props.children
    );
  }
});
