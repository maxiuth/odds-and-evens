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

function NumberForm() {
  const $numberForm = document.createElement("form");
  $numberForm.innerHTML = `
     <label>
     Add a number to the bank
     <input type="number" name="number"/>
     </label>
     <input type="submit" value="Add number" data-action="add"/>
     <input type="submit" value="Sort 1" data-action="sortOne"/>
     <input type="submit" value="Sort All" data-action="sortAll"/>
    `;

  $numberForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const action = e.submitter.dataset.action;
    if (action === "add") {
      const data = new FormData($numberForm);
      const number = data.get("number");
      if (number === null || number === "") {
        return;
      }
      addNumber(+number); // +number is equivalent to Number(number)
    } else if (action === "sortOne") {
      sortOneNumber();
    } else if (action === "sortAll") {
      sortAllNumbers();
    }
    render();
  });
  return $numberForm;
}

function NumberInBank(number) {
  const $number = document.createElement("span");
  $number.textContent = number;
  return $number;
}

function NumberBank(label, numbers) {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  $bank.innerHTML = `
    <h2>${label}</h2>
    <output></output>
  `;

  const $numbers = numbers.map(NumberInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);
  return $bank;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
     <h1>Odds and Events</h1>
     <NumberForm></NumberForm>
     <NumberBank id="bank"></NumberBank>
     <NumberBank id="odds"></NumberBank>
     <NumberBank id="evens"></NumberBank>
  `;

  $app.querySelector("NumberForm").replaceWith(NumberForm());

  $app.querySelector("#bank").replaceWith(NumberBank("Bank", numbers));

  $app.querySelector("#odds").replaceWith(NumberBank("Odds", oddNums));
  $app.querySelector("#evens").replaceWith(NumberBank("Evens", evenNums));
}
render();
