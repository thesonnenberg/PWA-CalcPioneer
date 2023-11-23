function math_parser(expression_string) {
    if (validateInput(expression_string)) {
        try {
            const result = evaluateExpression(expression_string);
            return result;
        } catch (error) {
            console.log("ERROR: Invalid expression!");
        }
    } else {
        console.log("ERROR: Provided string could not be validated!");
    }
}

function validateInput(string_to_validate) {
    const regex = /^[0-9+\-*/().\s]*$/;
    return regex.test(string_to_validate);
}

function evaluateExpression(expr) {
    let tokens = expr.replace(/\s+/g, '').split(/([+\-*/()])/).filter(Boolean);

    const operatorPrecedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    const applyOperator = (operator, b, a) => {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
        }
    };

    let values = [];
    let operators = [];

    for (let token of tokens) {
        if (!isNaN(parseFloat(token))) {
            values.push(parseFloat(token));
        } else if (token == '(') {
            operators.push(token);
        } else if (token == ')') {
            while (operators.length && operators[operators.length - 1] != '(') {
                values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
            }
            operators.pop();
        } else {
            while (operators.length && operatorPrecedence[operators[operators.length - 1]] >= operatorPrecedence[token]) {
                values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
            }
            operators.push(token);
        }
    }

    while (operators.length) {
        values.push(applyOperator(operators.pop(), values.pop(), values.pop()));
    }

    return values.pop();
}
