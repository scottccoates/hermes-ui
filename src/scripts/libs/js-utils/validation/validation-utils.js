export function toNumber(v) {
  // http://react-component.github.io/form-validation/examples/form.html
  var retVal;

  if (typeof(v) == 'number') {
    retVal = v;
  }
  else {
    if (!v || !v.trim()) {
      retVal = undefined;
    }
    else {
      var num = Number(v);
      // num === ' '
      if (!isNaN(num)) {
        num = parseInt(v);
      }
      retVal = isNaN(num) ? v : num;
    }
  }

  return retVal;
}

export function toDate(v) {
  var retVal;

  if (v instanceof Date) {
    retVal = v;
  }
  else {
    if (!v || !v.trim()) {
      retVal = undefined;
    }
    else {
      retVal = new Date(v);
    }
  }

  return retVal;
}
