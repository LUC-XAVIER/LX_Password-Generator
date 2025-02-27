const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('copy');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
}

//generates events
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//cpoy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

//generate password
function generatePassword(lower, upper, number, symbol, length){
    //1. Init pw var
    //2. Filter out unchecked types
    //3. Loop over length call generator function for each type
    //4. add final pw to the pw var and return

    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;

}

// generator function - http://www.net-comber.com/charset.html

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}