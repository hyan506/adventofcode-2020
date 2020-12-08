const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");
let input = data.split("\r\n");

//Thanks Andrew

// tidy up the data to an easy-to-manage shape
let bagList = [];
for (let line of input) {
  let lineArr = line.split(" ");
  let bigBagColor = lineArr[0] + " " + lineArr[1];
  let currentBag = {
    name: bigBagColor,
    contains: [],
  };
  if (lineArr[4] === "no") {
  } else {
    let index = 4;
    while (index < lineArr.length) {
      let num = lineArr[index];
      let smallBagColor = lineArr[index + 1] + " " + lineArr[index + 2];
      currentBag.contains.push(num + "-" + smallBagColor);
      index += 4;
    }
  }
  bagList.push(currentBag);
}

//Check if the bag contains shiny gold bag
let containsShinyGold = (bagName, bagList) => {
  let currentBag = bagList.find((b) => b.name === bagName);
  for (bagInfo of currentBag.contains) {
    let smallBagName = bagInfo.split("-")[1];
    if (
      smallBagName === "shiny gold" ||
      containsShinyGold(smallBagName, bagList)
    )
      return true;
  }
  return false;
};

//Count how many bags in this bag
let bagsCount = (bagName, bagList) => {
  let count = 0;
  let currentBag = bagList.find((b) => b.name === bagName);
  for (bagInfo of currentBag.contains) {
    count +=
      parseInt(bagInfo.split("-")[0]) +
      parseInt(bagInfo.split("-")[0]) *
        bagsCount(bagInfo.split("-")[1], bagList);
  }
  return count;
};

let goldCount = 0;
for (let bag of bagList) {
  if (containsShinyGold(bag.name, bagList)) {
    goldCount++;
  }
}
console.log("part 1:");
console.log(goldCount);

let bagCount = bagsCount("shiny gold", bagList);
console.log("part 2:");
console.log(bagCount);
