//Imports
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity,
});

//Set up
let slop_1_count = 0;
let slop_2_count = 0;
let slop_3_count = 0;
let slop_4_count = 0;
let slop_5_count = 0;

let slop_1 = [1, 1];
let slop_2 = [3, 1];
let slop_3 = [5, 1];
let slop_4 = [7, 1];
let slop_5 = [1, 2];

// y pos -1 to skip first line
let pos_1 = [0, -1];
let pos_2 = [0, -1];
let pos_3 = [0, -1];
let pos_4 = [0, -1];
let pos_5 = [0, -1];


//Ok there is some defence to this answer
//I know this code is long and not that beautiful
//but we only iterate through the file once.
//So it is quick and use no extra memory.

//We only need to iterate through once
rl.on("line", (line) => {
  // Come to a new line, move down
  pos_1[1]++;
  pos_2[1]++;
  pos_3[1]++;
  pos_4[1]++;
  pos_5[1]++;

  //get linr arr
  let arr = line.split("");
  //if y movement is done, move to right
  if (pos_1[1] === slop_1[1]) pos_1[0] += slop_1[0];
  if (pos_2[1] === slop_2[1]) pos_2[0] += slop_2[0];
  if (pos_3[1] === slop_3[1]) pos_3[0] += slop_3[0];
  if (pos_4[1] === slop_4[1]) pos_4[0] += slop_4[0];
  if (pos_5[1] === slop_5[1]) pos_5[0] += slop_5[0];

  //check overflow
  if (pos_1[0] >= arr.length) {
    pos_1[0] = pos_1[0] - arr.length;
  }
  if (pos_2[0] >= arr.length) {
    pos_2[0] = pos_2[0] - arr.length;
  }
  if (pos_3[0] >= arr.length) {
    pos_3[0] = pos_3[0] - arr.length;
  }
  if (pos_4[0] >= arr.length) {
    pos_4[0] = pos_4[0] - arr.length;
  }
  if (pos_5[0] >= arr.length) {
    pos_5[0] = pos_5[0] - arr.length;
  }

  //check tree
  if (pos_1[1] === slop_1[1]) {
    pos_1[1] = 0;
    if (arr[pos_1[0]] === "#") {
      slop_1_count++;
    }
  }
  if (pos_2[1] === slop_2[1]) {
    pos_2[1] = 0;
    if (arr[pos_2[0]] === "#") {
      slop_2_count++;
    }
  }
  if (pos_3[1] === slop_3[1]) {
    pos_3[1] = 0;
    if (arr[pos_3[0]] === "#") {
      slop_3_count++;
    }
  }
  if (pos_4[1] === slop_4[1]) {
    pos_4[1] = 0;
    if (arr[pos_4[0]] === "#") {
      slop_4_count++;
    }
  }
  if (pos_5[1] === slop_5[1]) {
    pos_5[1] = 0;
    if (arr[pos_5[0]] === "#") {
      slop_5_count++;
    }
  }
});

//log the answer
rl.on("close", () => {
  console.log(slop_1_count);
  console.log(slop_2_count);
  console.log(slop_3_count);
  console.log(slop_4_count);
  console.log(slop_5_count);
  console.log("------------");
  console.log(
    slop_1_count * slop_2_count * slop_3_count * slop_4_count * slop_5_count
  );
});