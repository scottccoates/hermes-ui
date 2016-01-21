'use strict';

import React from 'react';

import Bacon from 'baconjs';
import ReactBacon from 'react-bacon';

import cx from 'classnames';

export default React.createClass({
  displayName: "AdvancedTextSearchField",
  mixins: [ReactBacon.BaconMixin],

  getInitialState() {
    return {
      isFocused: false
    };
  },

  componentWillMount() {
    const clickStream = this.eventStream('onClick');
    clickStream.subscribe(()=> {
      this.setState({isFocused: true});

      // we need to wait until render has finished before we can set focus to this as its currently hidden.
      setTimeout(()=>this.refs.fieldInput.focus());
    });

    const blurStream = this.eventStream('onBlur');
    blurStream.subscribe(()=>this.setState({isFocused: false}));
  },

  onChange(e){
    this.props.onChange(e.target.value);
  },

  render() {
    const classes     = cx({'search-field': true, 'focused': this.state.isFocused, 'empty': !this.props.value});
    const iconClasses = cx('fa', this.props.iconClass);
    return (
      <div className={classes} onClick={this.onClick}>
        <i className={iconClasses}></i>
        <span className="search-field-label">{this.props.fieldLabel}</span>
        <span className="search-field-value">
          <span className="search-field-text-value">{this.props.value}</span>
          <input type="text" ref="fieldInput" className="search-field-text-input-value form-control"
                 onBlur={this.onBlur} onChange={this.onChange} value={this.props.value}/>
        </span>
      </div>
    );
  }
});
