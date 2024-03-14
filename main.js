const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//deklarasi gambar
let background = new Image();
background.src = "./assets/space.png";

let plane = new Image();
plane.src = "./assets/airplane.png";

let laser = new Image();
laser.src = "./assets/laser.png";

let ufo = new Image();
ufo.src = "./assets/ufo.png";
//deklarasi objek
const playerSize = 50;
const bulletSize = playerSize / 2 - 10;
const bullets = [];
const player = {
  x: (width - playerSize) / 2,
  y: height - playerSize,
};

const enemy = {
  x: (width - playerSize) / 2,
  y: 0 - playerSize,
};

let gameloop;

window.onload = function () {
  conntroller();
  gameloop = setInterval(draw, 200);
};

const draw = function () {
  drawBackground();
  collisionDetectionSelf();
  drawPlayer();
  drawBullet();
  collisionDetection();
  drawEnemy();
};

const collisionDetectionSelf = function () {
  if (
    player.x + playerSize > enemy.x &&
    enemy.x + playerSize > player.x &&
    enemy.y + playerSize > player.y &&
    player.y + playerSize > enemy.y
  ) {
    let bomb = new Audio("./assets/bomb.mp3");
    bomb.play();
    clearInterval(gameloop);
    alert("game over");
  }
};

const collisionDetection = function () {
  bullets.forEach(function (bullet) {
    if (
      bullet.y < enemy.y + playerSize &&
      enemy.x + playerSize > bullet.x &&
      bullet.x + bulletSize > enemy.x
    ) {
      bullets.splice(bullets.indexOf(bullet), 1);
      let bomb = new Audio("./assets/bomb.mp3");
      bomb.play();
      enemy.x = Math.floor((Math.random() * width) / playerSize) * playerSize;
      enemy.y = 0 - playerSize;
    }
  });
};

const drawEnemy = function () {
  ctx.drawImage(ufo, enemy.x, enemy.y, playerSize, playerSize);
  enemy.y += playerSize;
  if (enemy.y > height) {
    enemy.x = Math.floor((Math.random() * width) / playerSize) * playerSize;
    enemy.y = 0 - playerSize;
  }
};

const drawPlayer = function () {
  ctx.drawImage(plane, player.x, player.y, playerSize, playerSize);
};

const drawBackground = function () {
  ctx.drawImage(background, 0, 0, width, height);
};

const drawBullet = function () {
  bullets.forEach(function (bullet) {
    ctx.drawImage(laser, bullet.x, bullet.y, bulletSize, playerSize);
    bullet.y -= playerSize;
  });
};

const conntroller = function () {
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      player.x -= playerSize;
    } else if (event.key === "ArrowRight") {
      player.x += playerSize;
    }

    if (event.key === " " || event.key === "Enter") {
      bullets.push({
        x: player.x + (playerSize / 2 - 6),
        y: player.y - playerSize,
      });
      let LaserSound = new Audio("./assets/laser.mp3");
      LaserSound.play();
    }
    if (player.x < 0) {
      player.x = 0;
    } else if (player.x > width - playerSize) {
      player.x = width - playerSize;
    }
  });
};
