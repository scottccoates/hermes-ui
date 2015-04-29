'use strict';

import React from 'react';
import Bacon from 'bacon';
import ReactBacon from 'react-bacon';

const cx = React.addons.classSet;

export default React.createClass({
  displayName: "HeaderAdvancedDateSearchField",
  mixins: [ReactBacon.BaconMixin],

  getInitialState() {
    return {
      textValue: ""
    };
  },

  componentWillMount() {
    const clickStream = this.eventStream('onClick');
    clickStream.subscribe(()=> {
      // we need to wait until render has finished before we can set focus to this as its currently hidden.
      setTimeout(()=>React.findDOMNode(this.refs.fieldInput).focus());
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
