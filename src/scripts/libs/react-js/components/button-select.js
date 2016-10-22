'use strict';

import React from 'react';

import isEmpty from '../../js-utils/functions/is-empty';

export default React.createClass({
  displayName: "ButtonSelect",
  propTypes: {
    className: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
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

    let selectedItem = null;

    if (!isEmpty(this.props.value)) {
      // https://github.com/JedWatson/react-select/blob/master/src%2FSelect.js#L79
      // Following their lead - it's ok to not provide value.
      // Consider first render when values aren't available.

      // The problem here is that .values doesn't contain a value until the second render
      // this.props.values || initialValue
      // https://github.com/erikras/redux-form/issues/547
      // https://github.com/erikras/redux-form/issues/621
      selectedItem = this.props.items.find(item => item.value === this.props.value).label;
    }

    return (
      <div className="btn-group">
        <button type='button' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                className={this.props.className}>
          {selectedItem}
          <i className="fa fa-caret-down space-left middle"></i>
        </button>
        <ul className="dropdown-menu">
          {items}
        </ul>
      </div>
    );
  }
});
