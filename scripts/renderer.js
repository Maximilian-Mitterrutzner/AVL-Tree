let canvas;
let ctx;
let mouseX = 0;
let mouseY = 0;

function initRenderer() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
    setInterval(draw, 1000 / 60);
    canvas.addEventListener("mousemove", 
		function(evt) {
			var rect = canvas.getBoundingClientRect();
			mouseX = evt.clientX - rect.left;
			mouseY = evt.clientY - rect.top;
		});
    
    Circle.radius = 20;
}

function draw() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.height, canvas.width);
	
	staticCircle = new Circle(400, 400);
    movedCircle = new Circle(mouseX, mouseY);
    
    drawConnection(staticCircle, movedCircle);
    
    staticCircle.draw();
    movedCircle.draw();
}
	

class Circle {
    static radius = 0;
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Circle.radius, 0, Math.PI * 2, true); //x, y, radius, startAngle, endAngle, clockwise
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
    }
}


function drawConnection(c1, c2) {
    if(dist(c1.x, c1.y, c2.x, c2.y) <= c1.radius + c2.radius) {
        return;
    }
    
    ctx.beginPath();
    ctx.moveTo(c1.x, c1.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function dist(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt((dx * dx) + (dy * dy));
}


