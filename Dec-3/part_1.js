//Imports
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity,
});

//Slop
//y is fixed to 1, so we just check every line
let slop = 3;

//setup the count
let treeCount = 0;

//skip the first line
let x = -slop;

//We only need to iterate through once
rl.on("line", (line) => {
  //get info
  x = x + slop;
  let arr = line.split("");

  //check overflow
  if (x > arr.length - 1) {
    x = x - arr.length;
  }

  //check tree and log the map to terminal
  if (arr[x] === "#") {
    arr[x] = "O";
    console.log(arr.join(""));
    treeCount++;
  } else {
    arr[x] = "X";
    console.log(arr.join(""));
  }
});

//log the answer
rl.on("close", () => {
  console.log(treeCount);
});
