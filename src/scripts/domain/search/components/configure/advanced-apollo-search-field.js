'use strict';

import React from 'react';
import Bacon from 'baconjs';
import ReactBacon from 'react-bacon';

import FocusContainer from '../../../../libs/react-js/components/focus-container';

import TagsInput from 'react-tagsinput';

import ApolloSearchFieldToken from './advanced-apollo-search-field-token';

import cx from 'classnames';

export default React.createClass({
  displayName: "AdvancedApolloSearchField",
  mixins: [ReactBacon.BaconMixin],
  getInitialState() {
    return {
      tags: [],
      isFocused: false,
      textValue: ""
    };
  },

  componentWillMount() {
    const clickStream = this.eventStream('onClick');
    clickStream.subscribe(()=> {
      this.setState({isFocused: true});
    });

    const blurStream = this.eventStream('onBlur');
    //blurStream.subscribe(()=>this.setState({isFocused: false}));
    //blurStream.subscribe(()=>console.log('bur'));

    //const changeStream = this.eventStream('onChange');
    //
    //const textValue = changeStream
    //  .map('.target.value.trim')
    //  .debounce(350);
    //
    //this.plug(textValue, 'textValue');
  },

  transform(tag) {
    return (
      <ApolloSearchFieldToken key={tag} onItemDrop={this.createSearchGroup} token={tag}/>
    );
  },

  createSearchGroup(token1, token2) {
    const keys          = [token1, token2];
    const oldTags       = this.state.tags;
    const remainingTags = oldTags.filter(tagItem => keys.indexOf(tagItem.key) < 0);

    this.setState({tags: remainingTags});

    this.refs.fieldInput.addTag([token1, token2]);
  },

  onFocusOutside(event) {
    this.setState({isFocused: false});
  },

  tagsValidate(tag) {
    return true;
  },

  render() {
    const classes = cx({'search-field': true, 'focused': this.state.isFocused, 'empty': !this.state.tags.length});

    const iconClasses = cx('fa', this.props.iconClass);

    // This is going to provide a class name of
    // `focused search-field-apollo-tagsinput`
    // if it's focused. The problem is that all tags get 'focused' prefixed as well, because react-tags uses classNamespace
    // to generate the class name for the entire hierarchy.
    var tokenClassName = "search-field-apollo";
    if (this.state.isFocused) {
      tokenClassName = "focused " + tokenClassName;
    }

    // If using this `dropdown` component is overkill, or if we really need blur behavior, consider: http://stackoverflow.com/questions/121499/when-onblur-occurs-how-can-i-find-out-which-element-focus-went-to
    return (
      <FocusContainer inFocus={this.state.isFocused} onClose={this.onFocusOutside}>
        <div className={classes} onClick={this.onClick}>
          <i className={iconClasses}></i>
          <span className="search-field-label">{this.props.fieldLabel}</span>

        <span className="search-field-value">
          {/*<TagsInput ref="fieldInput" valueLink={this.linkState('tags')} classNamespace={tokenClassName}
           placeholder={""} onBlur={this.onBlur} transform={this.transform} validate={this.tagsValidate}/>*/}
        </span>

        </div>
      </FocusContainer>
    );
  }
});
