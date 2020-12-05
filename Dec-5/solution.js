const fs = require('fs');


const data = fs.readFileSync('input.txt', 'utf8');
let input = data.split('\n');


let highestId = 0;
let seatIds = [];

//Part 1
input.forEach((line) => {
  const rowString = line.slice(0, 7);
  const colString = line.slice(7);
  let up = 127;
  let low = 0;
  let rowNum;
  let colNum;

  rowString.split('').forEach((l, idx) => {
    if (idx === 6) {
      if (l === "F") {
        rowNum = low;
      } else if (l === "B") {
        rowNum = up;
      }

    } else {
      if (l === "F") {
        up -= (up - low + 1) / 2;
      } else if (l === "B") {
        low += (up - low + 1) / 2;
      }
    }
  })
  up = 7;
  low = 0;
  colString.split('').forEach((l, idx) => {
    if (idx === 2) {
      if (l === "L") {
        colNum = low;
      } else if (l === "R") {
        colNum = up;
      }
    } else {
      if (l === "L") {
        up -= (up - low + 1) / 2;
      } else if (l === "R") {
        low += (up - low + 1) / 2;
      }
    }
  })

  let seatId = rowNum * 8 + colNum;
  seatIds.push(seatId);
  if (seatId > highestId) {
    highestId = seatId;
  }
})

console.log("--- hightest id ---");
console.log(highestId);


//Part 2


seatIds.sort((a, b) => a - b);
let lastId = seatIds[0];

seatIds.forEach((id) => {
  if (id - lastId === 2) {
    console.log("--- Your seat ---");
    console.log(id - 1);
  } else {
    lastId = id;
  }
});