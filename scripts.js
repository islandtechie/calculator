function Calculator() {
    this.firstOperand = null;
    this.secondOperand = null;
    this.currentOperation = null;
    this.savedOperand = null;
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

document.getElementById('clear').addEventListener('click', function() {
        calculator.currentOperation = null;
        calculator.firstOperand = null;
        calculator.secondOperand = null;

        updateDisplay(0);
});

document.getElementById('mem-clear').addEventListener('click', function(el) {
    calculator.savedOperand = null;
    updateDisplay(0);
});

document.getElementById('mem-recall').addEventListener('click', function(el) {
    if (calculator.savedOperand === null){
        calculator.savedOperand = '0';
    }else if (calculator.firstOperand === null) {
        calculator.firstOperand = calculator.savedOperand;
    }else{
        calculator.secondOperand = calculator.savedOperand;
    }
    updateDisplay(calculator.savedOperand);
});

document.getElementById('mem-save').addEventListener('click', function(el) {
    if (calculator.secondOperand === null) {
        calculator.savedOperand = calculator.firstOperand;
        calculator.firstOperand = null;
    }else{
        calculator.savedOperand = calculator.secondOperand;
        calculator.secondOperand = null;
    }
    updateDisplay('0');
});

document.getElementById('add').addEventListener('click', function() {
    processOperationEvent('add');
});

document.getElementById('multiply').addEventListener('click', function() {
    processOperationEvent('multiply');
});

document.getElementById('divide').addEventListener('click', function() {
    processOperationEvent('divide');
});

document.getElementById('subtract').addEventListener('click', function() {
   processOperationEvent('subtract');
});

function processOperationEvent(operation) {
    if (calculator.currentOperation) {
        performEqualOperation()
        updateDisplay(calculator.firstOperand);
    }

    calculator.currentOperation = operation;
}

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

function performAddition() {
    calculator.firstOperand = parseFloat(calculator.firstOperand) + parseFloat(calculator.secondOperand);
    resetValues(1);
}

function performSubtraction() {
    calculator.firstOperand = parseFloat(calculator.firstOperand) - parseFloat(calculator.secondOperand);
    resetValues(1);
}

function performMultiplication() {
    calculator.firstOperand = parseFloat(calculator.firstOperand) * parseFloat(calculator.secondOperand);
    resetValues(1);
}

function performDivision() {
    calculator.firstOperand = parseFloat(calculator.firstOperand) / parseFloat(calculator.secondOperand);
    resetValues(1);
}

function resetValues(level) {
    switch(level) {
        case 1:
            calculator.secondOperand = null;
            calculator.currentOperation = null;
            break;
    }
}

function performEqualOperation() {
    if (calculator.currentOperation) {
        switch (calculator.currentOperation) {
            case 'add':
                performAddition();
                break;
            case 'subtract':
                performSubtraction();
                break;
            case 'divide':
                performDivision();
                break;
            case 'multiply': 
                performMultiplication();
                break;
        }
    
    }else{
        calculator.firstOperand = '0';
    }
    calculator.firstOperand = formatDecimalPlaces(calculator.firstOperand.toString());
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
        calculator.secondOperand = checkDigitLength(calculator.secondOperand);
        updateDisplay(calculator.secondOperand);
    }else{
        calculator.firstOperand = checkDigitLength(calculator.firstOperand);
        updateDisplay(calculator.firstOperand);
    }    
}

function checkDigitLength(operand) {
    if (operand && operand.length > 10) {
        return operand.substring(0, operand.length - 1);
    }else{
        return operand;
    }
}

function formatDecimalPlaces(value) {
    if (value.includes('.')) {
        const fixedDecimal = parseFloat(value).toFixed(3).toString();
        return parseFloat(fixedDecimal);
    }else{
        return value;
    }
}