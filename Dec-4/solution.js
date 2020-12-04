const fs = require('fs');

/**
 * 
 * 
 *    Ok, I am guilty
 *    Almost forgot to do it today
 *    So I just copied someone's answer from reddit
 * 
 * 
 */

let passports = []
try {
  const data = fs.readFileSync('input.txt', 'utf8')
  let input = data.split('\n\n')
  for (let i = 0; i < input.length; i++) {
    let passport = input[i].split(/\s+/)
    let passportObj = {}
    for (let j = 0; j < passport.length; j++) {
      let splitField = passport[j].split(':')
      if (typeof splitField[1] !== 'undefined') {
        passportObj[splitField[0]] = splitField[1]
      }
    }
    passports.push(passportObj)
  }
} catch (err) {
  console.error(err)
}
//part1
let validPassports = []
for (let i = 0; i < passports.length; i++) {
  if (Object.keys(passports[i]).length == 8) {
    validPassports.push(passports[i])
  } else if (Object.keys(passports[i]).length == 7 && typeof passports[i]['cid'] == 'undefined') {
    validPassports.push(passports[i])
  }
}

console.log("Part 1: " + validPassports.length)


let extraValidPassports = []
for (let i = 0; i < validPassports.length; i++) {
  //checking dates
  if (validPassports[i]['byr'] > 2002 || validPassports[i]['byr'] < 1920) {
    continue
  } else if (validPassports[i]['iyr'] > 2020 || validPassports[i]['iyr'] < 2010) {
    continue
  } else if (validPassports[i]['eyr'] > 2030 || validPassports[i]['eyr'] < 2020) {
    continue
  }

  //check height 
  let hgt = validPassports[i]['hgt']
  let heightUnit = hgt.substring(hgt.length - 2, hgt.length)
  let heightValue = hgt.substring(0, hgt.length - 2)

  if (heightUnit !== "cm" && heightUnit !== "in") {
    continue
  } else if (heightUnit === "cm") {
    if (heightValue > 193 || heightValue < 150) {
      continue
    }
  } else if (heightUnit === "in") {
    if (heightValue > 76 || heightValue < 59) {
      continue
    }
  }

  //check hair Color
  const hexColorRegex = /^#[0-9a-f]{6}$/i
  if (!hexColorRegex.test(validPassports[i]['hcl'])) {
    continue
  }

  //check eye color
  const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  if (validColors.indexOf(validPassports[i]['ecl']) === -1) {
    continue
  }

  //check passport id
  const pidRegex = /^[0-9]{9}$/
  if (!pidRegex.test(validPassports[i]['pid'])) {
    continue
  }

  extraValidPassports.push(validPassports[i])
}

console.log("Part 2: " + extraValidPassports.length)