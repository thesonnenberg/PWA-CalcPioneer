function numberExpressionEventListener() {
    let buttons = document.querySelectorAll('.number_or_expression');
    let inputfield = document.getElementById('input_display');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            appendToInputField(this.dataset.value)
            
        });
    });
}

function appendToInputField(string_to_append) {
    if (string_to_append === "null") {
        return; // Stop execution of the function
    }

    let inputfield = document.getElementById('input_display');
    let innerHTML = inputfield.innerHTML;
    const allowed_operators = ['+', '-', '*', '/', '(', ')'];

    if (allowed_operators.includes(string_to_append)) {
        innerHTML += `<span class="operator">${string_to_append}</span>`;
    } else {
        innerHTML += `<span>${string_to_append}</span>`;
    }
    inputfield.innerHTML = innerHTML;
}

function addEventListenerNonMatchButtons(){
    let equalButton = document.getElementById('equals')
    equalButton.addEventListener('click', ()=>{handelEqual()})

    let backspaceButton = document.getElementById('backspace')
    backspaceButton.addEventListener('click', ()=>{handelBackspace()})

    let clearButton = document.getElementById('clear')
    clearButton.addEventListener('click', ()=>{handelClear()})

    let clearallButton = document.getElementById('clearall')
    clearallButton.addEventListener('click', ()=>{handelClearall()})
}

function handelEqual(){
    let inputElement = document.getElementById('input_display');
    let spans = inputElement.querySelectorAll('span');
    let resultElement = document.getElementById('result_display')
    let resulthistoryElement = document.getElementById('input_display_history')
    let saveAwnsButton = document.getElementById('ans')
    let input = '';

    spans.forEach(span => {
        input += span.textContent; // or span.innerText based on your needs
    });

    const previousResult = resultElement.innerHTML
    const calculatedResult = math_parser(input)

    resultElement.innerHTML = `<span class="input_value_elemet">${input} =</span><span>${calculatedResult}</span>`

    let previousResultElement = document.createElement('p')
    previousResultElement.innerHTML = previousResult
    resulthistoryElement.appendChild(previousResultElement)
    saveAwnsButton.dataset.value = calculatedResult
    
    handelClear()

    

}

function handelBackspace(){
    let parentElement = document.getElementById('input_display');
    if (parentElement && parentElement.lastChild) {
        parentElement.removeChild(parentElement.lastChild);
    }
}

function handelClear(){
    let inputElement = document.getElementById('input_display');

    inputElement.innerHTML = ""

    
}

function handelClearall(){
    let resultElement = document.getElementById('result_display');
    let inputElement = document.getElementById('input_display');
    let reulthistoryElement = document.getElementById('input_display_history')
    let ansButton = document.getElementById('ans');

    resultElement.innerHTML = ""
    inputElement.innerHTML = ""
    ansButton.dataset.value = "null"
    reulthistoryElement.innerHTML = ""
}