'use strict';

import React from 'react';

export default React.createClass({
  displayName: "ButtonSelect",
  propTypes: {
    className: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
    onChange: React.PropTypes.func
  },

  setItem(item){
    // follow react-select logic - they fire onChange before setting state
    // https://github.com/JedWatson/react-select/blob/master/src/Select.js
    const value = item.value;

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  },

  render() {

    const items = this.props.items.map(item =>
        <li key={item.value}><a href="javascript:void(0);" onClick={this.setItem.bind(this,item)}>{item.label}</a></li>
    );

    const selectedItem = this.props.items.find(item => item.value === this.props.value);

    return (
      <div className="btn-group">
        <button type='button' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                className={this.props.className}>
          {selectedItem.label}
          <i className="fa fa-caret-down space-left middle"></i>
        </button>
        <ul className="dropdown-menu">
          {items}
        </ul>
      </div>
    );
  }
});
