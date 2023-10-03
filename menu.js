let Pname = '';
let PcontactNumber = 0;

$("#startBtn").click(() => {
    Pname = $("#name").val();
    PcontactNumber = $("#number").val();
    if (Pname != '' && PcontactNumber != '') {
        getInfo();
        $("#log").css("opacity", "0%");
        $("#log").css("visibility", "hidden");
        startGame();
    }
})
