const buttons = document.querySelectorAll('button');
const display = document.querySelector('input');
const decimalPoint = document.querySelector('.point');

const arrayOfDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const arrayOfOperators = ['+', '-', 'x', '÷']
const arrayOfEverything = [arrayOfDigits, arrayOfOperators, '=']

let numberCreator = [];
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

// Gombnyomás. Számok létrehozása, műveletek előkészítése.
function inputController() {
  currentInput = this.innerHTML;
  if (currentInput == 'C') {
    clearEverything()
  } 
  else if (previousInput === 0) {
      if (currentInput == '.') {
        numberCreator.push(currentInput);
        display.value += currentInput;
        removeListenerForDecimalPoint();
      }
      else if (whatKindOfInput(currentInput) == 'digit') {
        numberCreator.push(currentInput);
        display.value += currentInput;
      }
      previousInput = currentInput;
  }
  else if (whatKindOfInput(previousInput) == 'digit') {
    if (currentInput == '.') {
      numberCreator.push(currentInput);
      display.value += currentInput;
      removeListenerForDecimalPoint();
    }
    else if (whatKindOfInput(currentInput) == 'digit') {
      numberCreator.push(currentInput);
      display.value += currentInput;
    }
    else if (whatKindOfInput(currentInput) == 'operator') {
      numbersToWorkWith.push(parseFloat(numberCreator.join('')));
      numberCreator = [];
      operatorsToWorkWith.push(currentInput);
      display.value += currentInput;
      addListenerToDecimalPoint();
    }
    else if (whatKindOfInput(currentInput) == 'start') {
      numbersToWorkWith.push(parseFloat(numberCreator.join('')));
      numberCreator = [];
      calculate()
    }
    previousInput = currentInput;
  }
  else if (whatKindOfInput(previousInput) == 'operator') {
    if (currentInput == '.') {
      numberCreator.push(currentInput);
      display.value += currentInput;
      removeListenerForDecimalPoint();
    }
    else if (whatKindOfInput(currentInput) == 'digit') {
      numberCreator.push(currentInput);
      display.value += currentInput;
    }
    else if (whatKindOfInput(currentInput) == 'operator') {
      operatorsToWorkWith.splice(-1, 1, currentInput);
      display.value = display.value.replace(/.$/, currentInput)
    }
    else if (whatKindOfInput(currentInput) == 'start') {
      operatorsToWorkWith.splice(-1, 1);
      calculate()
    }
    previousInput = currentInput;
  } 
  else if (whatKindOfInput(previousInput) == 'start') {
    if (currentInput == '.') {
      numbersToWorkWith = [];
      numberCreator.push(currentInput);
      display.value = currentInput;
      removeListenerForDecimalPoint();
    }
    else if (whatKindOfInput(currentInput) == 'digit') {
      numbersToWorkWith = [];
      numberCreator.push(currentInput);
      display.value = currentInput;
    }
    else if (whatKindOfInput(currentInput) == 'operator') {
      operatorsToWorkWith.push(currentInput);
      display.value += currentInput;
    }
    previousInput = currentInput;
  }
}

const displayHandler = () => {
  display.value += currentInput;
}

const whatKindOfInput = (input) => {
  if (arrayOfDigits.includes(input)) {
    return 'digit'
  } else if (arrayOfOperators.includes(input)) {
    return 'operator'
  } else if (input == '=') {
    return 'start'
  }
};

const clearEverything = () => {
  numberCreator = [];
  numbersToWorkWith = [];
  operatorsToWorkWith = [];
  display.value = null;
  addListenerToDecimalPoint()
  previousInput = 0;
}

// A számolás
const calculate = () => {
  multiplyOrDivide();
  subtract();
  display.value = summation();
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
  numbersToWorkWith = [parseFloat(display.value)];
  operatorsToWorkWith = [];
  addListenerToDecimalPoint();
};