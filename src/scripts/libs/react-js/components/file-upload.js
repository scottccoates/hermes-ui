'use strict';

import React from 'react';

import DependencyProvider from './../../dependency-injection/utils/dependency-provider';

import Dropzone from 'dropzone';
import Immutable from 'immutable';

// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false;

export default function (dropzoneFactory) {

  const component = React.createClass({
    propTypes: {
      url: React.PropTypes.string.isRequired,
      paramName: React.PropTypes.string,
      acceptedFiles: React.PropTypes.string,
      headers: React.PropTypes.object,
      onAddedFile: React.PropTypes.func,
      onProgressed: React.PropTypes.func,
      onSuccess: React.PropTypes.func,
      onError: React.PropTypes.func,
      style: React.PropTypes.object
    },

    getDefaultProps() {
      return {
        onAddedFile: ()=> {
        },
        onProgressed: (progress)=> {
        },
        onSuccess: ()=> {
        },
        onError: ()=> {
        }
      }
    },

    _configureProps() {
      const propsMap                         = Immutable.Map(this.props);
      const additionalDefaultDropzoneOptions = {"headers": null};
      const defaultOptions                   = Object.assign({}, additionalDefaultDropzoneOptions, Dropzone.prototype.defaultOptions);

      var dropzoneOptions = propsMap.filter((v, k)=>k in defaultOptions);

      // For some stupid reason, they provide a default implementation of 'addedfile'.
      // It results in a <div> tag containing an image preview.
      dropzoneOptions = dropzoneOptions.set('addedfile', ()=> {
      });

      this._dropzoneOptions = dropzoneOptions;
    },

    componentWillMount() {
      this._configureProps();
    },

    componentDidMount() {
      // remember to use non-arrow function here because that would bind it to undefined and then `this` wouldn't work.
      this.dropzone = dropzoneFactory.get(React.findDOMNode(this), this._dropzoneOptions.toJS());

      this.dropzone.on('addedfile', this.props.onAddedFile);
      this.dropzone.on('totaluploadprogress', this.props.onProgressed);
      this.dropzone.on('success', this.props.onSuccess);
      this.dropzone.on('error', this.props.onError);
    },

    componentWillUnmount() {
      dropzoneFactory.dispose(this.dropzone);

      // I was running into an issue where calling `destroy` below would trigger (in dropzone) file.remove
      // which would further trigger `updateTotalUploadProgress` which would cause issues in react components that were un-mounted.
      // I would not expect `updateTotalUploadProgress` to be triggered simply be calling `destroy`.
      this.dropzone.off('addedfile', this.props.onAddedFile);
      this.dropzone.off('totaluploadprogress', this.props.onProgressed);
      this.dropzone.off('success', this.props.onSuccess);
      this.dropzone.off('error', this.props.onError);

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

  return new DependencyProvider(component);
};
