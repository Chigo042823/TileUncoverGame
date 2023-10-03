let time = 0;
        let time_fmt = "0:00";
        let pRank = 0;
        let coHide = 0;

        function timer() {
            if (endGame_i !== 1) {
                if (coHide !== 0) {
                    if (time < 60 && time < 10) {
                        time_fmt = "0:0" + time;
                    } else if (time < 60 && time >= 10) {
                        time_fmt = "0:" + time;
                    } else {
                        let seconds = time / 60;
                        let minutes = Math.floor(seconds);
                        let leftover = time - (minutes * 60);
                        if (leftover < 60 && leftover < 10) {
                            time_fmt = minutes + ":0" + leftover;
                        } else if (leftover < 60 && leftover >= 10) {
                            time_fmt = minutes + ":" + leftover;
                        }
                    }
                    $("#timer").html("<h3>" + time_fmt + "</h3>");
                    time++;
                }
            } else {
                $("#playerScore").html("Your Time: " + time_fmt);
                $("#playerRank").html("Rank: #" + pRank);
            }
        }

        setInterval(timer, 1000);

        let start_game = 0;

        function startGame() {
            start_game = 1;
            showAll();
            setInterval(timer, 1000);
            $("#backgroundAudio")[0].play();
        }
    let cards_i = 1;
    let cards = 50;
    let faceUp = 0;
    let previousCard = 26;
    let matchCounter = 0;
    let matches = 1;
    let notMatchCounter = 0;

    function changeBG(id) {
        let divId = id.id;
        let divClass = id.className;
        let divCoverIdIndex = id.innerHTML.indexOf("id") + 4;
        let divCover = id.innerHTML.substr(divCoverIdIndex, 6);
        if (divId.substr(4, 2) > 9) {
            divCover = id.innerHTML.substr(divCoverIdIndex, 7);
        }
        let divVal = id.innerHTML.substr(0, 2);
        console.log(notMatchCounter);
        console.log("value: " + divVal); 
        if (start_game == 1) {
            if (divClass != "cardClicked") { //if card is clicked
                if (faceUp < 1) { //if no card is face up
                    if (matchCounter == 1) {
                        for (let i = 0; i < 2; i++) {
                            $(".cardMatchPending").removeClass("cardMatchPending").addClass("cardMatch");
                            $(".coverHide").removeClass("coverHide").addClass("cover");
                        }
                        matchCounter = 0;
                    }
                    if (notMatchCounter == 1) {
                        for (let i = 0; i < 2; i++) {
                            $(".cardNotMatchPending").removeClass("cardNotMatchPending").addClass("card");
                            $(".coverHide").removeClass("coverHide").addClass("cover");
                        }
                        notMatchCounter = 0;
                    }
                    if (divClass == "card") { //if card is face down
                        $("#" + divId).removeClass().addClass("cardClicked");
                        console.log("#" + divCover);
                        $("#" + divCover).addClass("coverHide");
                        console.log("Current: " + divVal);
                        console.log("Previous: " + previousCard);
                        previousCard = divVal;
                        faceUp++
                    }
                } else { //if 1 card is already face up
                    if(divVal == previousCard) { //if match
                        console.log("match");
                        if (matches != cards/2) { // if last match
                            $("#" + divCover).addClass("coverHide");
                            $(".cardClicked").removeClass().addClass("cardMatchPending");
                            $("#" + divId).removeClass().addClass("cardMatchPending");
                        } else {
                            $("#" + divCover).addClass("coverHide");
                            $(".cardClicked").removeClass().addClass("cardMatch");
                            $("#" + divId).removeClass().addClass("cardMatch");  
                            endGame();
                            console.log("YOU WIN");  
                        }
                        console.log(matches);
                        matchCounter++
                        matches++
                    } else if (previousCard != 26) {
                        console.log("Not a Match");
                        $("#" + divCover).addClass("coverHide");
                        $(".cardClicked").removeClass().addClass("cardNotMatchPending");
                        $("#" + divId).removeClass().addClass("cardNotMatchPending");
                        notMatchCounter++;
                    }  
                    faceUp = 0;
                    previousCard = 26; 
                }
                console.log("Face Up: " + faceUp);
            }
        }  
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let card_val = [];
    let init_i = 1;

    while (init_i < 3) {
        for (let i = 0; i < cards/2; i++) {
            card_val.push(i + 1);
        }
        init_i++
    }

    shuffleArray(card_val);

    while (cards_i <= cards) {
        let cardSelector = "#card" + cards_i;
        let coverSelector = "#cover" + cards_i;
        let imageUrl = "url('resources/image" + card_val[cards_i - 1] + ".png')";

        if (cards_i < 10) {
            $(cardSelector).html(card_val[cards_i - 1] + " <div class='cover' id='" + coverSelector.substr(1) + "'></div>");
        } else {
            $(cardSelector).html(card_val[cards_i - 1] + " <div class='cover' id='" + coverSelector.substr(1) + "'></div>");
        }
        $(cardSelector).css('background-image', imageUrl);
        cards_i++
    }

let endGame_i = 0;

function endGame() {
    endGame_i = 1;
    $("#victoryScreen").css("visibility", "visible");
    setCookie(Pname, PcontactNumber + "/" + time_fmt + "|" + time);
    getLeaderboard();
}

function reset() {
    location.reload();
}

let ci = 1;
function showAll() {
    setInterval(() => showAllLogic(ci++), 60);
    setTimeout(hideAll, 4400);
}

function hideAll() {
    $(".coverHide").removeClass("coverHide").addClass("cover");
    coHide = 1;
}

function showAllLogic(i) {
    if (i <= cards) {
        console.log("#card" + i);
        $("#card" + i).css("color", "black");
        $("#cover" + i).addClass("coverHide");
    }
}
