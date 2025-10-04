// Global variables
const numbers = [];
const oddNums = [];
const evenNums = [];

function addNumber(number) {
  if (typeof number !== "number") {
    alert("Please enter a valid number");
  }
  numbers.push(number);
}

function sortOneNumber() {
  const number = numbers.shift();
  if (number % 2 === 0) {
    evenNums.push(number);
  } else {
    oddNums.push(number);
  }
}

function sortAllNumbers() {
  while (numbers.length !== 0) {
    sortOneNumber();
  }
}
