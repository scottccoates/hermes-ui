import _ from 'lodash';
import isEmpty from '../functions/is-empty';

function transformValue(obj, transformFunc = _.identity) {
  // default params kick in when param is undefined
  return transformFunc(obj);
}

export function normalizeFormValues(obj, transform = {}) {
  const formData = Object.keys(obj).reduce((accum, current)=> {

    // set all empty strings to null
    // this is so that when we send the data over to the server, we're passing NULL over as opposed to falsy values
    // like empty strings.

    const currentData = obj[current];
    let value;

    if (isEmpty(currentData)) {
      value = null;
    }
    else {
      value = transformValue(currentData, transform[current]);
    }

    accum[current] = value;

    return accum;
  }, {});

  return formData;
}
