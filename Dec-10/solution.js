const fs = require("fs");

// const data = fs.readFileSync("test.txt", "utf8");
const data = fs.readFileSync("input.txt", "utf8");

let input = data.split("\r\n");

//sort
let nums = input.map((line) => parseInt(line, 10));
nums.sort((a, b) => a - b);

nums.push(nums[nums.length - 1] + 3);
nums.unshift(0);

//part 1:
//loop & calculate
let diff = { 1: 0, 3: 0 };
for (let i = 0; i < nums.length - 1; i++) {
  diff[nums[i + 1] - nums[i]]++;
}
console.log("part 1:");
console.log(diff[1] * diff[3]);

//part 2:
//Ture expert: https://github.com/stevotvr/adventofcode2020/blob/main/aoc2020/src/day10/day10.java

let sums = Array(nums[nums.length - 1] + 1).fill(0);
sums[0] = 1;
for (let i = 1; i < nums.length; i++) {
  let x = nums[i] >= 3 ? sums[nums[i] - 3] : 0;
  let y = nums[i] >= 2 ? sums[nums[i] - 2] : 0;
  let z = nums[i] >= 1 ? sums[nums[i] - 1] : 0;

  sums[nums[i]] = x + y + z;
}
console.log("part 2:");
console.log(sums[sums.length - 1]);
