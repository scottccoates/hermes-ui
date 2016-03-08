export function normalizeFormValues(obj) {
  const formData = Object.keys(obj).reduce((accum, current)=> {

    // set all empty strings to null
    // https://github.com/facebook/react/issues/2533
    const currentData = obj[current];
    let value;

    if (currentData == 0) {
      value = currentData;
    }
    else {
      value = currentData ? currentData : null;
    }

    accum[current] = value;

    return accum;
  }, {});

  return formData;
}
