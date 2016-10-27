import React from 'react';

export default function formWrapper(wrapped, defaults) {
  // https://github.com/erikras/redux-form/issues/176
  // redux-form doesn't yet have a convenient way to both provide initial values (from state) AND
  // provide default values (in the case that no value, including initial values, were provided)

  const WrappedElement = wrapped;

  const component = React.createClass({
    displayName: "FormWrapperComponent",

    getInitialState() {

      // assume that if ID is provided then all values have been provided.
      const retVal = {};

      if (this.props.initialValues && this.props.initialValues.id) {
        retVal.initialValues = this.props.initialValues;
      }

      return retVal;
    },

    componentWillReceiveProps: function (nextProps) {
      if (!this.state.initialValues && nextProps.initialValues && nextProps.initialValues.id) {
        // https://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate
        // this prevents the form from being "reset" if someone
        // is editing it and that agreement data is concurrently changed in firebase. it'd wipe out their work.
        // we probably don't need realtime sync on an edit form.
        this.setState({initialValues: nextProps.initialValues});
      }
      else if (this.state.initialValues && nextProps.initialValues && nextProps.initialValues.id && nextProps.initialValues.id != this.state.initialValues.id) {
        // if we've already assigned old values to state and now receiving a new type of entitiy to display in the form.
        // this can happen when we move to a page, load the form, then get loaded with a new agreement (once firebase sends the event).
        // we `request` an agreement when loading the edit page, but at the very initial render, we're still using the previous
        // forms values.
        this.setState({initialValues: nextProps.initialValues});
      }
    },

    render() {
      const initialValuesWithDefaults = Object.assign({}, defaults, this.state.initialValues);
      const newProps                  = Object.assign({}, this.props, {initialValues: initialValuesWithDefaults});
      const retVal                    = <WrappedElement {...newProps}/>;

      return retVal;
    }
  });

  return component;
}
