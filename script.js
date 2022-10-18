const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', (e) => {

    const element = e.target;

    if (!element.matches('button')) {
        return; //button hariç bir objeye tıklandığında aşağıdaki kodlar çalışmaz.
    }

    switch(element.value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(element.value)
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            inputClear();
            break;
        default:
            inputNumber(element.value);

    }
    updateDisplay();


  

    function inputNumber(number) {

        if (waitingForSecondValue == true) {
            displayValue = number;
            waitingForSecondValue = false;
        }
        else {
            if (displayValue === '0') {
                displayValue = number;
            }

            else {
                displayValue += number;
            }
        }

        console.log(displayValue, firstValue, operator, waitingForSecondValue);


    }

    function inputDecimal() {
        if (!displayValue.includes('.')) {
            displayValue += '.';
        }

    }

    function inputClear() {
        displayValue = '0';
        firstValue = null;
        operator = null;

        console.log(displayValue, firstValue, operator, waitingForSecondValue);
    }

    function handleOperator(nextOperator) {

        const value = parseFloat(displayValue);

        if(operator && waitingForSecondValue) {
            operator = nextOperator
            return;
        }

        if (firstValue === null) {
            firstValue = value;
        } else if (operator) {

            const result = calculate(firstValue, value, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;

        }

        waitingForSecondValue = true;
        operator = nextOperator;

        console.log(displayValue, firstValue, operator, waitingForSecondValue);
    }
})

function calculate(firstNum, secondNum, operator) {

    if (operator == "+") {
        return firstNum + secondNum;
    }
    else if (operator == "-") {
        return firstNum - secondNum;
    }

    else if (operator == "*") {
        return firstNum * secondNum;
    }

    else if (operator == "/") {
        return firstNum / secondNum;
    }

    return secondNum;

}