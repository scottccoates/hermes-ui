import moment from 'moment';

export function stringToTimestamp(v) {
  if (!v || !v.trim()) {
    throw new Error('Empty date');
  }
  const num = new Date(v);

  // divide by 1000 - most apis (stripe for example) don't expect milliseconds
  // http://stackoverflow.com/questions/10286224/javascript-timestamp-to-python-datetime-conversion
  return num.getTime() / 1000.0;
}

export function dateFromTimestamp(timestamp) {
  // http://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

  const retVal = new Date(timestamp * 1000);
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.

  return retVal;
}

export function ymdFormat(date) {
  const retVal = moment(date).format('YYYY-MM-DD');

  return retVal;
}

