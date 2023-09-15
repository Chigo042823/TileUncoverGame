let time = 0;
let time_fmt = "0:00";
let pRank = 0;
let coHide = 0;

function timer() {
    if (endGame_i != 1) {
        if (coHide != 0) {
            if (time < 60 && time < 10) {
                time_fmt = "0:0" + time;
            } else if (time < 60 && time >= 10) {
                time_fmt = "0:" + time;
            } else {
                let seconds = time/60;
                let minutes = Math.floor(seconds);
                let leftover = time - (minutes * 60);
                if (leftover < 60 && leftover < 10) {
                    time_fmt = minutes + ":0" + leftover;
                } 
                else if (leftover < 60 && leftover >= 10) {
                    time_fmt = minutes + ":" + leftover;
                }
            }
            document.querySelector("#timer").innerHTML = "<h3>" + time_fmt + "</h3>";
            time++  
        }
    } else {
        document.querySelector("#playerScore").innerHTML = "Your Time: " + time_fmt;
        document.querySelector("#playerRank").innerHTML = "Rank: #" + pRank;
    }
}

let start_game = 0;
function startGame() {
    start_game = 1;
    showAll();  
    setInterval(() => timer(), 1000);
    backgroundAudio.play();
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
                            document.querySelector(".cardMatchPending").className = "cardMatch";
                            document.querySelector(".coverHide").className = "cover";
                        }
                        matchCounter = 0;
                    }
                    if (notMatchCounter == 1) {
                        for (let i = 0; i < 2; i++) {
                            document.querySelector(".cardNotMatchPending").className = "card";
                            document.querySelector(".coverHide").className = "cover";
                        }
                        notMatchCounter = 0;
                    }
                    if (divClass == "card") { //if card is face down
                        document.querySelector("#" + divId).className = "cardClicked";
                        console.log("#" + divCover);
                        document.getElementById(divCover).className = "coverHide";
                        console.log("Current: " + divVal);
                        console.log("Previous: " + previousCard);
                        previousCard = divVal;
                        faceUp++
                    }
                } else { //if 1 card is already face up
                    if(divVal == previousCard) { //if match
                        console.log("match");
                        if (matches != cards/2) { // if last match
                            document.getElementById(divCover).className = "coverHide";
                            document.querySelector(".cardClicked").className = "cardMatchPending";
                            document.querySelector("#" + divId).className = "cardMatchPending";
                        } else {
                            document.getElementById(divCover).className = "coverHide";
                            document.querySelector(".cardClicked").className = "cardMatch";
                            document.querySelector("#" + divId).className = "cardMatch";  
                            endGame();
                            console.log("YOU WIN");  
                        }
                        console.log(matches);
                        matchCounter++
                        matches++
                    } else if (previousCard != 26) {
                        console.log("Not a Match");
                        document.getElementById(divCover).className = "coverHide";
                        document.querySelector(".cardClicked").className = "cardNotMatchPending";
                        document.querySelector("#" + divId).className = "cardNotMatchPending";
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
        if (cards_i < 10) {
            document.querySelector("#card" + cards_i).innerHTML = card_val[cards_i - 1] + " <div class='cover' id='cover" + cards_i + "'></div>";
            document.querySelector("#card" + cards_i).style.backgroundImage = "url('resources/image" + card_val[cards_i - 1] + ".png')";
        } else {
            document.querySelector("#card" + cards_i).innerHTML = card_val[cards_i - 1] + " <div class='cover' id='cover" + cards_i + "'></div>";
            document.querySelector("#card" + cards_i).style.backgroundImage = "url('resources/image" + card_val[cards_i - 1] + ".png')";
        }
        cards_i++
    }

let endGame_i = 0;

function endGame() {
    endGame_i = 1;
    document.querySelector("#victoryScreen").style.visibility = "visible"
    setCookie(Pname, PcontactNumber + "/" + time_fmt + "|" + time);
    getLeaderboard();
}

function reset() {
    location.reload();
}

let ci = 1;
function showAll() {
    console.log("hi");
    setInterval(() => showAllLogic(ci++), 60);
    setTimeout(hideAll, 4400);
}

function hideAll() {
    console.log("hello");
    for (let i = 0; i < cards; i++) {
        document.querySelector(".coverHide").className = "cover";
    }
    coHide = 1;
}

function showAllLogic(i) {
    console.log("logic");
    if (i <= cards) {
        console.log("#card" + i);
        document.querySelector("#card" + i).style.color = "black";
        document.querySelector("#cover" + i).className = "coverHide";
    }
}