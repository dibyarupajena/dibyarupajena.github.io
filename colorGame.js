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

easybtn.addEventListener("click", function(){
    easybtn.classList.add("selected");
    hardbtn.classList.remove("selected");
    numColors = 3;
    colors = generateRandomColor(numColors);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < square.length; i++){
        if (colors[i]) {
            square[i].style.backgroundColor = colors[i];
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
    for(var i = 0; i < square.length; i++){
        
            square[i].style.backgroundColor = colors[i];
            square[i].style.display = "block";
        }
    
})

for (var i = 0; i < square.length; i++) {
     square[i].style.backgroundColor = colors[i];
    
     square[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        console.log(clickedColor, pickedColor);
        if (clickedColor === pickedColor) {
            message.textContent="Correct!";
            changeColors(clickedColor);
            h1.style.backgroundColor = pickedColor;
            reset.textContent = "Play again?"
            
         } else {
            this.style.backgroundColor= "#232323";
            message.textContent="Try again";
         }
     });
}  

reset.addEventListener("click", function(){
    colors = generateRandomColor(numColors);
    pickedColor = pickColor();
    message.textContent="";
    colorDisplay.textContent = pickedColor;
    reset.textContent = "New Colors"
    for (var i = 0; i < square.length; i++) {
     square[i].style.backgroundColor = colors[i];
 }
    h1.style.backgroundColor = "steelblue";
});
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