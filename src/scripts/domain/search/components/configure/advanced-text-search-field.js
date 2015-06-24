'use strict';

import React from 'react';
import Bacon from 'bacon';
import ReactBacon from 'react-bacon';

import cx from 'classnames';

export default React.createClass({
  displayName: "AdvancedTextSearchField",
  mixins: [ReactBacon.BaconMixin],

  getInitialState() {
    return {
      isFocused: false,
      textValue: ""
    };
  },

  componentWillMount() {
    const clickStream = this.eventStream('onClick');

    const blurStream = this.eventStream('onBlur');
    blurStream.subscribe(()=>this.setState({isFocused: false}));

    const changeStream = this.eventStream('onChange');

    const textValue = changeStream
      .map('.target.value.trim')
      .debounce(350);

    this.plug(textValue, 'textValue');
  },

  render() {
    const classes = cx({'search-field': true, 'focused': this.state.isFocused, 'empty': !this.state.textValue});
    const iconClasses = cx('fa', this.props.iconClass);
    return (
      <div className={classes} onClick={this.onClick}>
        <i className={iconClasses}></i>
        <span className="search-field-label">{this.props.fieldLabel}</span>
        <span className="search-field-value">
          <span className="search-field-text-value">{this.state.textValue}</span>
          <input type="text" ref="fieldInput" className="search-field-text-input-value form-control" onBlur={this.onBlur} onChange={this.onChange} />
        </span>
      </div>
    );
  }
});
