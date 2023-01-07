const numButtons = document.querySelectorAll(".numButton");
const content = document.querySelector(".content");
const plusOperand = document.querySelector(".plus");
const minusOperand = document.querySelector(".minus");
const divideOperand = document.querySelector(".divide");
const multiplyOperand = document.querySelector(".multiply");
const result = document.querySelector(".result");
const operationButton = document.querySelectorAll(".operationButton");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");

let globalVal = null;
let currentValue = null;
let operatorVal = null;
let operationsCount = 0;
let inputVal = 0;
let inputInd = false;
let point;

backspace.addEventListener("click", () => {
    content.textContent = content.textContent.slice(0, -1);
});

numButtons.forEach(button => {
    button.addEventListener("click", () => {
        operationButton.forEach(button => {
            if ( button.classList.contains("active")) {
                content.textContent = "";
            }
            button.classList.remove("active");
        });

        if(content.textContent === "" && button.innerText === ".") return;

        point = document.querySelector(".point");

        point.addEventListener("click", () => {
            if(!(content.textContent.includes("."))) content.textContent += point.textContent; 
        });

        if(content.textContent.includes(".")) point = null;

        if(content.textContent.startsWith("0")) {
            if(!(content.textContent.includes("."))) content.textContent += ".";
            point = null;
        }

        inputInd = true;
        content.textContent += button.textContent;
    });
});

operationButton.forEach(button => {
    button.addEventListener("click", (e) => {
        let target = e.target;

        for (const button of operationButton) {
            button.classList.remove("active");
        }

        target.classList.add("active");

        if (button.innerText === "+")
        {   
            if (content.textContent !== "" ) {
                currentValue = +content.textContent;
                console.log(`current value is: ${currentValue}`);
                if(operationsCount === 0) globalVal = currentValue; 
                console.log(`First step. global value is: ${globalVal}`);
                console.log(`operationsCount is: ${operationsCount}`);
                if (inputInd === true) {
                    inputVal += 1;
                    inputInd = false; 
                    operationsCount += 1;
                } 

                if (inputVal === 2) {
                    count();
                    inputVal -= 1; 
                }
                operatorVal = "+"; 
            }
        } 
        if (button.innerText === "-") {
            if (content.textContent !== "") {
                currentValue = content.textContent;
                console.log(`current value is: ${currentValue}`);
                if(operationsCount === 0) globalVal = currentValue;
                console.log(`First step. global value is: ${globalVal}`); 
                console.log(`operationsCount is: ${operationsCount}`);
                if (inputInd === true) {
                    inputVal += 1;
                    inputInd = false;   
                    operationsCount += 1;
                } 

                if (inputVal === 2) {
                    count();
                    inputVal -= 1;
                }
                operatorVal = "-";
            }
        }
        if (button.innerText === "*") {
            if (content.textContent !== "" ) {
                currentValue = content.textContent;
                console.log(`current value is: ${currentValue}`);
                if(operationsCount === 0) globalVal = currentValue;
                console.log(`First step. global value is: ${globalVal}`); 
                console.log(`operationsCount is: ${operationsCount}`);
                if (inputInd === true) {
                    inputVal += 1;
                    inputInd = false;
                    operationsCount += 1;
                } 

                if (inputVal === 2) {
                    count();
                    inputVal -= 1;
                }
                operatorVal = "*";
            }
        } 
        if (button.innerText === "/") {
            if (content.textContent !== "") {
                currentValue = content.textContent;
                console.log(`current value is: ${currentValue}`);
                if(operationsCount === 0) globalVal = currentValue;
                console.log(`First step. global value is: ${globalVal}`); 
                if (inputInd === true) {
                    inputVal += 1;
                    inputInd = false;
                    operationsCount += 1;
                } 

                if (inputVal === 2) {
                    count();
                    inputVal -= 1;
                }
                operatorVal = "/";
            }
        } 
    });
});

result.addEventListener("click", () => {
    
    if (operatorVal === null) return;
    let res = operate(operatorVal, globalVal, content.innerText)
    if (res !== Infinity) {
        content.textContent = res;
        globalVal = res;
        operatorVal = null; 
    } else {
        content.textContent = "";
        alertErr();
    }

    operationButton.forEach(button => {
        button.classList.remove("active");
    });
    
});

clear.addEventListener("click", () => {
    globalVal = null;
    currentValue = null;
    operatorVal = null;
    operationsCount = 0;
    inputVal = 0;
    inputInd = false;
    content.textContent = "";
    operationButton.forEach(button => {
        button.classList.remove("active");
    });

});

function add(a, b) {
    let result = +a + +b;
    if(Number.isInteger(result)) {
        return result
    } else return Math.round(result * 100) / 100;
}

function subtract(a, b) {
    let result = +a - +b;
    if(Number.isInteger(result)) {
        return result
    } else return Math.round(result * 100) / 100;
}

function multiply(a, b) {
    let result = +a * +b;
    if(Number.isInteger(result)) {
        return result
    } else return Math.round(result * 100) / 100;
}

function divide(a, b) {
    let result = +a / +b;
    if(Number.isInteger(result)) {
        return result
    } else return Math.round(result * 100) / 100;
}

function operate(operator, num1, num2) {

    if (operator === "+")
    {
        return add(num1, num2);
    } 
    else if (operator === "-") 
    {
        return subtract(num1, num2);
    }
    else if (operator === "*")
    {
        return multiply(num1, num2);
    }
    else if (operator === "/")
    {    
        return divide(num1, num2);
    }
}

function count() {
    if (operatorVal === "+") {
        let res = +operate("+", globalVal, currentValue);
        if (res !== Infinity) {
            globalVal = res; 
            console.log(`Second step. global value is: ${globalVal}`);
            content.textContent = globalVal;
        } 

    } 
    if (operatorVal === "-") {
        let res = +operate("-", globalVal, currentValue);
        if (res !== Infinity) {
            globalVal = res; 
            console.log(`Second step. global value is: ${globalVal}`);
            content.textContent = globalVal;
        } 
    } 
    if (operatorVal === "*") {
        let res = +operate("*", globalVal, currentValue);
        if (res !== Infinity) {
            globalVal = res; 
            console.log(`Second step. global value is: ${globalVal}`);
            content.textContent = globalVal;
        } 
    } 
    if (operatorVal === "/") {
        let res = +operate("/", globalVal, currentValue);
        if (res !== Infinity) {
            globalVal = res; 
            console.log(`Second step. global value is: ${globalVal}`);
            content.textContent = globalVal;
        } else {
            content.textContent = "";
            alertErr();
        }
    }
}

function alertErr() {
    alert("You cant divide by 0!");
}
