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
var memClearButton = document.getElementById('recall');

//init Display value
display.value = calculator.currentOperand;
console.log(display.value);

//Init function buttons
var functionButtons = document.querySelectorAll('#function-buttons button');
functionButtons.forEach(function(el) {
    switch (el.id) {
        case 'mem-add':
            el.addEventListener('click',  memAddOperation);
            break;
        case 'mem-subtract':
            el.addEventListener('click',  memSubtractOperation);
            break;
        case 'mem-clear':
            el.addEventListener('click',  memClearOperation);
            break;
        case 'recall':
            el.addEventListener('click', function(el) {
                recallOperation(el.target);
            });
            break;
        case 'clear':
            el.addEventListener('click', clear);
            break;
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

function memClearOperation()
{
    calculator.memSave = 0;
    calculator.currentOperand = '0';
    clearButton.textContent = "C";
    memClearButton.textContent = 'MS';

    updateDisplay();
}

function clear()
{
    if (clearButton.textContent === "CE")
    {
        calculator.currentOperand = '0';
        clearButton.textContent = "C"
    }else{
        calculator.currentOperand = '0';
        calculator.subTotal = 0;
        calculator.history = '';
        calculator.operator = '';
    }

    updateDisplay();
}

function setClearButton(input)
{
    if (input > 0 || calculator.currentOperand !== '0')
    {
        clearButton.textContent = "CE"
    }
}

function memAddOperation()
{
    
    calculator.memSave += parseFloat(calculator.currentOperand);
    calculator.currentOperand = '0';
    console.log(calculator.memSave);
    updateDisplay();
}

function memSubtractOperation()
{
    calculator.memSave -= parseFloat(calculator.currentOperand);
    calculator.currentOperand = '0';
    console.log(calculator.memSave);
    updateDisplay();
}

function recallOperation(e)
{
    if (e.innerHTML === 'MS') {
        console.log('MS');
        if ( calculator.currentOperand !=='0') {
            calculator.memSave = parseFloat(calculator.currentOperand);
            calculator.currentOperand = '0';
            console.log(calculator.memSave);
        }
        e.innerHTML = 'MR';
    }else{
        calculator.currentOperand = calculator.memSave.toString();
        clearButton.textContent = "CE";
    }

    updateDisplay();
}

function parseInput(input)
{   
    setClearButton(input);

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