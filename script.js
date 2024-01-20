const snake = document.querySelector('.snake');
const apple = document.querySelector('#apple-img');
const gameContainer = document.querySelector('.container');
const display = document.querySelector('.displayContainer');
const snakeObjects = [snake];
const possiblitiePos = [];
var timer;

for (let i = 0; i < 480; i += 20) {
    possiblitiePos.push(i);
}

apple.style.top = '200px';
apple.style.left = '200px';


// snake.style.position='relative';
snake.style.top = "0px"
snake.style.left = "0px"

const increaseSnake = () => {
    let n = snakeObjects.length;
    const newDiv = document.createElement('div');
    newDiv.classList.add('snake');
    newDiv.style.backgroundColor = 'yellow';
    document.querySelector('.container').appendChild(newDiv);

    snakeObjects.push(newDiv);
    for (let i = 1; i <= n; i++) {
        snakeObjects[i].style.top = snakeObjects[i - 1].style.top;
        snakeObjects[i].style.left = snakeObjects[i - 1].style.left;
    }
}


const isCollide = () => {
    if (Number(snake.style.top.slice(0, -2)) < 0 || Number(snake.style.top.slice(0, -2)) > 480 || Number(snake.style.left.slice(0, -2)) < 0 || Number(snake.style.left.slice(0, -2)) > 480) {
        return true;
    }
    return false;
}


const placeApple = () => {
    let x = possiblitiePos[Math.floor(Math.random() * possiblitiePos.length)];
    let y = possiblitiePos[Math.floor(Math.random() * possiblitiePos.length)];
    apple.style.top = x + "px";
    apple.style.left = y + "px";

}


const gameOver = () => {
    clearInterval(timer);
    alert("Game Over");
    display.innerHTML = "<h1>Game Over!!</h1>"
}


const isEat = () => {
    if (apple.style.top == snake.style.top && apple.style.left == snake.style.left) {
        console.log("Eated ");
        placeApple();
        increaseSnake();
        return true;
    }
    return false;
}



const move_snakes = () => {
    let n = snakeObjects.length;
    if (n == 1) return;
    for (let i = 1; i < n; i++) {
        snakeObjects[i].style.top = snakeObjects[i - 1].style.top;
        snakeObjects[i].style.left = snakeObjects[i - 1].style.left;
    }
}


window.addEventListener('keydown', (event) => {
    clearInterval(timer);
    let curr_move = event.key;
    if (curr_move === 'ArrowUp' && !isCollide()) {
        timer = setInterval(() => {
            snake.style.top = (Number(snake.style.top.slice(0, -2)) - 20) + "px";
            isEat();

            if (isCollide()) gameOver();
        }, 500);
    }
    else if (curr_move === 'ArrowDown' && !isCollide()) {
        timer = setInterval(() => {

            snake.style.top = (Number(snake.style.top.slice(0, -2)) + 20) + "px";
            isEat();
            if (isCollide()) gameOver();

        }, 500);
    }
    else if (curr_move === 'ArrowRight' && !isCollide()) {
        timer =
            setInterval(() => {

                snake.style.left = (Number(snake.style.left.slice(0, -2)) + 20) + "px";
                isEat();
                if (isCollide()) {
                    gameOver();
                }
            }, 500);
    }
    else if (curr_move === 'ArrowLeft' && !isCollide()) {

        timer =
            setInterval(() => {

                snake.style.left = (Number(snake.style.left.slice(0, -2)) - 20) + "px";
                isEat();
                if (isCollide()) {
                    gameOver();
                }
            }, 500);
    }
    else {
        isEat();
        if (isCollide()) {
            gameOver();
        }
    }


});