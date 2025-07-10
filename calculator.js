// function to add values
function add(a,b) {
    return a + b;
}

// function to subtract values
function subtract(a,b) {
    return a - b;
}

// function to multiply values
function multiply(a,b) {
    return a * b;
}

// function to divide values
function divide(a,b) {
    return a / b;
}

//function operate
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Invalid operator";
    }
}
