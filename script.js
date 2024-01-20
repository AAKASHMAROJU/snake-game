const snake = document.querySelector(".snake");
const apple = document.querySelector("#apple-img");
const gameContainer = document.querySelector(".container");
const display = document.querySelector(".displayContainer");
const scoreCard = document.querySelector(".displayScoreContainer");
const snakeObjects = [snake];
const possiblitiePos = [];
var timer;
var score = 0;

for (let i = 0; i < 480; i += 20) {
  possiblitiePos.push(i);
}

apple.style.top = "200px";
apple.style.left = "200px";

const increaseSnake = () => {
  let n = snakeObjects.length;
  const newDiv = document.createElement("div");
  newDiv.classList.add("snake");
  newDiv.style.backgroundColor = "yellow";
  document.querySelector(".container").appendChild(newDiv);

  snakeObjects.push(newDiv);
  for (let i = n; i > 0; i--) {
    snakeObjects[i].style.top = snakeObjects[i - 1].style.top;
    snakeObjects[i].style.left = snakeObjects[i - 1].style.left;
  }
};

const isCollide = () => {
  if (
    Number(snake.style.top.slice(0, -2)) < 0 ||
    Number(snake.style.top.slice(0, -2)) > 480 ||
    Number(snake.style.left.slice(0, -2)) < 0 ||
    Number(snake.style.left.slice(0, -2)) > 480
  ) {
    return true;
  } else {
    let n = snakeObjects.length;
    for (let i = 1; i < n; i++) {
      if (
        snake.style.top == snakeObjects[i].style.top &&
        snake.style.left == snakeObjects[i].style.left
      ) {
        return true;
      }
    }
    return false;
  }
};

const placeApple = () => {
  let x = possiblitiePos[Math.floor(Math.random() * possiblitiePos.length)];
  let y = possiblitiePos[Math.floor(Math.random() * possiblitiePos.length)];
  apple.style.top = x + "px";
  apple.style.left = y + "px";
};

const gameOver = () => {
  clearInterval(timer);
  alert("Game Over");
  display.innerHTML = "<h1>Game Over!!</h1>";
};

const isEat = () => {
  if (
    apple.style.top == snake.style.top &&
    apple.style.left == snake.style.left
  ) {
    score++;
    displayScore();
    placeApple();
    increaseSnake();
    return true;
  }
  move_snakes();
  return false;
};

const move_snakes = () => {
  let n = snakeObjects.length;
  if (n == 1) return;
  for (let i = n - 1; i > 0; i--) {
    snakeObjects[i].style.top = snakeObjects[i - 1].style.top;
    snakeObjects[i].style.left = snakeObjects[i - 1].style.left;
  }
};
const displayScore = () => {
  scoreCard.innerHTML = `<h1>Score is ${score}</h1>`;
};

displayScore();
window.addEventListener("keydown", (event) => {
  clearInterval(timer);
  let curr_move = event.key;
  if (curr_move === "ArrowUp" && !isCollide()) {
    timer = setInterval(() => {
      isEat();
      snake.style.top = Number(snake.style.top.slice(0, -2)) - 20 + "px";

      if (isCollide()) gameOver();
    }, 500);
  } else if (curr_move === "ArrowDown" && !isCollide()) {
    timer = setInterval(() => {
      isEat();
      snake.style.top = Number(snake.style.top.slice(0, -2)) + 20 + "px";
      if (isCollide()) gameOver();
    }, 500);
  } else if (curr_move === "ArrowRight" && !isCollide()) {
    timer = setInterval(() => {
      isEat();
      snake.style.left = Number(snake.style.left.slice(0, -2)) + 20 + "px";
      if (isCollide()) {
        gameOver();
      }
    }, 500);
  } else if (curr_move === "ArrowLeft" && !isCollide()) {
    timer = setInterval(() => {
      isEat();
      snake.style.left = Number(snake.style.left.slice(0, -2)) - 20 + "px";
      if (isCollide()) {
        gameOver();
      }
    }, 500);
  } else {
    isEat();
    if (isCollide()) {
      gameOver();
    }
  }
});
