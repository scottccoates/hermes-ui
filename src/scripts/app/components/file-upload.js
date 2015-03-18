'use strict';

import React from 'react';

import ComponentProvider from 'src/lib/components/component-provider';

import Dropzone from 'dropzone';
import Immutable from 'immutable';

// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false;

export default function FileUploaderProvider(DropzoneFactory) {

  const component = React.createClass({

    propTypes: {
      onDrop: React.PropTypes.func.isRequired,
      url: React.PropTypes.string.isRequired,
      style: React.PropTypes.object
    },

    _configureProps() {
      const propsMap = Immutable.Map(this.props);

      this._dropzoneOptions = propsMap.filter((v, k)=>k in Dropzone.prototype.defaultOptions);
      this._componentOptions = propsMap.filter((v, k)=> !(k in this._dropzoneOptions));
    },

    componentWillMount() {
      this._configureProps();
    },

    componentDidMount() {
      // remember to use non-arrow function here because that would bind it to undefined and then `this` wouldn't work.
      this.dropzone = DropzoneFactory.get(this.getDOMNode(), this._dropzoneOptions.toJS());
    },

    componentWillUnmount() {
      this.dropzone.destroy();
      this.dropzone = null;
    },

    render() {
      return (
          <form {...this._componentOptions.toJS()}>
            <div className="dz-message">
            {this.props.children}
            </div>
          </form>
      );
    }
  });

  return new ComponentProvider(component);
};
