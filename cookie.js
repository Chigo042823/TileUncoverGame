let playerName = '';
let contactNumber = 0;

// let users = getCookie("users");

// if (users == '') {
//     setCookie("users", 0, 10000);
// }

function getInfo() {
    let userNum = parseInt(getCookie("users")) + 1;
    playerName = $("#name").val();
    contactNumber = $("#number").val();
    setCookie(playerName, contactNumber, 1);
    console.log(playerName);
}

function setCookie(name, value, exp) {
    let date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    let expires_UTC = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires_UTC + "; path=/";
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

function getCookie(name) {
    let cDecoded = decodeURIComponent(document.cookie);
    let cArray = cDecoded.split("; ");

    let result = "";
    cArray.forEach(element => {
        if (element.indexOf(name) == 0) {
            result = element.substring(name.length + 1);
        }
    })
    return result;    
}
