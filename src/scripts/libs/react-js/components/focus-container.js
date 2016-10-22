'use strict';

import React from 'react';

import OnClickOutside from 'react-onclickoutside';

export default React.createClass({
  displayName: "FocusContainer",

  propTypes: {
    handleClickOutside: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      handleClickOutside: function () {
      }
    }
  },

  componentWillReceiveProps(nextProps){
    // https://github.com/Pomax/react-onclickoutside/blob/73457d7e2ac10ac8678d771b1c2b3f8a4fcdc316/index.js#L84
    // allow props to determine if listening
    //todo look here ----> if (nextProps.disableOnClickOutside) {
    //  this.disableOnClickOutside();
    //}
    //else {
    //  this.enableOnClickOutside();
    //}
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
