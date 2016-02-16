'use strict';

import React from 'react';

import Bacon from 'baconjs';
import ReactBacon from 'react-bacon';

import cx from 'classnames';

import Select from 'react-select';

export default React.createClass({
  displayName: "AdvancedSelectSearchField",
  mixins: [ReactBacon.BaconMixin],

  getInitialState() {
    return {
      isFocused: false
    };
  },

  componentWillMount() {
    const clickStream = this.eventStream('onClick');
    clickStream.onValue(event=> {
      this.setState({isFocused: true});

      const fieldInput = this.refs.fieldInput;

      if (!fieldInput.state.isOpen) {

        // persist prevents the following warning
        // Warning: This synthetic event is reused for performance reasons. If you're seeing this, you're calling `stopPropagation` on a released/nullified synthetic event. This is a no-op. See https://fb.me/react-event-pooling for more information.
        event.persist();

        setTimeout(_=> {
          fieldInput.handleMouseDown(event);
        });

      }
    });

    const blurStream = this.eventStream('onBlur');
    blurStream.subscribe(()=>this.setState({isFocused: false}));
  },

  render() {
    const classes     = cx({'search-field': true, 'focused': this.state.isFocused, 'empty': !this.props.value});
    const iconClasses = cx('fa', this.props.iconClass);

    var valueLabel;
    if (this.props.value && this.props.options.length) {
      // check that both the value and options exist
      // there will times when the page first loads on the search screen where the userAgreementTypes (for example) haven't all
      // been populated even though the parameters have already arrived
      valueLabel = this.props.options.find(item => item.value === this.props.value).label;
    }

    return (
      <div className={classes} onClick={this.onClick}>
        <i className={iconClasses}></i>
        <span className="search-field-label">{this.props.fieldLabel}</span>
        <span className="search-field-value">
          <span className="search-field-text-value">{valueLabel}</span>
          <Select ref='fieldInput'
                  className='search-field-text-input-value'
                  placeholder={null}
                  options={this.props.options}
                  value={this.props.value}
                  onBlur={this.onBlur}
                  onChange={this.props.onChange}/>
        </span>
      </div>
    );
  }
});
