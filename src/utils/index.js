// console.log(a);

// import React from "react";

export function isProduction() {
  return global.process.env.NODE_ENV === "production";
}
function binarySearch(arr, target) {
  return search(arr, target, 0, arr.length - 1);
  function search(arr, target, from, to) {
    if (from > to) {
      return -1;
    }
    const mid = Math.floor((from + to) / 2);
    if (arr[mid] > target) {
      return search(arr, target, from, mid - 1);
    } else if (arr[mid] < target) {
      return search(arr, target, mid + 1, to);
    } else {
      return mid;
    }
  }
}
const a = binarySearch([1, 2, 3, 6, 8], 4);
console.log(a);

// const tb = api => params => new Promise((resolve, reject) => {
//   console.log(params, 123);
//   console.log(api, 21);
//   resolve({ code: 1 });
// });

// tb({ success: () => { }, })(34);
