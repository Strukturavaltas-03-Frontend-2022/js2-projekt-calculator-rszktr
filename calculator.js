const buttons = document.querySelectorAll('button');
const display = document.querySelector('input');
const decimalPoint = document.querySelector('.point');

const arrayOfDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const arrayOfOperators = ['+', '-', 'x', '÷']

let numberCreator = [];
let numbersToWorkWith = [];
let operatorsToWorkWith = [];
let lastInput = 0;

(addListener = () => {
    buttons.forEach(item =>
        item.addEventListener('click', pressButton));
})();

const addListenerToDecimalPoint = () => {
    decimalPoint.addEventListener('click', pressButton)
};

const resetListenerForDecimalPoint = () => {
    decimalPoint.removeEventListener('click', pressButton)
};

function pressButton() {
    checkForErrorDisplay();
    lastInput = this.innerHTML;
    if (lastInput == 'C') {
        clearEverything()
    } else if (lastInput == '.') {
        resetListenerForDecimalPoint();
        inputHandler();
        displayHandler();
        checkForTooManyOperators()
    } else {
        inputHandler();
        displayHandler();
        checkForTooManyOperators()
    }
}

const displayHandler = () => {
    display.value += (lastInput);
}

const inputHandler = () => {
    if (arrayOfDigits.includes(lastInput)) {
        numberCreator.push(lastInput)
    } else if (arrayOfOperators.includes(lastInput)) {
        numbersToWorkWith.push(parseFloat(numberCreator.join('')));
        numberCreator = [];
        operatorsToWorkWith.push(lastInput);
        addListenerToDecimalPoint();
    }
};

const clearEverything = () => {
    numberCreator = [];
    numbersToWorkWith = [];
    operatorsToWorkWith = [];
    display.value = null;
}

const calculate = () => {

}

const calculation = (item) => {
    if (item == '+') {
        return previousNumber + currentNumber
    } else if (item == '-') {
        return previousNumber - currentNumber
    } else if (item == 'x') {
        return previousNumber * currentNumber
    } else {
        return previousNumber / currentNumber
    }
}

const checkForTooManyOperators = () => {
    if (numbersToWorkWith.includes(NaN) || numbersToWorkWith.includes('..')) {
        clearEverything();
        display.value = 'ERROR!'
    }
};

const checkForErrorDisplay = () => {
    if (display.value == 'ERROR!') {
        clearEverything();
    }
}