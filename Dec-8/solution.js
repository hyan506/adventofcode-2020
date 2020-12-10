const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf8");

let input = data.split("\r\n");

// part 1
// run until the index is ready in pastIndex

const run = (input) => {
  let currentIndex = 0;
  let pastIndex = [];
  let result = 0;
  while (true) {
    if (pastIndex.find((i) => i === currentIndex) === undefined) {
      pastIndex.push(currentIndex);
      let [cmd, val] = input[currentIndex].split(" ");
      val = parseInt(val, 10);
      switch (cmd) {
        case "acc":
          currentIndex++;
          result += val;
          break;
        case "jmp":
          currentIndex += val;
          break;
        default:
          // nop case
          currentIndex++;
          break;
      }
      if (currentIndex === input.length) return { result, loop: false };
    } else {
      break;
    }
  }
  return { result, loop: true };
};

console.log("part 1:");
console.log(run(input).result);

// part 2
const fixInput = (input) => {
  input.forEach((line, index) => {
    let [cmd, val] = line.split(" ");
    let copyInput = [...input];

    switch (cmd) {
      case "nop":
        copyInput[index] = "jmp " + val;
        res = run(copyInput);
        if (!res.loop) {
          console.log(res.result);
        }
        break;
      case "jmp":
        copyInput[index] = "nop " + val;
        res = run(copyInput);
        if (!res.loop) {
          console.log(res.result);
        }
        break;
      default:
        break;
    }
  });
};

console.log("part 2:");
fixInput(input);
