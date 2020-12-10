const fs = require("fs");

// const data = fs.readFileSync("test.txt", "utf8");
const data = fs.readFileSync("input.txt", "utf8");

let input = data.split("\r\n");

let numArr = [];
// part 1
const findWrongNum = (input) => {
  for (let line of input) {
    let num = parseInt(line);
    if (numArr.length < 25) {
      numArr.push(num);
    } else {
      let found = false;
      for (let first of numArr) {
        if (numArr.find((n) => n === num - first && n !== first)) {
          found = true;
          break;
        }
      }
      if (!found) return num;
      numArr.shift();
      numArr.push(num);
    }
  }
};

console.log("part 1:");
let wrongNum = findWrongNum(input);
console.log(wrongNum);

// part 2:
input.forEach((n, index) => {
  let num = parseInt(n, 10);
  let j = index + 1;
  let sum = num;
  let arr = [sum];
  while (j < input.length && sum < wrongNum) {
    sum += parseInt(input[j], 10);
    arr.push(parseInt(input[j], 10));
    j++;
  }
  // console.log(arr);
  if (sum === wrongNum && arr.length !== 1) {
    arr.sort((a, b) => a - b);
    console.log("part 2:");
    console.log(arr[0] + arr[arr.length - 1]);
  }
});
