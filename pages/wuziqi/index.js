
var config = {
    row: 15,
    col: 15,
    chessLen:40,
    gameDom:document.getElementsByClassName("main")[0],
    msgDom:document.getElementsByClassName("info")[0]
}
var board;
var nextChess = 1;
function init(){
    initBoard();
    putEvent();
    showMsg();
}

function initBoard(){
    board = new Array(config.row);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(config.col);
        board[i].fill(0)
    }
}

// 0代表没有棋子，1代表黑色， 2代表白色

function putChess(row,col){
    if(row < 0 || col < 0 || row > config.row - 1 || col > config.col - 1){
        return;
    }
    if(board[row][col]){
        return;
    }
    board[row][col] = nextChess;
    var div = document.createElement("div");
    div.style.left = col * config.chessLen + 'px'
    div.style.top = row * config.chessLen + 'px'
    div.className = "chess " + (nextChess === 1 ? "black" : "white");
    config.gameDom.appendChild(div);
    if(nextChess === 1){
        nextChess = 2;
    }else{
        nextChess = 1;
    }
    showMsg();
    if(youWin(row,col)){
        config.gameDom.onclick = null;
        if(nextChess === 1){
            config.msgDom.innerHTML = "游戏结束，白子胜利"
        }else if(nextChess === 2){
            config.msgDom.innerHTML = "游戏结束，黑子胜利"
        }
        
    };
}
function putEvent(){
    config.gameDom.onclick = function (e){
        var x = Math.round((e.offsetX - 20) / config.chessLen);
        var y = Math.round((e.offsetY - 20) / config.chessLen);
        putChess(y, x);
    }
}

function getChess(row,col){
    if(board[row] == undefined){
        return;
    }
    if(board[row][col] == undefined){ 
        return;
    }
    return board[row][col];
}

function youWin(row, col){
    var nowChess = getChess(row, col);
    var line = 1;
    for(var i = col + 1; getChess(row,i) === nowChess;i++){
        line ++;
    }
    for(var i = col - 1; getChess(row,i) === nowChess;i--){
        line ++;
    }
    if(line >= 5){
        return true;
    }
    var line = 1;
    for(var i = row + 1; getChess(i, col) === nowChess; i ++){
        line ++
    }
    for(var i = row - 1; getChess(i, col) === nowChess; i --){
        line ++
    }
    if(line >= 5){
        return true;
    }
    var line = 1;
    for(var i = row - 1,j = col + 1; getChess(i, j) === nowChess; i --,j ++){
        line ++
    }
    for(var i = row + 1,j = col - 1; getChess(i, j) === nowChess; i ++,j --){
        line ++
    }
    if(line >= 5){
        return true;
    }
    var line = 1;
    for(var i = row - 1,j = col - 1; getChess(i, j) === nowChess; i --,j --){
        line ++
    }
    for(var i = row + 1,j = col + 1; getChess(i, j) === nowChess; i ++,j ++){
        line ++
    }
    if(line >= 5){
        return true;
    }
}
function showMsg(){
    if(nextChess === 1){
        config.msgDom.innerHTML = '黑子下'
    }else if(nextChess === 2){
        config.msgDom.innerHTML = '白子下'
    }
}
init()
