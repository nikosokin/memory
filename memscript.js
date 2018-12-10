//declare variable
var points = 0;
var ImgArr = ["bowser.png", "donkeykong.png", "luigi.png", "mario.png", "number1.png", "peach.png", "toad.png", "wario.png", "yoshi.png"];

//double array

for(i=ImgArr.length-1; i >=0; i--){
    ImgArr.push(ImgArr[i]);
}

//declare 3 row variables

var board = ["row1", "row2", "row3"];

//declare variable to separate the rows into 3 for display reasons

var RowNum = ImgArr.length / board.length;

//functions to shuffle and display and hide

function displayCards(){
for(b=0; b < ImgArr.length; b++){

    var newImg = document.createElement("img");
    newImg.src = "sprites/" + ImgArr[b];
    newImg.id = b;
    newImg.className = "card";

    if(b/RowNum < 1){
        document.getElementById(board[0]).appendChild(newImg);
    }
    else if(b/RowNum < 2){
        document.getElementById(board[1]).appendChild(newImg);
    }
    else {
        document.getElementById(board[2]).appendChild(newImg);
    }
}
}
function shuffleCards(arr) {
    for (var i=0; i<arr.length; i++) {
        
        var x = Math.floor(Math.random()*arr.length);
        var y = Math.floor(Math.random()*arr.length);
    
        // swap them in the array
        var store = arr[x];
        arr[x] = arr[y];
        arr[y] = store;
    }
    return arr;
}
function hideCards(){
    var cards = document.getElementsByTagName("img");
    for(i=0;i<ImgArr.length;i++){
    cards[i].src = "sprites/red.png";
    }
}

shuffleCards(ImgArr);
displayCards();
window.setTimeout(hideCards, 1000);

console.log(ImgArr);

//make each image an event listener
var imgCard = document.getElementsByClassName("card");

for(z=0; z<ImgArr.length;z++){

    imgCard[z].addEventListener('click', TrackAndMatch);
}

//declare variable to record which images have been selected in a current round
var pastId = [];
var clickTwo = 0;
function TrackAndMatch(){
    var currentId = event.target.id;
    
    
    if(pastId.length<1){
        console.log("firstlog");
        pastId.push(currentId);
        document.getElementById(currentId).src="sprites/"+ImgArr[currentId];
    }

    else{
        pastId.push(currentId);
        document.getElementById(currentId).src="sprites/"+ImgArr[currentId];
        console.log(ImgArr[currentId]);
        }

    if(clickTwo<1){
        clickTwo++;
    }
    else{
        clickTwo = 0;
        console.log("two");
        removeListeners();
        
        if(document.getElementById(pastId[pastId.length-1]).src==document.getElementById(pastId[pastId.length-2]).src)
        {
            
            points+=10;
            document.getElementById("score").innerHTML = "Score: " + points;
            window.setTimeout(addListeners, 1000);
        }
        else{
            console.log("wrong");
            window.setTimeout(hidelasttwo,1000);
            window.setTimeout(addListeners, 1000);
            
        }


        }
        
    }
    

    

    function hidelasttwo(){
        document.getElementById(pastId[pastId.length-1]).src = "sprites/red.png";
        document.getElementById(pastId[pastId.length-2]).src = "sprites/red.png";
    }


function removeListeners(){
    for(z=0; z<ImgArr.length;z++){

        imgCard[z].removeEventListener('click', TrackAndMatch);
    }
}
function addListeners(){
    for(z=0; z<ImgArr.length;z++){

        imgCard[z].addEventListener('click', TrackAndMatch);
    }
    
}
