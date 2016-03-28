import React from 'react';

export default function formWrapper(wrapped, defaults) {
  // https://github.com/erikras/redux-form/issues/176
  // redux-form doesn't yet have a convenient way to both provide initial values (from state) AND
  // provide default values (in the case that no value, including initial values, were provided)

  const WrappedElement = wrapped;

  const component = React.createClass({
    displayName: "FormWrapperComponent",

    shouldComponentUpdate: function (nextProps, nextState) {
      let retVal = true;
      // https://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate
      // this prevents the form from being "reset" if someone
      // is editing it and that agreement data is concurrently changed in firebase. it'd wipe out their work.
      // we probably don't need realtime sync on an edit form.
      if (nextProps.initialValues && nextProps.initialValues.id) {
        retVal = nextProps.initialValues.id !== this.props.initialValues.id;
      }

      return retVal;
    },

    render() {
      const initialValuesWithDefaults = Object.assign({}, defaults, this.props.initialValues);

      const newProps = Object.assign({}, this.props, {initialValues: initialValuesWithDefaults});
      return <WrappedElement {...newProps}/>;
    }
  });

  return component;
}
