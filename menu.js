let Pname = '';
let PcontactNumber = 0;

document.querySelector("#startBtn").addEventListener("click", () => {
    Pname = document.querySelector("#name").value;
    PcontactNumber = document.querySelector("#number").value;
    if (Pname != '' && PcontactNumber != '') {
        console.log("clicked");
        getInfo();
        document.querySelector("#log").style.opacity = "0%";
        document.querySelector("#log").style.visibility = "hidden";
        startGame();
    }
})

