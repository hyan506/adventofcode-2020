//Imports
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity,
});

//Array of numbers that we are looking for
let target = [];

//We only need to iterate through once
rl.on("line", (line) => {
  let num = parseInt(line, 10);
  let numWanted = 2020 - num;
  let result = target.find((n) => n === numWanted);
  if (result) {
    console.log(result * num);
  } else {
    target.push(num);
  }
});
