const cities = [
  { name: "La Paz, BCS", offset: 0 },
  { name: "Ciudad de México", offset: -1 },
  { name: "Barcelona, Esp", offset: 8 },
];

function setup() {
  const canvas = createCanvas(windowWidth * 0.6, windowHeight * 0.7);
  canvas.parent("sketch-container");
  textSize(16);
}

function windowResized() {
  resizeCanvas(windowWidth * 0.6, windowHeight * 0.7);
}

function draw() {
  background(241, 148, 138);

  const timeInput = document.getElementById("time");
  const [hourStr, minuteStr] = timeInput.value.split(":");
  const hour = parseInt(hourStr) % 12;
  const minute = parseInt(minuteStr);
  const sec = second();

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const cityHour = (hour + city.offset) % 12;
    drawClock(220 + i * 260, 220, 100, cityHour, minute, sec);
    fill(15, 147, 243);
    text(city.name, 220 + i * 260, 350);
  }
}

function drawClock(x, y, radius, hour, minute, sec) {
  drawCircle(x, y, radius);
  drawNumbers(x, y, radius);
  const secondAngle = map(sec, 0, 60, 0, TWO_PI) - HALF_PI;
  const minuteAngle = map(minute, 0, 60, 0, TWO_PI) - HALF_PI;
  const hourAngle = map((hour % 12) + minute / 60, 0, 12, 0, TWO_PI) - HALF_PI;

  drawHand(x, y, radius * 0.5, secondAngle, 1, "blue");
  drawHand(x, y, radius * 0.4, minuteAngle, 2, "yellow");
  drawHand(x, y, radius * 0.3, hourAngle, 3, "red");
}

function drawCircle(x, y, diameter) {
  noFill();
  stroke(150);
  strokeWeight(2);
  ellipse(x, y, diameter);
}

function drawNumbers(x, y, radius) {
  textSize(20);
  textAlign(CENTER, CENTER);
  for (let i = 1; i <= 12; i++) {
    const angle = map(i, 0, 12, 0, TWO_PI) - HALF_PI;
    const x1 = x + cos(angle) * radius * 0.8;
    const y1 = y + sin(angle) * radius * 0.8;
    fill(18, 17, 19);
    text(i.toString().padStart(2, "0"), x1, y1);
  }
}

function drawHand(x, y, length, angle, thickness, color) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(color);
  strokeWeight(thickness);
  line(0, 0, length, 0);
  pop();
}
