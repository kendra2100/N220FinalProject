const SPEED = 6;

let ball = { x: 10, y: 10, xDir: 'right', yDir: 'down' };

let rightScore = 0;
let leftScore = 0;

let started = false;

function loop() {
  if (ball.y <= 0) {
    ball.yDir = 'down';
  }

  if (ball.y >= window.innerHeight - 20) {
    ball.yDir = 'up';
  }

  if (ball.xDir === 'right') {
    ball.x += SPEED;
  } else {
    ball.x -= SPEED;
  }

  if (ball.yDir === 'down') {
    ball.y += SPEED;
  } else {
    ball.y -= SPEED;
  }

  if (ball.x >= window.innerWidth - 20) {
    leftScore ++;
    document.getElementById('left-score').innerHTML = leftScore;

    ball.x = 10;
    ball.y = 10;

    ball.xDir = 'right';
    ball.yDir = 'down';
  } 
  
  if (ball.x <= 0) {
    rightScore ++;
    document.getElementById('right-score').innerHTML = rightScore;

    ball.x = 10;
    ball.y = 10;

    ball.xDir = 'right';
    ball.yDir = 'down';
  }

  const rightPaddle = document.getElementById('right-paddle').getBoundingClientRect();

  if (ball.x + 20 >= rightPaddle.left && ball.y >= rightPaddle.top && ball.y <= rightPaddle.bottom) {
    ball.xDir = 'left';
  }

  const leftPaddle = document.getElementById('left-paddle').getBoundingClientRect();

  if (ball.x <= leftPaddle.right && ball.y >= leftPaddle.top && ball.y <= leftPaddle.bottom) {
    ball.xDir = 'right';
  }

  document.getElementById('ball').style.left = ball.x + 'px';
  document.getElementById('ball').style.top = ball.y + 'px';

  requestAnimationFrame(loop);
}

let leftPaddle = { y: 0, loop: null };
let rightPaddle = { y: 0, loop: null };

let rightLoop;

const movePaddle = (side, direction) => () => {
  if (!started) return;

  let paddle;

  if (side === 'left') {
    paddle = leftPaddle;
  }

  if (side === 'right') {
    paddle = rightPaddle;
  }

  if (direction === 'up') {
    if (paddle.y > 0) {
      paddle.y -= SPEED * 2;
    }
  }

  if (direction === 'down') {
    if (paddle.y <= window.innerHeight + 160) {
      paddle.y += SPEED * 2;
    }
  }

  document.getElementById(side + '-paddle').style.top = paddle.y + 'px';

  paddle.loop = requestAnimationFrame(movePaddle(side, direction))
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp') {
    cancelAnimationFrame(rightPaddle.loop);
    rightPaddle.loop = requestAnimationFrame(movePaddle('right', 'up'))
  }

  if (event.code === 'ArrowDown') {
    cancelAnimationFrame(rightPaddle.loop);
    rightPaddle.loop = requestAnimationFrame(movePaddle('right', 'down'))
  }

  if (event.code === 'KeyW') {
    cancelAnimationFrame(leftPaddle.loop);
    leftPaddle.loop = requestAnimationFrame(movePaddle('left', 'up'))
  }

  if (event.code === 'KeyS') {
    cancelAnimationFrame(leftPaddle.loop);
    leftPaddle.loop = requestAnimationFrame(movePaddle('left', 'down'))
  }

  if (event.code === 'Space') {
    started = true;

    document.getElementById('ball').style.display = 'initial';
    document.getElementById('explanation').style.display = 'none';

    requestAnimationFrame(loop);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
    cancelAnimationFrame(rightPaddle.loop);
  }

  if (event.code === 'KeyW' || event.code === 'KeyS') {
    cancelAnimationFrame(leftPaddle.loop);
  }
});