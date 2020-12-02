//Imports
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  crlfDelay: Infinity,
});

//Array of numbers that we are looking for
let validCount = 0;

//We only need to iterate through once
rl.on("line", (line) => {
  //get infomation from line
  let [limit, letter, password] = line.split(" ");
  let [min, max] = limit.split('-');
  letter = letter[0];

  //count
  let letterCount = 0;
  password.split('').forEach(l => {
    if (l === letter) letterCount++;
  });
  if (letterCount >= min && letterCount <= max) validCount++;


});

rl.on("close", () => {
  console.log(validCount);
});