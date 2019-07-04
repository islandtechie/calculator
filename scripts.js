function Calculator()
{
    this.currentOperand = '0';
    this.firstOperand = '';
    this.secondOperand = '';
    this.subTotal = 0;
    this.inProgress = false;
    this.operator = '';
    this.memSave = 0;
    this.memClear = 0;
    this.memRecall = 0;

    
}


var calculator = new Calculator();

var display = document.getElementById('display');
var clearButton = document.getElementById('clear');

//init Display value
display.value = calculator.currentOperand;
console.log(display.value);

//Init function buttons
var functionButtons = document.querySelectorAll('#function-buttons button');
functionButtons.forEach(function(el) {
    switch (el.id) {
        case 'save':
            el.addEventListener('click', calculator.save);
            break;
        case 'recall':
            el.addEventListener('click', calculator.recall);
            break;
        case 'clear-input':
            el.addEventListener('click', calculator.clearInput);
            break;
        case 'clear':
            el.addEventListener('click', function(evt) {
                clear(this);
            });

    }
});

//Init Numpad Buttons    
var numpad = document.querySelectorAll('#numpad button');
numpad.forEach(function(el) {
    el.addEventListener('click', function(el){
        parseInput(this.id);
    });
});

//Init Operator Buttons
var operator = document.querySelectorAll('#operators button');
operator.forEach(function(el) {
    el.addEventListener('click', function(el){
        processOperation(this.id);
    });
});

function parseInput(input)
{   
    if (input === '=') {
        processEqualSignInput();
    } else if (input === '.') {
        processDecimalInput(input);
    } else if (input === '0') {
        processZeroInput(input);
    }else{
        processNonZeroOrDecimalInput(input);        
    }

    updateDisplay();
}

function processEqualSignInput()
{
    
}

function processDecimalInput(input) {
    if (!calculator.currentOperand.includes('.')) {
        calculator.currentOperand += input;
    }
}

function processZeroInput(input){
    if (calculator.currentOperand != '0' && calculator.currentOperand.length != 1) {
        calculator.currentOperand += input;
    }
}

function processNonZeroOrDecimalInput(input) {
    if (calculator.inProgress === true) {
        if (calculator.secondOperand === '') {
            calculator.secondOperand = input;
        }else{
            calculator.secondOperand += input
        }
        calculator.currentOperand = calculator.secondOperand;

    }else if (calculator.currentOperand === '0' && calculator.currentOperand.length === 1) {
        calculator.currentOperand = input;
    } else {
        calculator.currentOperand += input;
    }

}

function updateDisplay()
{
    display.value = calculator.currentOperand;
}

function processOperation(operator)
{
    if (calculator.inProgress === false){
        calculator.inProgress = true;

        calculator.firstOperand = calculator.currentOperand;
    }else{

        switch (operator)
        {
            case 'add':
                addOperation();
                break;
            case 'subtract':
                subtractOperation();
                break;
        }

        updateDisplay();
    }
}

function resetValues()
{
    calculator.firstOperand = ''; 
    calculator.secondOperand = '';
}

function addOperation()
{
    if (calculator.inProgress === true && calculator.firstOperand === '' || calculator.secondOperand === '') {
        calculator.subTotal += parseFloat(calculator.currentOperand);
    }else{
        calculator.subTotal = parseFloat(calculator.firstOperand) + parseFloat(calculator.secondOperand);
        calculator.currentOperand = calculator.subTotal.toString();
        resetValues();
    }
}