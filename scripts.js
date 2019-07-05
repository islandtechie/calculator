function Calculator()
{
    this.currentOperand = '0';
    this.firstOperand = '';
    this.secondOperand = '';
    this.subTotal = 0;
    this.history = '';
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
        case 'save-mem':
            el.addEventListener('click',  saveOperation);
            break;
        case 'recall':
            el.addEventListener('click', function(el) {
                recallOperation(el.target);
            });
            break;
        case 'clear-mem':
            el.addEventListener('click', clearInputOperation);
            break;
        case 'clear':
            el.addEventListener('click', function() {
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

function saveOperation()
{
    console.log('save');
}

function clearInputOperation()
{
    console.log('clear-mem');
}

function recallOperation(e)
{
    if (e.innerHTML === 'MS') {
        console.log('MS');
        if ( calculator.currentOperand !=='0') {
            calculator.memSave = calculator.currentOperand;
        }
        e.innerHTML = 'MR';
    }else{
        console.log('MR');
        console.log(calculator.memSave);
    }
}

function clear()
{
    
}

function parseInput(input)
{   
    if (operationInProgress()) {
        calculator.currentOperand = '0';
        calculator.history = calculator.operator;
        calculator.operator = '';
    }

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

function processOperation(input)
{
    parseOperator(input);

    operation(input);   
    
    updateDisplay();    
}

function operation(operator)
{
    switch (operator)
    {
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

function operationInProgress()
{
    return calculator.operator !== '';
}

function multiplyOperation()
{
    if (calculator.subTotal === 0) {
        calculator.subTotal = parseFloat(calculator.currentOperand);
    }else{
        calculator.subTotal = calculator.subTotal * parseFloat(calculator.currentOperand);
        calculator.currentOperand = calculator.subTotal.toString();
    }

}

function divideOperation()
{
    if (calculator.subTotal === 0) {
        calculator.subTotal = parseFloat(calculator.currentOperand);
    }else if (calculator.subTotal !== 0 && calculator.currentOperand === '0'){
            calculator.currentOperand = '0';
            alert('Cannot divide by zero');
    }else{
        calculator.subTotal = calculator.subTotal / parseFloat(calculator.currentOperand);
        calculator.currentOperand = calculator.subTotal.toString();
    }
}

function addOperation()
{
    calculator.subTotal += parseFloat(calculator.currentOperand);
    calculator.currentOperand = calculator.subTotal.toString();
}

function subtractOperation()
{
    if (calculator.subTotal === 0) {
        calculator.subTotal = parseFloat(calculator.currentOperand);
    }else {
        calculator.subTotal -= parseFloat(calculator.currentOperand);
        calculator.currentOperand = calculator.subTotal.toString();
    }
}

function parseOperator(input)
{
    calculator.operator = input; 
}


function processEqualSignInput()
{
    if (calculator.history !== '') {
        switch (calculator.history) {
            case 'add':
                calculator.subTotal += parseFloat(calculator.currentOperand);
                calculator.currentOperand = calculator.subTotal.toString();
                break;
            case 'subtract':
                calculator.subTotal -= parseFloat(calculator.currentOperand);
                calculator.currentOperand = calculator.subTotal.toString();
                break;
            case 'divide':
                calculator.subTotal = calculator.subTotal / parseFloat(calculator.currentOperand);
                calculator.currentOperand = calculator.subTotal.toString();
                break;
            case 'multiply':
                calculator.subTotal = calculator.subTotal * parseFloat(calculator.currentOperand);
                calculator.currentOperand = calculator.subTotal.toString();
                break;
        }
    }
}

function processDecimalInput(input) {
    if (!calculator.currentOperand.includes('.')) {
        calculator.currentOperand += input;
    }
}

function processZeroInput(input){
    if (calculator.currentOperand === '0' && calculator.currentOperand.length === 1) {
        calculator.currentOperand = input;
    }else{
        calculator.currentOperand += input;
    }
}

function processNonZeroOrDecimalInput(input) {
    
    if (calculator.currentOperand === '0' && calculator.currentOperand.length === 1) {
        calculator.currentOperand = input;
    } else {
        calculator.currentOperand += input;
    }
}

function updateDisplay()
{
    display.value = calculator.currentOperand;
}