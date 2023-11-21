function math_parser(expresion_string){
    const input_string = expresion_string
    if(validateInput(input_string)){
        const result = eval(input_string) // This is not save! Dont use in production!!!
        return result
    } else {
        console.log("ERROR: provided string could not be validated!")
    }
}

function validateInput(string_to_validate){
    return true
}