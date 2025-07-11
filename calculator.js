// function to add values
function add(a, b) {
  return a + b;
}

// function to subtract values
function subtract(a, b) {
  return a - b;
}

// function to multiply values
function multiply(a, b) {
  return a * b;
}

// function to divide values
function divide(a, b) {
  return a / b;
}

//function operate
function operate(operator, a, b) {
  if (a === "ERROR" || b === "ERROR") return "ERROR!";
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "ERROR!";
      }
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}

const screen = document.querySelector(".screen");
const del = document.querySelector(".del");
const clear = document.querySelector(".clear");

let a;
let b;
let operator;
let history = [];
let result;

// function that clears everything and resets the whole thing
// calling the function at the beginning to initialize everything
function reset() {
  screen.value = "";
  a = "";
  b = "";
  operator = "";
  history = [];
}
reset();

//function to display the numbers on screen when button is clicked clicked
function display(event) {
  const value = event.target.innerText;
  if (screen.value === "0" && value === "0") {
    return;
  } else if (screen.value === "0" && value === ".") {
    screen.value += value;
    return;
  } else if (screen.value.includes(".") && value === ".") {
    return;
  } else if (screen.value === "0" && value !== "0") {
    screen.value = value;
    return;
  }
  if (result) {
    screen.value = "";
    result = false;
  }

  screen.value += value;
  del.disabled = false;

  if (a && operator) {
    b = parseFloat(screen.value);
  } else {
    a = parseFloat(screen.value);
  }
}

const digits = document.querySelectorAll(".digit");
digits.forEach((digitButton) => {
  digitButton.addEventListener("click", display);
});

// delete the last value on screen
del.disabled = true;
del.onclick = function () {
  screen.value = screen.value.slice(0, -1);
  if (!isNaN(a) && operator) {
    b = parseFloat(screen.value);
  } else {
    a = parseFloat(screen.value);
  }

  if (screen.value === "") {
    del.disabled = true;
  }
};

// clear the screen and reset everything
clear.addEventListener("click", reset);

const operators = document.querySelectorAll(".operator");
operators.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    if (result){
      result = true;
      operator = operatorButton.value;
      return;
    }
    screen.value = "";
    if (operator && a !== '' && b !== '') {
      a = operate(operator, a, b);
      screen.value = a;
      result = true;
      b = "";
      operator = operatorButton.value;
      return;
    }
    operator = operatorButton.value;
  });
});

const equals = document.querySelector(".equal");
equals.addEventListener("click", () => {
  b = parseFloat(screen.value) || 0;
  if (a === "" || b === "" || !operator || isNaN(b)) return;
  a = operate(operator, a, b);
  screen.value = a;
  result = true;
  b = "";
  operator = "";
});
