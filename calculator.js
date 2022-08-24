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
    } else if (lastInput == '=') {
        inputHandler();
        displayHandler();
        checkForTooManyOperators();
        calculate()
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
    } else if (lastInput == '=') {
        numbersToWorkWith.push(parseFloat(numberCreator.join('')));
        numberCreator = [];
        addListenerToDecimalPoint();
    }
};

const clearEverything = () => {
    numberCreator = [];
    numbersToWorkWith = [];
    operatorsToWorkWith = [];
    display.value = null;
    addListenerToDecimalPoint()
}

const calculate = () => {
    let accumulator = 0;
    for (let i = 0; i < operatorsToWorkWith.length; i++) {
        if (operatorsToWorkWith[i] == 'x' || operatorsToWorkWith[i] == '÷') {
            if (operatorsToWorkWith[i] == 'x') {
                accumulator = numbersToWorkWith[i] * numbersToWorkWith[i + 1];
                numbersToWorkWith.splice(i, 2, accumulator);
                accumulator = 0;
                operatorsToWorkWith.splice(i, 1);
                i -= 1;
            } else {
                accumulator = numbersToWorkWith[i] / numbersToWorkWith[i + 1];
                numbersToWorkWith.splice(i, 2, accumulator)
                accumulator = 0;
                operatorsToWorkWith.splice(i, 1)
                i -= 1;
            }
        }
    }
    for (let i = 0; i < operatorsToWorkWith.length; i++) {
        if (operatorsToWorkWith[i] == '-') {
            accumulator = numbersToWorkWith[i] - numbersToWorkWith[i + 1];
            numbersToWorkWith.splice(i, 2, accumulator)
            accumulator = 0;
            operatorsToWorkWith.splice(i, 1)
            i -= 1;
        }
    }
    display.value = numbersToWorkWith.reduce((previousValue, currentValue) =>
        previousValue + currentValue);
    numbersToWorkWith = [display.value];
    operatorsToWorkWith = [];
    lastInput = null;
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