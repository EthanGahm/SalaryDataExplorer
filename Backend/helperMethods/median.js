//median method found here : https://stackoverflow.com/questions/45309447/calculating-median-javascript
/**
 * This method is used to get the median values from a list of salaries
 * @param {*} values a list of values to calculate the median of
 * @returns the median of the list
 */
export default function median(values) {
  if (values.length === 0) return 0;

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}
