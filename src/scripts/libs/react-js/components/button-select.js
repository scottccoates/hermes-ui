'use strict';

import React from 'react';

export default React.createClass({
  displayName: "ButtonSelect",
  propTypes: {
    className: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired
  },

  getInitialState() {
    return {selectedValue: this.props.defaultValue};
  },

  setItem(item){
    this.setState({selectedValue: item.value});
  },

  render() {

    const items = this.props.items.map(item =>
        <li key={item.value}><a href="javascript:void(0);" onClick={this.setItem.bind(this,item)}>{item.label}</a></li>
    );

    const defaultLabel = this.props.items.find(item => item.value === this.state.selectedValue);
    return (
      <div className="btn-group">
        <button type='button' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                className={this.props.className}>
          {defaultLabel.label}
        </button>
        <ul className="dropdown-menu">
          {items}
        </ul>
      </div>
    );
  }
});
