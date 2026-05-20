var numColors = 6;
var colors = generateRandomColor(numColors);
console.log(colors.length);
var square = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var easybtn = document.querySelector("#easybtn");
var hardbtn = document.querySelector("#hardbtn");
var currentScore = document.getElementById("currentScore");
var playerName = document.getElementById("playerName");
var saveScoreBtn = document.getElementById("saveScore");
var leaderboardList = document.getElementById("leaderboardList");

var score = 0;
var turns = 0;
var roundPoints = 0;
var maxRoundPoints = 10;
var gameWon = false;
var leaderboard = loadLeaderboard();
updateLeaderboardUI();

var turnCount = document.getElementById("turnCount");
var roundPointsVal = document.getElementById("roundPointsVal");

resetRound();

easybtn.addEventListener("click", function(){
    easybtn.classList.add("selected");
    hardbtn.classList.remove("selected");
    numColors = 3;
    colors = generateRandomColor(numColors);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    message.textContent = "";
    resetRound();
    for(var i = 0; i < square.length; i++){
        if (colors[i]) {
            square[i].style.backgroundColor = colors[i];
            square[i].style.display = "block";
        } else {
            square[i].style.display = "none";
        }
    }
})

hardbtn.addEventListener("click", function(){
    hardbtn.classList.add("selected");
    easybtn.classList.remove("selected");
    numColors = 6;
    colors = generateRandomColor(numColors);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    message.textContent = "";
    resetRound();
    for(var i = 0; i < square.length; i++){
        square[i].style.backgroundColor = colors[i];
        square[i].style.display = "block";
    }
})

for (var i = 0; i < square.length; i++) {
    square[i].style.backgroundColor = colors[i];
    square[i].addEventListener("click", function(){
        if (gameWon) {
            return;
        }
        turns++;
        turnCount.textContent = turns;
        var clickedColor = this.style.backgroundColor;
        console.log(clickedColor, pickedColor);
        if (clickedColor === pickedColor) {
            var points = Math.max(maxRoundPoints - turns + 1, 1);
            score += points;
            roundPoints = points;
            currentScore.textContent = score;
            roundPointsVal.textContent = roundPoints;
            gameWon = true;
            message.textContent = "Correct! +" + points + " points in " + turns + " guesses.";
            changeColors(clickedColor);
            h1.style.backgroundColor = pickedColor;
            reset.textContent = "Play again?";
        } else {
            this.style.backgroundColor = "#232323";
            message.textContent = "Try again";
        }
    });
}

reset.addEventListener("click", function(){
    colors = generateRandomColor(numColors);
    pickedColor = pickColor();
    message.textContent="";
    colorDisplay.textContent = pickedColor;
    reset.textContent = "New Colors";
    resetRound();
    for (var i = 0; i < square.length; i++) {
        square[i].style.backgroundColor = colors[i];
        square[i].style.display = "block";
    }
    h1.style.backgroundColor = "steelblue";
});

function resetRound(){
    turns = 0;
    roundPoints = 0;
    gameWon = false;
    turnCount.textContent = turns;
    roundPointsVal.textContent = roundPoints;
}

saveScoreBtn.addEventListener("click", function(){
    var name = playerName.value.trim() || "Anonymous";
    if (score <= 0) {
        message.textContent = "Play and win once before saving a score.";
        return;
    }
    addScore(name, score);
    playerName.value = "";
    message.textContent = "Score saved to leaderboard!";
});

function addScore(name, value){
    leaderboard.push({ name: name, score: value });
    leaderboard.sort(function(a, b){ return b.score - a.score; });
    leaderboard = leaderboard.slice(0, 5);
    saveLeaderboard();
    updateLeaderboardUI();
}

function saveLeaderboard(){
    localStorage.setItem("colorGameLeaderboard", JSON.stringify(leaderboard));
}

function loadLeaderboard(){
    var stored = localStorage.getItem("colorGameLeaderboard");
    if (!stored) {
        return [];
    }
    try {
        return JSON.parse(stored).sort(function(a, b){ return b.score - a.score; });
    } catch(e) {
        return [];
    }
}

function updateLeaderboardUI(){
    leaderboardList.innerHTML = "";
    if (!leaderboard.length) {
        var emptyItem = document.createElement("li");
        emptyItem.textContent = "No scores yet";
        leaderboardList.appendChild(emptyItem);
        return;
    }
    leaderboard.forEach(function(entry){
        var li = document.createElement("li");
        li.textContent = entry.name + " - " + entry.score + " pts";
        leaderboardList.appendChild(li);
    });
}

function changeColors(color){
    for (var i = 0; i < square.length; i++) {
        square[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColor(num){
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb("+ r +", "+ g +", "+ b +")";
}