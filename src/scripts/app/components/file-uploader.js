'use strict';

import React from 'react';

import Dropzone from 'dropzone';
import Immutable from 'immutable';

// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false;

export default React.createClass({
  propTypes: {
    onDrop: React.PropTypes.func.isRequired,
    url: React.PropTypes.string.isRequired,
    style: React.PropTypes.object
  },

  _configureProps: function () {
    const propsMap = Immutable.Map(this.props);

    this._dropzoneOptions = propsMap.filter((v, k)=>k in Dropzone.prototype.defaultOptions);
    this._componentOptions = propsMap.filter((v, k)=> !(k in this._dropzoneOptions));
  },

  _uploadFiles: function (files) {
    this.dropzone._finished.call(this.dropzone, files, 'OK', {});
  },

  componentWillMount: function () {
    this._configureProps();
  },

  componentDidMount: function () {
    // remember to use non-arrow function here because that would bind it to undefined and then `this` wouldn't work.
    this.dropzone = new Dropzone(this.getDOMNode(), this._dropzoneOptions.toJS());
    this.dropzone.uploadFiles = this._uploadFiles;
  },

  componentWillUnmount: function () {
    this.dropzone.destroy();
    this.dropzone = null;
  },

  render: function () {
    return (
        <form {...this._componentOptions.toJS()}>
          <div className="dz-message">
            {this.props.children}
          </div>
        </form>
    );
  }
});
