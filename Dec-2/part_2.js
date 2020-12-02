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
  let [first, second] = limit.split('-');
  letter = letter[0];

  //check
  password = password.split('');
  if ((password[first - 1] === letter || password[second - 1] === letter) && password[first - 1] !== password[second - 1]) validCount++;
});

rl.on("close", () => {
  console.log(validCount);
});