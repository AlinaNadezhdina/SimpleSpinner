const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let cX = canvas.width / 2;
let cY = canvas.height / 2;
let radius = 200;
var startAngle = 0;//Math.PI * speed;

var spinTimeout = null;
var spinArcStart = 10;
var spinTime = 10;
var spinTimeTotal = 10;

function drawCircle(cX, cY, radius) {

	let startAng = 0;
	let endAng = Math.PI / 6;
	
	for (let index = 0; index < 12; index++) {	
		ctx.beginPath();
		ctx.moveTo(cX, cY);
		ctx.arc(cX, cY, radius, startAng, endAng);
		ctx.fillStyle = index % 2 == 0 ? "#3498db" : "#e74c3c";
		ctx.fill();
		startAng = endAng;
		endAng +=  2 * Math.PI / 6;
	}
	ctx.beginPath();
	ctx.arc(cX, cY, 100, 0, 2 * Math.PI);
	ctx.fillStyle = "white";
	ctx.fill();

}

function drawArrow(angle) {
	let arrowX = cX + radius * Math.cos(angle);
	let arrowY = cY + radius * Math.sin(angle);
	ctx.beginPath();
	ctx.moveTo(cX, cY);
	ctx.lineWidth = 5;
	ctx.lineTo(arrowX, arrowY);
	ctx.stroke();
}

function draw() { 
	drawCircle(cX, cY, radius);
	drawArrow(startAngle);
}

function init() {
	startAngle = 0;
	spin();
 }

function rotateArrow() {
	clearTimeout(spinTimeout);
	spinTime = spinTime + 10; //делай оборот больше 360 градусов
	if (spinTime >= spinTimeTotal) {
		return;
	}
	let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal); //метод easeout - анимация в обратном порядке
	startAngle += (spinAngle * Math.PI / 180);
	draw();
	spinTimeout = setInterval('rotateArrow()'); // вызываем круг один раз, через определенный интервал времени
}

function easeOut(t, b, c, d) {
	let ts = (t /= d) * t;
	let tc = ts * t;
	return b + c * (tc + -3 * ts + 3 * t);
	}

function spin() {
	spinAngleStart = Math.floor(Math.random() * 16 + 16); //random - Возвращает случайное число между 0 и 1 * 100
	spinTime = 0;
	spinTimeTotal = Math.random() * 3 + 4 * 1500;
	rotateArrow();
}
draw();