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
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "nope🤨";
      }
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}

const screen = document.querySelector(".screen");
const del = document.querySelector(".del");
const clear = document.querySelector(".clear");
const historyDisplay = document.querySelector(".history");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equal");
const digits = document.querySelectorAll(".digit");

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
  historyDisplay.textContent = "";
  result = false;
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

// what happens when a digit is clicked
digits.forEach((digitButton) => {
  digitButton.addEventListener("click", display);
});

// adding the keypad functionality
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const digitButton = Array.from(digits).find(
    (button) => button.innerText === key
  );
  const operatorButton = Array.from(operators).find(
    (button) => button.innerText === key
  );
  const equalsButton = equals.innerText === key || key === "Enter";
  const delButton = key === "Backspace";
  const clearButton = key === "Escape" || key === "Delete";
  if (clearButton) {
    reset();
  }

  if (delButton) {
    del.click();
  }
  if (equalsButton) {
    equals.click();
  }
  if (operatorButton) {
    operatorButton.click();
  }
  if (digitButton) {
    digitButton.click();
  }
});

// delete the last value on screen when the delete button is clicked and update a and b respectively
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

// clear the screen and reset everything when the AC is selected
clear.addEventListener("click", reset);

// What happens an operator is selected
operators.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    if (result) {
      result = true;
      operator = operatorButton.value;
      return;
    }
    screen.value = "";
    if (operator && a !== "" && b !== "") {
      history.push([a, operator, b, "="]);
      historyDisplay.textContent = history.at(-1).join(" ");
      a = operate(operator, a, b);
      if (a.toString().length > 8) {
        screen.value = a.toPrecision(3);
      } else {
        screen.value = a;
      }
      result = true;
      b = "";
      operator = operatorButton.value;
      return;
    }
    operator = operatorButton.value;
  });
});

// What happens when the equals button is clicked
equals.addEventListener("click", () => {
  b = parseFloat(screen.value) || 0;
  if (a === "" || !operator || isNaN(b)) return;
  history.push([a, operator, b, "="]);
  historyDisplay.textContent = history.at(-1).join(" ");
  a = operate(operator, a, b);
  if (a.toString().length > 8) {
    screen.value = a.toPrecision(3);
  } else {
    screen.value = a;
  }
  result = true;
  b = "";
  operator = "";
});
