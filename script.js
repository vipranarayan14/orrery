const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");

const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

/************ Config ************/

// Sun
const SUN_RADIUS = 20;
const SUN_COLOR = "#ffff00";

const SUN_X = CENTER_X;
const SUN_Y = CENTER_Y;

// Earth
const EARTH_RADIUS = 8;
const EARTH_DISTANCE = 100;
const EARTH_VELOCITY = 0.005;
const EARTH_COLOR = "#00a000";

// Moon
const MOON_RADIUS = 5;
const MOON_VELOCITY = 0.1;
const MOON_DISTANCE = 15;
const MOON_COLOR = "#fefefe";

// Jupiter
const JUPITER_RADIUS = 12;
const JUPITER_VELOCITY = 0.00045;
const JUPITER_DISTANCE = 180;
const JUPITER_COLOR = "#ff8800";

/************ Config ************/

const drawCircle = (x, y, radius, color) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

class Planet {
  constructor(distance, velocity, radius, color, radians = 0) {
    this.distance = distance;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.radians = radians;

    this.center_x = SUN_X;
    this.center_y = SUN_Y;

    this.pos_x = 0;
    this.pos_y = 0;
  }

  draw() {
    drawCircle(this.pos_x, this.pos_y, this.radius, this.color);
  }

  update() {
    this.radians += this.velocity;
    this.pos_x = this.center_x + Math.cos(this.radians) * this.distance;
    this.pos_y = this.center_y + Math.sin(this.radians) * this.distance;

    this.draw();
  }
}

class Moon extends Planet {
  constructor(...args) {
    super(...args);

    this.velocity = this.velocity + earth.velocity;
  }

  update(center_x, center_y) {
    this.center_x = center_x;
    this.center_y = center_y;
    super.update();
  }
}

const drawSun = () => drawCircle(SUN_X, SUN_Y, SUN_RADIUS, SUN_COLOR);

const earth = new Planet(
  EARTH_DISTANCE,
  EARTH_VELOCITY,
  EARTH_RADIUS,
  EARTH_COLOR
);

const moon = new Moon(MOON_DISTANCE, MOON_VELOCITY, MOON_RADIUS, MOON_COLOR);

const jupiter = new Planet(
  JUPITER_DISTANCE,
  JUPITER_VELOCITY,
  JUPITER_RADIUS,
  JUPITER_COLOR
);

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSun();
  earth.update();

  moon.update(earth.pos_x, earth.pos_y);

  jupiter.update();
};

setInterval(draw, 10);
