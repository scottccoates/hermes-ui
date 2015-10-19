'use strict';

import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import ReactDND from 'react-dnd';

const {DragDropMixin} = ReactDND;

import cx from 'classnames';

export default React.createClass({
  displayName: "AdvancedApolloSearchFieldToken",
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(register) {

      register('item', {

        dragSource: {

          beginDrag(component) {
            component.setState({isDragging: true});

            return {
              item: {
                token: component.props.token
              }
            };
          },

          endDrag(component) {
            // https://github.com/gaearon/react-dnd/issues/9
            // Nodes removed from the DOM are not given a 'dragEnd' event, so react-DND fires this for the cleanup.
            // Our node is removed from the DOM when the apollo token is grouped.
            // This probably happens because we actually remove these nodes (below, `acceptDrop`). I'm guessing that because
            // react sometimes does batch updates, these nodes aren't given time to properly clean up and therefore
            // this function is only called because of the dnd cleanup (look for function `if removed from dom node`.
            if (component.isMounted()) {
              // Note `isMounted` is possibly deprecated: https://facebook.github.io/react/docs/component-api.html#ismounted
              component.setState({isDragging: false});
            }
          }
        },

        dropTarget: {
          acceptDrop(component, item) {
            // setTimeout is here so that the Drag and Drop endDrag event handlers can fire/clean up before both tokens are
            // removed from the DOM. Otherwise they'll fire once the components are removed from the DOM which is not
            // allowed for unmounted components.
            setTimeout(component.props.onItemDrop.bind(null, item.token, component.props.token));
          }
        }
      });
    }
  },

  getInitialState() {
    return {isDragging: false};
  },

  render() {
    const dropState = this.getDropState('item');

    const scalarTokenType = typeof this.props.token === "string";

    const classes = cx({
      'search-field-apollo-token': true,
      'search-field-apollo-token-scalar': scalarTokenType,
      'search-field-apollo-token-composite': !scalarTokenType,
      'drop-available': !this.state.isDragging && dropState.isDragging, //only make other tokens change style
      'drop-hovering': dropState.isHovering
    });

    var apolloToken;

    if (scalarTokenType) {
      apolloToken = (
        <span className='search-field-apollo-text'>
          {this.props.token}
        </span>
      );
    }
    else {
      apolloToken = (

        <span>
          <span className='search-field-apollo-token search-field-apollo-token-scalar'>
            <span className='search-field-apollo-text'>
            {this.props.token[0]}
            </span>
          </span>
          <DropdownButton bsSize='xsmall' bsStyle='default' title='Within same sentence as' noCaret>
            <MenuItem eventKey='1'>Action</MenuItem>
            <MenuItem eventKey='2'>Another action</MenuItem>
            <MenuItem eventKey='3'>Something else here</MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey='4'>Separated link</MenuItem>
          </DropdownButton>
          <span className='search-field-apollo-token search-field-apollo-token-scalar'>
            <span className='search-field-apollo-text'>
            {this.props.token[1]}
            </span>
          </span>
        </span>


      );
    }

    return (
      <span {...this.dropTargetFor('item')} className={classes}>
        <span className='search-field-apollo-drag' {...this.dragSourceFor('item')}>
          <i className='fa fa-ellipsis-v'></i>
          <i className='fa fa-ellipsis-v'></i>
        </span>
        {apolloToken}
      </span>
    );
  }
});
