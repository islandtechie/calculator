function Calculator()
{
    this.currentOperand = '0';
    this.tempOperand = '0';
    this.subTotal = 0;
    this.operator = '';
    this.memSave = 0;
    this.memClear = 0;
    this.memRecall = 0;

    
}


var calculator = new Calculator();

var display = document.getElementById('display');

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
            el.addEventListener('click', calculator.clear);

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
        parseOperator(this.id);
    });
});

function parseInput(input)
{   if (input === '=') {
        console.log('= pressed');
    } else if (input === '.') {
        processDecimalInput(input);
    } else if (input === '0') {
        processZeroInput(input);
    } else {
        processNonZeroOrDecimalInput(input);        
    }

    updateDisplay();
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

function updateDisplay()
{
    display.value = calculator.currentOperand;
    console.log('UPDATE DISPLAY current: ' + calculator.currentOperand);
    console.log('UPDATE DISPLAY temp: ' + calculator.tempOperand);
}