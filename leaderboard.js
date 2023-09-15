function getLeaderboard() {
    let cDecode = decodeURIComponent(document.cookie);
    let cookArray = cDecode.split("; ");
    let players = [];
    cookArray.forEach(element => {
        if (element.indexOf("/") != -1) {
            players.push(element);
        }
    }); 
    let player_sorted = [];
    console.log(players)
    players.forEach(element => {
        let pn = element.substr(0, element.indexOf("="));
        let pt = element.substr(element.indexOf("/") + 1, element.indexOf("|") - element.indexOf("/") - 1);
        let pt_ms = element.substr(element.indexOf("|") + 1) * 1000;
        player_sorted.push({uname: pn, time: pt_ms});
    });

    player_sorted.sort((a, b) => {
        return a.time - b.time;
    });
    console.log(player_sorted);

    let i = 1;
    player_sorted.forEach(element => {
        let time_score = '';
        let time = element.time / 1000;
        if (time < 60 && time < 10) {
            time_score = "0:0" + time;
        } else if (time < 60 && time >= 10) {
            time_score = "0:" + time;
        } else {
            let seconds = time/60;
            let minutes = Math.floor(seconds);
            let leftover = time - (minutes * 60);
            if (leftover < 60 && leftover < 10) {
                time_score = minutes + ":0" + leftover;
            } 
            else if (leftover < 60 && leftover >= 10) {
                time_score = minutes + ":" + leftover;
            }
        }
        console.log(time_score);
        if (i <= player_sorted.length) {
            document.querySelector("#leaderboard").insertAdjacentHTML("beforeend", 
            "<div class='player'><h3 id=rank>" + i + "</h3><p id=pName>" + element.uname + "</p><p id=pTime>" + time_score + "</p></div>")
        }
        if (Pname == element.uname) {
            pRank = i;
        }
        i++
    });
}
