'use strict';

import React from 'react';
import {BaconMixin} from 'react-bacon';
import Bacon from 'baconjs';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (searchService) {

  const headerSearch = React.createClass({
    displayName: "SimpleSearchQueryInputBoxComponent",
    mixins: [BaconMixin],

    propTypes: {
      onInputClick: React.PropTypes.func,
      onResultsReceived: React.PropTypes.func,
      onLoading: React.PropTypes.func
    },

    getDefaultProps() {
      return {
        onResultsReceived: ()=> {
        },
        onLoading: ()=> {
        },
        onInputClick: ()=> {
        }
      }
    },

    clear(){
      // tech debt https://app.asana.com/0/10235149247655/79760909338048
      this.refs.input.value = '';
    },

    componentWillMount() {
      function search(query) {
        return Bacon.fromPromise(searchService.simpleSearch(query));
      }

      const inputStream = this.eventStream('onInputChanged')
        .debounce(500)
        .map('.target.value.trim')
        .filter(v => !!v);
      //.skipDuplicates(); // ex would be copy/pasting the same thing in the text box. https://app.asana.com/0/10235149247655/92185394999254

      const searchResults = inputStream.flatMapLatest(search);
      searchResults.onValue(resultSet=> this.props.onResultsReceived(resultSet));

      const awaitingResults = inputStream
        .awaiting(searchResults)
        .debounce(250); // only display loading if it takes more than this amount of time.

      awaitingResults.onValue(awaiting => this.props.onLoading(awaiting));
    },

    render() {

      return (
        <span className='simple-search-query-input-box'>
          <input ref='input' type="text" className="search-box" placeholder="Search" onClick={this.props.onClick}
                 onChange={this.onInputChanged}/>
        </span>
      );
    }
  });
  return new DependencyProvider(headerSearch);
}
