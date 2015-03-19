'use strict';

import React from 'react';
import Bacon from 'bacon';
import ReactBacon from 'react-bacon';

export default React.createClass({
  mixins: [ReactBacon.BaconMixin],

  componentWillMount() {
    this.eventStream('onClick')
        .map('.target.value')
        .debounce(350)
        .onValue(()=>console.log('oh hai'));
  },

  render() {
    return (
        <span className="header-search">
          <i className="fa fa-search search-icon header-icon"></i>
          <input type="text" onClick={this.onClick} className="search-box" placeholder="Search"/>
        </span>
    );
  }
});
