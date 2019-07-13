function Calculator() {
    this.firstOperand = null;
    this.secondOperand = null;
    this.subTotal = 0;
    this.currentOperation = null;
}

let calculator = new Calculator();

var display = document.getElementById('display');
updateDisplay(0);

var numpad = document.querySelectorAll('#numpad button');
numpad.forEach(function(el) {
    el.addEventListener('click', function(el){
        parseInput(this.id);
    });
});

document.getElementById('add').addEventListener('click', function() {
    if (calculator.currentOperation) {
        performEqualOperation()
        updateDisplay(calculator.firstOperand);
    }
    
    calculator.currentOperation = 'add';
});

document.getElementById('multiply').addEventListener('click', function() {
    if (calculator.currentOperation) {
        performEqualOperation()
        updateDisplay(calculator.firstOperand);
    }
    
    calculator.currentOperation = 'multiply';
});

document.getElementById('divide').addEventListener('click', function() {
    if (calculator.currentOperation) {
        performEqualOperation()
        updateDisplay(calculator.firstOperand);
    }

    calculator.currentOperation = 'divide';
});

document.getElementById('subtract').addEventListener('click', function() {
    if (calculator.currentOperation) {
        performEqualOperation()
        updateDisplay(calculator.firstOperand);
    }

    calculator.currentOperation = 'subtract';
});

function updateDisplay(value) {
    display.value = value;
}

function processDecimalInput(input) {
    if (calculator.currentOperation) {
        if (calculator.secondOperand === null || calculator.secondOperand === '0') {
            calculator.secondOperand = '0.'
        }
        
        if (!calculator.secondOperand.includes('.')) {
            calculator.secondOperand += input;
        }

    }else{
        if (calculator.firstOperand === null || calculator.firstOperand === '0') {
            calculator.firstOperand = '0.'
        }
        
        if (!calculator.firstOperand.includes('.')) {
            calculator.firstOperand += input;
        }

    }
}

function processZeroInput(input) {
    if (calculator.currentOperation) {
        if (calculator.secondOperand === null || calculator.secondOperand === '0') {
            calculator.secondOperand = input;
        }else{
            calculator.secondOperand += input;
        }
    }else{
        if (calculator.firstOperand === null || calculator.firstOperand === '0') {
            calculator.firstOperand = input;
        }else{
            calculator.firstOperand += input;
        }
    }
}

function processNonZeroOrDecimalInput(input) {
    if (calculator.currentOperation) {
        if (calculator.secondOperand === null || calculator.secondOperand === '0') {
            calculator.secondOperand = input;
        } else {
            calculator.secondOperand += input;
        }
    }else{
        if (calculator.firstOperand === null || calculator.firstOperand === '0') {
            calculator.firstOperand = input;
        } else {
            calculator.firstOperand += input;
        }
    }
}

function addOperation() {
    calculator.firstOperand = parseFloat(calculator.firstOperand) + parseFloat(calculator.secondOperand);
    calculator.secondOperand = null;
    calculator.currentOperation = null;
}

function subtractOperation() {
    calculator.firstOperand = parseFloat(calculator.firstOperand) - parseFloat(calculator.secondOperand);
    calculator.secondOperand = null;
    calculator.currentOperation = null;
}

function multiplyOperation() {
    calculator.firstOperand = parseFloat(calculator.firstOperand) * parseFloat(calculator.secondOperand);
    calculator.secondOperand = null;
    calculator.currentOperation = null;
}

function divideOperation() {
    calculator.firstOperand = parseFloat(calculator.firstOperand) / parseFloat(calculator.secondOperand);
    calculator.secondOperand = null;
    calculator.currentOperation = null;
}

function performEqualOperation() {
    if (calculator.currentOperation) {
        switch (calculator.currentOperation) {
            case 'add':
                addOperation();
                break;
            case 'subtract':
                subtractOperation();
                break;
            case 'divide':
                divideOperation();
                break;
            case 'multiply':
                multiplyOperation();
                break;
        }
    }
}


function parseInput(input)
{ 
    if (input === '=') {
        performEqualOperation();
    } else if (input === '.') {
        processDecimalInput(input);
    } else if (input === '0') {
        processZeroInput(input);
    }else{
        processNonZeroOrDecimalInput(input);        
    }

    if (calculator.currentOperation)
    {
        updateDisplay(calculator.secondOperand);
    }else{
        updateDisplay(calculator.firstOperand);
    }    
}
