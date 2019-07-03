function Calculator()
{
    this.currentOperand = '0';
    this.firstOperand = '';
    this.nextOperand = '';
    this.subTotal = 0;
    this.signFlag = 0;
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

function clear(el)
{
    if (el.textContent === 'CE') {
        calculator.currentOperand = '0';
        el.textContent = 'C';
        console.log(' last entry cleared');
    }else{
        calculator.currentOperand = '0';
        calculator.tempOperand = '';
        calculator.subTotal = '';
        calculator.operator = '';
        console.log('calculator reset');
    }

    updateDisplay()
}

function checkClearButton()
{
    if (clearButton.textContent === 'C')
    {
        clearButton.textContent = 'CE'
    }
}

function parseInput(input)
{   
    checkClearButton();

    if (operationInProgress()) {
        calculator.currentOperand = '0';
        calculator.operator = '';
    }

    if (calculator.signFlag === 1)
    {
        calculator.signFlag = 0;
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

    
        switch (input)
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

function operationInProgress()
{
    if ( calculator.operator !== '')
    {
        return true;
    }
}

function addOperation()
{
    calculator.subTotal += parseFloat(calculator.currentOperand);
    calculator.currentOperand = calculator.subTotal.toString();
}

function subtractOperation()
{
    
        if (calculator.signFlag === 2){

        }else{
            calculator.subTotal = calculator.subTotal - parseFloat(calculator.currentOperand);
            calculator.currentOperand = calculator.subTotal.toString();
        }
   
    
}

function parseOperator(input)
{
    calculator.operator = input;
    
    if (input === 'subtract') 
    {
        processSignFlag();
    }
    
}

function processSignFlag()
{
    calculator.signFlag += 1;
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
    
    if (calculator.currentOperand === '0' && calculator.currentOperand.length === 1) {
        calculator.currentOperand = input;
    } else {
        calculator.currentOperand += input;
    }
}

function isOperationInProgress()
{
    if (calculator.operator !== '')
    {
        return true;
    }

    return false;
}

function updateDisplay()
{
    display.value = calculator.currentOperand;
    console.log('UPDATE DISPLAY current: ' + calculator.currentOperand);
    console.log('UPDATE DISPLAY temp: ' + calculator.tempOperand);
}