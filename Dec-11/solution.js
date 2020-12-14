const fs = require("fs");

// const data = fs.readFileSync("test.txt", "utf8");
const data = fs.readFileSync("input.txt", "utf8");

let input = data.split("\r\n");

let map = input.map((line) => line.split(""));
// console.log(map);
let maxRow = map.length - 1;
let maxCol = map[0].length - 1;

let done = false;
while (!done) {
  done = runOnce(map);
}

console.log("part 1: ");
console.log(countSeated(map));

function countSeated(map) {
  let count = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === "#") {
        count++;
      }
    }
  }
  return count;
}

function printMap(map) {
  console.log(map.map((line) => line.join("")));
}
function runOnce(map) {
  let seatToSet = [];
  let seatToLeave = [];
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      //If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
      if (map[row][col] === "L") {
        if (!checkIfAroundIsSeated(row, col, map)) {
          seatToSet.push({ row, col });
        }
      }
      //If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
      if (map[row][col] === "#") {
        seatCount = checkIfAroundIsSeated(row, col, map);
        if (seatCount >= 4) {
          seatToLeave.push({ row, col });
        }
      }
    }
  }

  if (seatToSet.length === 0 && seatToLeave.length === 0) {
    return true;
  } else {
    seatToSet.forEach((seat) => {
      map[seat.row][seat.col] = "#";
    });
    seatToLeave.forEach((seat) => {
      map[seat.row][seat.col] = "L";
    });
    return false;
  }
}

function checkIfAroundIsSeated(row, col, map) {
  let seatCount = 0;
  if (row !== 0) {
    // up
    if (map[row - 1][col] === "#") {
      seatCount++;
    }
    if (col !== 0) {
      // up left
      if (map[row - 1][col - 1] === "#") {
        seatCount++;
      }
    }
    if (col !== maxCol) {
      // up right
      if (map[row - 1][col + 1] === "#") {
        seatCount++;
      }
    }
  }
  if (col !== 0) {
    // left
    if (map[row][col - 1] === "#") {
      seatCount++;
    }
  }

  if (col !== maxCol) {
    // right
    if (map[row][col + 1] === "#") {
      seatCount++;
    }
  }
  if (row !== maxRow) {
    // down
    if (map[row + 1][col] === "#") {
      seatCount++;
    }
    if (col !== 0) {
      // down left
      if (map[row + 1][col - 1] === "#") {
        seatCount++;
      }
    }

    if (col !== maxCol) {
      // down right
      if (map[row + 1][col + 1] === "#") {
        seatCount++;
      }
    }
  }

  return seatCount;
}
