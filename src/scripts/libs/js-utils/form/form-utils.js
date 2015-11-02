export function normalizeFormValues(obj) {
  const formData = Object.keys(obj).reduce((accum, current)=> {

    // set all empty strings to null
    // https://github.com/facebook/react/issues/2533
    const currentData = obj[current];
    accum[current]    = currentData ? currentData : null;

    return accum;
  }, {});

  return formData;
}
