//Imports
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity,
});

const nums = [];

rl.on("line", (line) => {
  let num = parseInt(line, 10);
  nums.push(num);
});

//After we had all data written in "nums", we do threeSum
rl.on("close", () => {
  let threeNums = threeSum(nums);
  let res = threeNums[0][0] * threeNums[0][1] * threeNums[0][2];
  console.log(res);
});

//ThreeSum is a leetcode problem, I just copied my answer here
//It might not be best, but hey, it works :)
var threeSum = function (nums) {
  if (nums.length === 0) {
    return [];
  }
  nums.sort((a, b) => a - b);
  const solutionSet = new Set();
  for (let i = 0; i < nums.length - 2; i++) {
    let j = i + 1;
    let k = nums.length - 1;
    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];
      if (sum === 2020) {
        solutionSet.add([nums[i], nums[j++], nums[k--]].toString());
      } else if (sum > 2020) {
        k--;
      } else {
        j++;
      }
    }
  }
  return Array.from(solutionSet).map(function (permutationStr) {
    return permutationStr.split(",").map(function (value) {
      return parseInt(value, 10);
    });
  });
};
