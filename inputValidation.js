let lastLine = "";
function validateName(text) {
    let name = text.value;
    let length = name.length;
    if (name.charAt(length - 1) == "/" || name.charAt(length - 1) == "|") {
        text.value = lastLine;
    }
    lastLine = name;
}

let numLength = 0;
let lastNum = ""; 
function validateNumber(number) {
    numLength++
    if (numLength > 13) {
        number.value = lastNum;
    }
    lastNum = number.value;
}