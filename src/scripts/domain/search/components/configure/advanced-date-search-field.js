'use strict';

import React from 'react';
import Bacon from 'bacon';
import ReactBacon from 'react-bacon';

import cx from 'classnames';

export default React.createClass({
  displayName: "AdvancedDateSearchField",
  mixins: [ReactBacon.BaconMixin],

  getInitialState() {
    return {
      textValue: ""
    };
  },

  componentWillMount() {
    const clickStream = this.eventStream('onClick');
    clickStream.subscribe(()=> {
    });

    const changeStream = this.eventStream('onChange');

    const textValue = changeStream
      .map('.target.value.trim');

    this.plug(textValue, 'textValue');
  },

  render() {
    const classes = cx({'search-field': true, 'empty': !this.state.textValue});
    const iconClasses = cx('fa', this.props.iconClass);
    return (
      <div className={classes} onClick={this.onClick}>
        <i className={iconClasses}></i>
        <span className="search-field-label">{this.props.fieldLabel}</span>
        <input type="text" ref="fieldInput" value={this.state.textValue}
               className="search-field-date-input-value form-control" onChange={this.onChange}/>
        <button className="btn btn-sm btn-default search-field-button">Days</button>
      </div>
    );
  }

});
