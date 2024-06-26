const maxNumberLength = 9;

const calcKeys = document.querySelector('.calculatorButtons');
const calculator = document.querySelector('.calculator');
const userInput = document.getElementById("input");
const equationInput = document.getElementById("equation");

calcKeys.addEventListener('click', (e) => {
    const key = e.target;
    const keyValue = key.textContent;

    let equation = equationInput.textContent.split(' ');
    let num1 = equation[0];
    let operator = equation[1];
    let input = userInput.textContent.replaceAll(',', "");
    let result = equationInput.textContent;

    const {type} = key.dataset;
    const {previousKeyType,previousEquation} = calculator.dataset;
    switch(type){
        case 'number':
            processNumber(input, keyValue, previousKeyType);
            break;
        case 'allClear':
            processClear();
            break;
        case 'operator':
            processOperator(equation, input, keyValue, previousKeyType);
            break;
        case 'equals':
            processEquals(equation, input, previousKeyType, previousEquation);
            break;
        case 'percent':
            processPercent(equation, input);
            break;
        case 'sign':
            processSign(input, previousKeyType);
            updatePreviousEquation = false;
            break;
        case 'decimal':
            processDecimal(input);
            break;
        default:
    
    }

    calculator.dataset.previousKeyType = type;
    calculator.dataset.previousEquation = equationInput.textContent;
});

function updateEquation(num1, operator, num2){
    equationInput.textContent = !operator ? `${num1} =` : !num2 ? `${num1} ${operator}` : `${num1} ${operator} ${num2} =`;
}

function updateInput(input){
    if(input === 'ERROR'){
        input = 0;
        processClear();
        alert("You cannot divide by 0 silly!");
    }
    else{
        let decimalEnd = false;
        if(input.toString().match(/\.$/)){
            decimalEnd = true; 
        }
        input = commaSeparate(input);
    
        if(decimalEnd){
            input += ".";
        }
    }
    userInput.textContent = `${input}`;
}

function commaSeparate(num){
    return Number(num).toLocaleString('en-US', {maximumFractionDigits: 10});
}

function processNumber(input, keyValue, previousKeyType){
    let s = input;
    if(input.toString().length < maxNumberLength){ //limit user entered numbers to 9 digits long
        if(input === '0' || previousKeyType === 'operator' || previousKeyType === 'sign'){
            s = keyValue;
        }
        else if(previousKeyType === 'equals'){
            s = keyValue;
            equationInput.textContent = '\xA0';
        }
        else{
            s += keyValue;
        }
        console.log(s);
    }

    updateInput(s);
}

function processClear(){
    equationInput.textContent = '\xA0';
    userInput.textContent = '0';
}

function processOperator(equation, input, keyValue, previousKeyType){
    if(previousKeyType === 'number' || previousKeyType === 'sign'){
        let result;
        if(equation.length > 1){ 
            if(equation[1]){
                result = calculate(equation[0], equation[1], input);
            }
            else{
                result = calculate(equation[0], keyValue, input);

            }
        }
        else{
            result = input;
        }
        updateEquation(result, keyValue);
        updateInput(result);
    }
    else{
        updateEquation(input, keyValue);
    }
}

function processEquals(equation, input, previousKeyType, previousEquation){
    let num1, operator, num2, result;
    if(equation.length > 1 && previousKeyType !== 'equals'){
        num1 = equation[0];
        operator = equation[1];
        num2 = input;
    }
    else{
        if(previousKeyType === 'sign'){    
            equation = previousEquation.split(' ');    
        }
        num1 = input;
        operator = equation[1];
        num2 = equation[2];
    }

    result = calculate(num1, operator, num2);
    updateEquation(num1, operator, num2);
    updateInput(result);
}

function processPercent(equation, input){
    console.log("here");
    if(equation[1] !== " "){
        input = Number(input) / 100;
        updateInput(input);
        console.log(typeof input);
    }
    else{
        input = Number(input) / 100;
        updateInput(input);
    }
}

function processSign(input, previousKeyType){
    if(previousKeyType === 'equals'){
        equationInput.textContent = '\xA0';
    }
    input = Number(input) * -1;
    updateInput(input);
}

function processDecimal(input){
    if(!input.includes(".")){
        input += ".";
        console.log(typeof input);
    }
    updateInput(input);
}

function calculate(x, operation, y){
    x = Number(x);
    y = Number(y);
    let total = 0;
    switch(operation){
        case '+':
            total = x + y;
            break;
        case '-':
            total = x - y;
            break;
        case '×':
            total = x * y;
            break;
        case '÷':
            if(y === 0){
                return "ERROR";
            }
            total = x / y;
            break;
        default: // assumption that default case is "="
            total = x;
    }
    return total;
}