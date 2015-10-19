export function toNumber(v) {
  if (!v || !v.trim()) {
    return undefined;
  }
  var num = Number(v);
  // num === ' '
  if (!isNaN(num)) {
    num = parseInt(v);
  }
  return isNaN(num) ? v : num;
}
