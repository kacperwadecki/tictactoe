var board = document.getElementById("game");
var button = document.getElementById("button");
var main = document.getElementById("main");

var arrayScore = [0,0,0,
                  0,0,0,
                  0,0,0];

var whoseTurn = Math.floor(Math.random() * 2);
var whichMove = 0;
var scoreX = 0;
var scoreO = 0;

button.addEventListener("click", drawBoard);

function drawBoard(){
    button.style.display = "none";
    board.style.background = "#1f1f24";
    board.style.marginLeft = "16%";

    // creating tiles on board
    for(var i=0; i<9; i++){
        var tiles = document.createElement("div");

        tiles.setAttribute("id", "tile" + i);
        tiles.classList.add("tiles");
        tiles.addEventListener("click", clickTile);
        board.appendChild(tiles);
    }

    // creating side panel
    var panel = document.createElement("div");

    panel.classList.add("panel");
    panel.setAttribute("id","panel");
    main.appendChild(panel);

    // creating textTurn
    var textTurn = document.createElement("p");

    textTurn.innerHTML = "Turn";
    textTurn.classList.add("textTurn");

    // creating whose turn img 
    var turn = document.createElement("div");
    var img = document.createElement("img");

    turn.classList.add("turn");
    img.classList = "img";
    img.setAttribute("id", "whoseTurn");
    turn.appendChild(img);
    panel.appendChild(turn);
    turn.appendChild(textTurn);

    // creating points board
    var score = document.createElement("div");

    score.classList.add("score");
    panel.appendChild(score);
    
    score.innerHTML = "Score: <br> X: " + scoreX + " O: " + scoreO;

    
    // creating button to reset game
    var buttonReset = document.createElement("button");
    buttonReset.classList.add("buttonReset");
    document.getElementById("panel").appendChild(buttonReset);
    buttonReset.innerHTML = "Reset";
    buttonReset.addEventListener("click", clearBoard);

    changeTurn();
}

function clickTile(){
        whichMove++;

        this.style.cursor = "default";

        // creating img tags to tiles
        var img = document.createElement("img");
        img.classList.add("img");
        this.appendChild(img);
        this.removeEventListener('click', clickTile);
        

        var tmp = this.id.charAt(this.id.length - 1);

        if(whoseTurn == 0){
            whoseTurn = 1;
            img.src = "img/x.png";
            arrayScore[tmp] = "x";
        }
        else{
            whoseTurn = 0;
            img.src = "img/o.png"
            arrayScore[tmp] = "o";
        }

        if(checkWin() == "x" || checkWin() == "o" || checkWin() =="draw"){

            for(var i=0; i<9; i++){
                var tmp2 = "tile" + i;
                tmp2 = document.getElementById(tmp2);
                tmp2.removeEventListener("click", clickTile);
            }
            // creating who won information
            var result = document.createElement("div");
            result.classList.add("result");
            document.getElementById("panel").appendChild(result);
            
            if(checkWin() == "x"){
                result.innerHTML = "X Won";
                scoreX++;
            }
            else if(checkWin() == "o"){
                result.innerHTML = "O Won";
                scoreO++;
            }
            else{
                result.innerHTML = "Draw"
            }

            document.getElementsByClassName("score")[0].innerHTML = "Score: <br> X: " + scoreX + "   O: " + scoreO;

            var buttonReset = document.getElementsByClassName("buttonReset")[0];
            buttonReset.style.background = "black";
        }
        changeTurn();
}

function checkWin(){
    if(arrayScore[0] == "x" && arrayScore[1] == "x" && arrayScore[2] == "x" || 
       arrayScore[3] == "x" && arrayScore[4] == "x" && arrayScore[5] == "x" ||
       arrayScore[6] == "x" && arrayScore[7] == "x" && arrayScore[8] == "x" ||
       arrayScore[0] == "x" && arrayScore[4] == "x" && arrayScore[8] == "x" ||
       arrayScore[2] == "x" && arrayScore[4] == "x" && arrayScore[6] == "x" ||
       arrayScore[0] == "x" && arrayScore[3] == "x" && arrayScore[6] == "x" ||
       arrayScore[1] == "x" && arrayScore[4] == "x" && arrayScore[7] == "x" ||
       arrayScore[2] == "x" && arrayScore[5] == "x" && arrayScore[8] == "x"){
        return "x";
    }
    else if(arrayScore[0] == "o" && arrayScore[1] == "o" && arrayScore[2] == "o" || 
            arrayScore[3] == "o" && arrayScore[4] == "o" && arrayScore[5] == "o" ||
            arrayScore[6] == "o" && arrayScore[7] == "o" && arrayScore[8] == "o" ||
            arrayScore[0] == "o" && arrayScore[4] == "o" && arrayScore[8] == "o" ||
            arrayScore[2] == "o" && arrayScore[4] == "o" && arrayScore[6] == "o" ||
            arrayScore[0] == "o" && arrayScore[3] == "o" && arrayScore[6] == "o" ||
            arrayScore[1] == "o" && arrayScore[4] == "o" && arrayScore[7] == "o" ||
            arrayScore[2] == "o" && arrayScore[5] == "o" && arrayScore[8] == "o"){
        return "o";
    }
    else if(whichMove == 9){
        return "draw";
    }
    return 0;
}

function clearBoard(){
    whichMove = 0;
    arrayScore = [0,0,0,0,0,0,0,0,0];
    whoseTurn = Math.floor(Math.random() * 2);

    var result = document.getElementsByClassName("result")[0];
    if(result != null) result.parentNode.removeChild(result);

    for(var i=0; i<9; i++){
        var tmp2 = "tile" + i;
        tmp2 = document.getElementById(tmp2);
        tmp2.addEventListener("click", clickTile);
    }

    var images = document.getElementsByTagName('img');
    var l = images.length;
    for (var i = 0; i < l - 1; i++) {
        images[0].parentNode.removeChild(images[0]);
    }

    var buttonReset = document.getElementsByClassName("buttonReset")[0];
    buttonReset.style.background = "#989899";

    changeTurn();
}

function changeTurn(){
    if(whoseTurn == 1) document.getElementById("whoseTurn").src ="img/o.png";
    else document.getElementById("whoseTurn").src ="img/x.png";
}