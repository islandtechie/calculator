function Calculator()
{
    this.currentOperand = '0';
    this.nextOperand = '';
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
    switch (el.id) {
        case 'add':
            el.addEventListener('click', calculator.add);
            break;
        case 'subtract':
            el.addEventListener('click', calculator.subtract);
            break;
        case 'divde':
            el.addEventListener('click', calculator.divide);
            break;
        case 'multiply':
            el.addEventListener('click', calculator.multiply);

    }
});

function parseInput(input)
{    
    if (input === '.' && !calculator.currentOperand.includes('.')) {
             calculator.currentOperand += input;
    }

    if (calculator.currentOperand == '0' && calculator.currentOperand.length == 1) {
        if (input !== '0' || input == '0') {
            calculator.currentOperand = input;
        }       
    }else{
        calculator.currentOperand += input;
    }

    updateDisplay();
}

function updateDisplay()
{
    display.value = calculator.currentOperand;
}