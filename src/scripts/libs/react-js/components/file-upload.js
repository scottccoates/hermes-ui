'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import humps from 'humps';

import DependencyProvider from './../../dependency-injection/utils/dependency-provider';

import Dropzone from 'dropzone';
import Immutable from 'immutable';

// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false;

export default function (dropzoneFactory) {

  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'FileUploadComponent';
    }

    componentWillMount() {
      this._configureProps();
    }

    componentDidMount() {
      // remember to use non-arrow function here because that would bind it to undefined and then `this` wouldn't work.
      this.dropzone = dropzoneFactory.get(ReactDOM.findDOMNode(this), this._dropzoneOptions.toJS());

      this.dropzone.on('addedfile', this.props.onAddedFile.bind(this));
      this.dropzone.on('totaluploadprogress', this.props.onProgressed.bind(this));
      this.dropzone.on('success', this.onSuccess.bind(this));
      this.dropzone.on('error', this.props.onError.bind(this));
    }

    componentWillUnmount() {
      dropzoneFactory.dispose(this.dropzone);

      // I was running into an issue where calling `destroy` below would trigger (in dropzone) file.remove
      // which would further trigger `updateTotalUploadProgress` which would cause issues in react components that were un-mounted.
      // I would not expect `updateTotalUploadProgress` to be triggered simply be calling `destroy`.
      this.dropzone.off('addedfile', this.props.onAddedFile.bind(this));
      this.dropzone.off('totaluploadprogress', this.props.onProgressed.bind(this));
      this.dropzone.off('success', this.onSuccess.bind(this));
      this.dropzone.off('error', this.props.onError.bind(this));

      this.dropzone.destroy();
      this.dropzone = null;
    }

    _configureProps() {
      const propsMap = Immutable.Map(this.props);

      // these are props you can provide that don't have default values in dropzone.
      const additionalDefaultDropzoneOptions = {headers: null};

      const defaultOptions = Object.assign({}, additionalDefaultDropzoneOptions, Dropzone.prototype.defaultOptions);

      let dropzoneOptions = propsMap.filter((v, k)=>k in defaultOptions);

      // For some stupid reason, they provide a default implementation of 'addedfile'.
      // It results in a <div> tag containing an image preview.
      dropzoneOptions = dropzoneOptions.set('addedfile', ()=> {
      });

      dropzoneOptions = dropzoneOptions.set('uploadMultiple', true);

      this._dropzoneOptions = dropzoneOptions;
    }

    onSuccess(file, response) {
      const newData = humps.camelizeKeys(response);
      this.props.onSuccess(file, newData);
    }

    render() {
      // pass in just the className (as opposed to ...props)
      // because some props are acceptable tag names (like headers)
      // https://facebook.github.io/react/docs/tags-and-attributes.html
      return (
        <form className={this.props.className}>
          <div className="dz-message">
            {this.props.children}
          </div>
        </form>
      );
    }
  }

  Component.propTypes = {
    url: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    paramName: React.PropTypes.string,
    acceptedFiles: React.PropTypes.string,
    headers: React.PropTypes.object,
    onAddedFile: React.PropTypes.func,
    onProgressed: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    onError: React.PropTypes.func,
    style: React.PropTypes.object
  };

  Component.defaultProps = {
    onAddedFile: ()=> {
    },
    onProgressed: ()=> {
    },
    onSuccess: ()=> {
    },
    onError: ()=> {
    }
  };

  return new DependencyProvider(Component);
}
