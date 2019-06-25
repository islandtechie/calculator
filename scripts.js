//Called onload event to init Calculator
window.onload = function (e) {
    //alert('Window Object Loaded!');
    initCalculaltor();
}

function initCalculaltor() {

    var calculator = new Calculator();

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
            calculator.parseNumber(this);
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

    calculator.updateInput(0);
    
}

function Calculator()
{
    this.currentOperand = 0;
    this.nextOperand = 0;
    this.memSave = 0;
    this.memClear = 0;
    this.memRecall = 0;

    this.add = function()
    {
        console.log('this the add function');
    }

    this.subtract = function()
    {
        console.log('this the subtract function');
    }

    this.multiply = function()
    {
        console.log('this the multiply function');
    }

    this.divide = function()
    {
        console.log('this the add function');
    }

    this.save = function()
    {
        console.log('this the save function');
    }

    this.clear = function()
    {
        console.log('this the clear function');
    }

    this.recall = function()
    {
        console.log('this the recall function');
    }

    this.parseNumber = function(el)
    {
        this.updateInput(el.id);
    }

    this.updateInput = function(number)
    {
        var input = document.getElementById('display');

        if (input.value == '0' && input.value.length == 1)
        {
            input.value = number;
        }else{
            input.value += number;
        }
        
        this.currentOperand = parseInt(input.value);
        console.log(this.currentOperand);
        console.log(input.value.length);

        
    }
}