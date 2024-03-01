const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//declare gambar
let background = new Image();
background.src = "./assets/space.png";

let plane = new Image();
plane.src = "./assets/plane.png";

let laser = new Image();
laser.src = "./assets/laser.png";

//declare objek
const playerSize = 50;
const bullets = [];

const player = {
  x: (width - playerSize) / 2,
  y: height - playerSize,
};

let gameloop;

window.onload = function () {
  controller();
  gameloop = setInterval(draw, 100);
};
const draw = function () {
  drawBackground();
  drawPlayer();
  drawBullets();
};

const drawPlayer = function () {
  ctx.drawImage(plane, player.x, player.y, playerSize, playerSize);
};

const drawBackground = function () {
  ctx.drawImage(background, 0, 0, width, height);
};
const drawBullets = function () {
  bullets.forEach(function (bullet) {
    const bulletSize = playerSize / 2 - 10;
    ctx.drawImage(laser, bullet.x, bullet.y, bulletSize, playerSize);
    bullet.y -= playerSize;
  });
};
const controller = function () {
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
    }

    if (player.x < 0) {
      player.x = 0;
    } else if (player.x > width - playerSize) {
      player.x = width - playerSize;
    }
  });
};
