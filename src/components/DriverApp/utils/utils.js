export function round(num, dp = 2) {
  var numToFixedDp = Number(num).toFixed(dp);
  return Number(numToFixedDp);
}
