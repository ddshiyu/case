
var wrapper = document.querySelector('#wrapper');
var lettersWrapper = document.querySelector('#letters-main');
var board = document.querySelector('.score');
var gameOverBox = document.querySelector('#gameOver');
var letterArr = [];
var moveTime = null;
var createTime = null;
var score = 0;
var lost = 0;
var maxLost = 1;
function Letter() {
    this.letter = romLetter();
    this.left = getRom(0, wrapper.offsetWidth - 330);
    this.top = -100;
    this.dom = document.createElement('img');
    this.speed = getRom(20, 100);
    this.dom.className = 'letters';
    this.dom.src = `./img/letter/${this.letter}.png`;
    lettersWrapper.appendChild(this.dom);
    this.show();
}
Letter.prototype.show = function () {
    this.dom.style.left = this.left + 'px';
    this.dom.style.top = this.top + 'px';
}
Letter.prototype.letterMove = function (duration) {
    var dis = duration / 1000 * this.speed;
    this.top += dis;
    this.show();
}
Letter.prototype.kill = function () {
    this.dom.remove();
    var index = letterArr.indexOf(this);
    if (index !== -1) {
        letterArr.splice(index, 1);
    }
}
function createLetter() {
    clearInterval(createTime);
    createTime = setInterval(function () {
        letterArr.push(new Letter());
    }, 1000)
}


function move() {
    clearInterval(moveTime);
    moveTime = setInterval(function () {
        for (let i = 0; i < letterArr.length; i++) {
            var letter = letterArr[i];
            letter.letterMove(15);
            if (letter.top > lettersWrapper.offsetHeight) {
                letter.kill();
                lost ++;
                getScroe();
                if(lost === maxLost){
                    console.log('fff')
                    gameOver();
                }
            }
        }
    }, 16);
}

function getRom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function romLetter() {
    return String.fromCharCode(getRom(65, 91));
}
function getScroe(){
    board.innerHTML = `
        <p>得分：${score}</p>
        <p>丢失：${lost}/${maxLost}</p>
    `
}
function gameOver(){
    clearInterval(moveTime);
    clearInterval(createTime);
    window.onkeypress = null;
    gameOverBox.style.display = 'block';
}
window.onkeypress = function (e) {
    var k = e.key.toUpperCase();
    letterArr.forEach(function (item,index,arr) {
        if(item.letter == k){
            item.kill();
            score ++;
        }
    })
    getScroe();
};
function start(){
    createLetter();
    move();
}

start();




