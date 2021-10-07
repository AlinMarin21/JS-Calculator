class Calculator {
    constructor(firstOperandElement, secondOperandElement) {
        this.firstOperandElement = firstOperandElement;
        this.secondOperandElement = secondOperandElement;
        this.clear();
    }

    clear() {
        this.firstOperand = '';
        this.secondOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.secondOperand = this.secondOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === "." && this.secondOperand.includes('.'))
        {
            return;
        }
        if((number === 'π' || number === 'ⅇ') && this.secondOperand !== '')
        {
            return;
        }
        if(this.secondOperand.includes('ⅇ') || this.secondOperand.includes('π'))
        {
            return;
        }
        this.secondOperand = this.secondOperand.toString() + number.toString();
    }

    chooseOperation(operation) {

        if(this.secondOperand === '')
        {
            return;
        }

        if(this.firstOperand !== '')
        {
            this.compute();
        }

        this.operation = operation;
        this.firstOperand = this.secondOperand;
        this.secondOperand = '';
    }

    compute() {

        let computation;
        let first;
        let second;

        first = parseFloat(this.firstOperand);
        second = parseFloat(this.secondOperand);

        if(this.firstOperand === 'π')
        {
            first = Math.PI;
        }
        if(this.secondOperand === 'π')
        {
            second = Math.PI;
        }
        if(this.firstOperand === 'ⅇ')
        {
            first = Math.exp(1);
        }
        if(this.secondOperand === 'ⅇ')
        {
            second = Math.exp(1);
        }

        if(isNaN(first) || isNaN(second))
        {
            return;
        }

        switch(this.operation) 
        {
            case '+':
                computation = first + second;
                break;
            case '-':
                computation = first - second;
                break;
            case '*':
                computation = first * second;
                break;
            case '/':
                computation = first / second;
                break;
            case '%':
                computation = (first / 100) * second;
                break;
            case '^':
                computation = Math.pow(first, second);
                break;
            default:
                return;
        }

        this.secondOperand = computation;
        this.operation = undefined;
        this.firstOperand = '';
    }

    updateDisplay() {
        this.secondOperandElement.innerText = this.secondOperand;
        if(this.operation != null) 
        {
            this.firstOperandElement.innerText = `${this.firstOperand} ${this.operation}`;
        }
        else
        {
            this.firstOperandElement.innerText = '';
        }
    }
}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const firstOperandElement = document.querySelector('[data-first-operand]');
const secondOperandElement = document.querySelector('[data-second-operand]');

const calculator = new Calculator(firstOperandElement, secondOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click', function () {
       calculator.appendNumber(button.innerText);
       calculator.updateDisplay(); 
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', function () {
       calculator.chooseOperation(button.innerText);
       calculator.updateDisplay(); 
    });
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});