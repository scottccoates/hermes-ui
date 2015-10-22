export function toTimestamp(v) {
  if (!v || !v.trim()) {
    throw new Error('Empty date');
  }
  const num = new Date(v);

  // divide by 1000 - most apis (stripe for example) don't expect milliseconds
  // http://stackoverflow.com/questions/10286224/javascript-timestamp-to-python-datetime-conversion
  return num.getTime() / 1000.0;
}
