const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
const decimalPoint = document.querySelector('.point');

const arrayOfDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const arrayOfOperators = ['+', '-', 'x', '÷']

let digitArray = [];
let numbersToWorkWith = [];
let operatorsToWorkWith = [];
let currentInput = 0;
let previousInput = 0;

// Eseményfigyelők
(addListener = () => {
  buttons.forEach(item =>
    item.addEventListener('click', inputController));
})();

const addListenerToDecimalPoint = () => {
  decimalPoint.addEventListener('click', inputController)
};

const removeListenerForDecimalPoint = () => {
  decimalPoint.removeEventListener('click', inputController)
};

// Részműködések
const collectDigit = (digit) => {
  digitArray.push(digit);
  display.innerHTML += digit;
};

const createNumber = () => {
  if (digitArray.length == 1 && digitArray[0] == '.') {
    digitArray[0] = 0;
  }
  numbersToWorkWith.push(parseFloat(digitArray.join('')));
  digitArray = [];
};

const clearDisplayAndNumbersToWorkWith = () => {
  numbersToWorkWith = [];
  display.innerHTML = '';
};

const collectOperator = (operator) => {
  operatorsToWorkWith.push(operator);
  display.innerHTML += operator;
  addListenerToDecimalPoint();
};

// Cselekményfák előzetes inputok alapján
const previousInputIsNone = () => {
  if (currentInput == '.') { removeListenerForDecimalPoint() };
  if (whatKindOfInput(currentInput) == 'digit') {collectDigit(currentInput) }

  previousInput = currentInput;
};

const previousInputIsDigit = () => {
  switch (whatKindOfInput(currentInput)) {
    case 'digit':
      previousInputIsNone();
      break;
    case 'operator':
      createNumber();
      collectOperator(currentInput);
      break;
    case 'start':
      createNumber();
      calculate()
      break;
  }
  previousInput = currentInput;
};

const previousInputIsOperator = () => {
  switch (whatKindOfInput(currentInput)) {
    case 'digit':
      previousInputIsNone();
      break;
    case 'operator':
      operatorsToWorkWith.splice(-1, 1, currentInput);
      display.innerHTML = display.innerHTML.replace(/.$/, currentInput)
      break;
    case 'start':
      operatorsToWorkWith.splice(-1, 1);
      calculate()
      break;
  }
  previousInput = currentInput;
};

const previousInputIsStart = () => {
  if (whatKindOfInput(currentInput) == 'operator') {
    collectOperator(currentInput);
  } else if (whatKindOfInput(currentInput) == 'digit') {
    clearDisplayAndNumbersToWorkWith();
    previousInputIsNone();
  };
  previousInput = currentInput;
};

const whatKindOfInput = (input) => {
  return arrayOfDigits.includes(input) ? 'digit' :
    arrayOfOperators.includes(input) ? 'operator' :
      input == '=' ? 'start' : none;
};

const clearEverything = () => {
  digitArray = [];
  numbersToWorkWith = [];
  operatorsToWorkWith = [];
  display.innerHTML = null;
  previousInput = 0;
  addListenerToDecimalPoint()
};

// Az adatbevitel folyamata
function inputController() {
  currentInput = this.innerHTML;
  currentInput == 'C' ? clearEverything() :
    previousInput === 0 ? previousInputIsNone() :
      whatKindOfInput(previousInput) == 'digit' ? previousInputIsDigit() :
        whatKindOfInput(previousInput) == 'operator' ? previousInputIsOperator() :
          whatKindOfInput(previousInput) == 'start' ? previousInputIsStart() : none
};

// A számolás
const calculate = () => {
  multiplyOrDivide();
  subtract();
  display.innerHTML = summation();
  if (display.innerHTML == 'NaN') {display.innerHTML = '(NaN)e szórakozzál velem...'}
  finishUpCalculation();
};

const calculationStep = (index, partialResult) => {
  numbersToWorkWith.splice(index, 2, partialResult)
  operatorsToWorkWith.splice(index, 1)
  return index - 1;
};

const multiplyOrDivide = () => {
  for (let i = 0; i < operatorsToWorkWith.length; i++) {
    if (operatorsToWorkWith[i] == 'x' || operatorsToWorkWith[i] == '÷') {
      if (operatorsToWorkWith[i] == 'x') {
        i = calculationStep(i, numbersToWorkWith[i] * numbersToWorkWith[i + 1]);
      } else {
        i = calculationStep(i, numbersToWorkWith[i] / numbersToWorkWith[i + 1]);
      }
    }
  }
};

const subtract = () => {
  for (let i = 0; i < operatorsToWorkWith.length; i++) {
    if (operatorsToWorkWith[i] == '-') {
      i = calculationStep(i, numbersToWorkWith[i] - numbersToWorkWith[i + 1]);
    }
  }
};

const summation = () => {
  return numbersToWorkWith.reduce((previousValue, currentValue) =>
    previousValue + currentValue);
};

const finishUpCalculation = () => {
  numbersToWorkWith = [parseFloat(display.innerHTML)];
  operatorsToWorkWith = [];
  addListenerToDecimalPoint();
};