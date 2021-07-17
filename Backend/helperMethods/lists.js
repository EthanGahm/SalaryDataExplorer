// method from : https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
/**
 * This method is used to compare the second elements in two arras and be used as a way to sort them in decreasing order.
 * @param {*} a first list to compare
 * @param {*} b second list to compare
 * @returns a way to sort in descending order
 */
export default function compareSecondColumn(a, b) {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] > b[1] ? -1 : 1;
  }
}
