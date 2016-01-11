'use strict';

import React from 'react';
import {BaconMixin} from 'react-bacon';
import Bacon from 'baconjs';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (searchService) {

  const headerSearch = React.createClass({
    displayName: "SearchQueryInputBoxComponent",
    mixins: [BaconMixin],

    componentWillMount() {
      async function search(searchText) {
        return Bacon.fromPromise(await searchService.search(searchText));
      }

      const inputStream = this.eventStream('onInputChanged')
        .debounce(500)
        .map('.target.value')
        .filter(v => v.trim() !== '')
        .skipDuplicates(); // ex would be copy/pasting the same thing in the text box.

      const searchResults = inputStream.flatMapLatest(search);
      searchResults.onValue(v=>console.log('v', v));

    },

    render() {

      return (
        <span>
          <input type="text" className="search-box" placeholder="Search" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false" onChange={this.onInputChanged}/>
        </span>
      );
    }
  });
  return new DependencyProvider(headerSearch);
}
