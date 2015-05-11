'use strict';

import React from 'react';

import ComponentProvider from 'src/scripts/libs/react-js/components/component-provider.js!jsx';

import Dropzone from 'dropzone';
import Immutable from 'immutable';

// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false;

export default function (dropzoneFactory) {

  const component = React.createClass({
    propTypes: {
      url: React.PropTypes.string.isRequired,
      onAddedFile: React.PropTypes.func,
      onProgressed: React.PropTypes.func,
      onComplete: React.PropTypes.func,
      style: React.PropTypes.object
    },

    getDefaultProps() {
      return {
        onAddedFile: ()=> {
        },
        onProgressed: (progress)=> {
        },
        onComplete: ()=> {
        }
      }
    },

    _configureProps() {
      const propsMap = Immutable.Map(this.props);

      this._dropzoneOptions = propsMap.filter((v, k)=>k in Dropzone.prototype.defaultOptions);
    },

    componentWillMount() {
      this._configureProps();
    },

    componentDidMount() {
      // remember to use non-arrow function here because that would bind it to undefined and then `this` wouldn't work.
      this.dropzone = dropzoneFactory.get(React.findDOMNode(this), this._dropzoneOptions.toJS());

      this.dropzone.on('addedfile', this.props.onAddedFile);
      this.dropzone.on('totaluploadprogress', this.props.onProgressed);
      this.dropzone.on('queuecomplete', this.props.onComplete);
    },

    componentWillUnmount() {
      this.dropzone.destroy();
      this.dropzone = null;
    },

    render() {
      return (
        <form {...this.props}>
          <div className="dz-message">
            {this.props.children}
          </div>
        </form>
      );
    }
  });

  return new ComponentProvider(component);
};
