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
        default:
    
    }

    calculator.dataset.previousKeyType = type;
    calculator.dataset.previousEquation = equationInput.textContent;
});

function updateInput(input){
    input = commaSeparate(input);
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