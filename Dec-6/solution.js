const fs = require('fs');
const {
  cpuUsage
} = require('process');


const data = fs.readFileSync('input.txt', 'utf8');
let input = data.split('\n');



//part 1
let questions = new Set();
let partOneresult = 0;
input.forEach((member) => {
  if (member !== '') {
    let qs = member.split('');
    qs.forEach((q) => {
      if (!questions.has(q)) {
        questions.add(q);
        partOneresult++;
      }
    })

  } else {
    questions.clear();
  }
})

console.log("answer for part 1: " + partOneresult);


//part 2

// add '' to help identify last group
input.push('')

let partTwoResult = 0;
let commmonQuestions = new Set();
let isFirst = true;

input.forEach((member) => {
  let qs = member.split('');

  if (member !== '') {
    if (isFirst) {
      //If this is the first member, record all his questions
      qs.forEach((q) => {
        commmonQuestions.add(q);
      })
      isFirst = false;
    } else {
      //remove all uncommon questions from commonQuestions
      let newCommonQs = new Set();
      commmonQuestions.forEach((q) => {
        if (qs.find((targetQ) => targetQ === q)) {
          newCommonQs.add(q)
        }
      })
      commmonQuestions = newCommonQs;
    }
  } else {
    partTwoResult += commmonQuestions.size;
    commmonQuestions.clear();
    isFirst = true;
  }
})

console.log("answer for part 2: " + partTwoResult);