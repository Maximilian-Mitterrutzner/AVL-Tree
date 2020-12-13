let canvas;
let ctx;
let mouseX = 0;
let mouseY = 0;
let heightDiff;
let spaces;

function initRenderer() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
}

function draw() {
	ctx.fillRect(0, 0, canvas.height, canvas.width);
    
    if(rootNode === undefined) {
        return;
    }
    
    let treeHeight = rootNode.getHeight();

    if(treeHeight == 1) {
        Circle.radius = canvas.height / 4;
        rootNode.x = canvas.width / 2;
        rootNode.y = canvas.height / 2;
        rootNode.draw();
        return;
    }

    //Calculate positions
    let leafCount = Math.pow(2, treeHeight - 1);
    let diameter = canvas.width / (leafCount * 2);
    let radius = diameter / 2;
    ctx.font = (radius / 2) + "px Arial";
    Circle.radius = radius;
    heightDiff = (canvas.height - 2 * diameter) / (treeHeight - 1);
    spaces = [];
    
    spaces[treeHeight - 1] = diameter;
    for(let i = treeHeight - 2; i >= 0; i--) {
        spaces[i] = spaces[i + 1] * 2;
    }
    
    rootNode.x = canvas.width / 2;
    rootNode.y = diameter;
    drawSubTree(rootNode, 1);
    rootNode.draw();
}

function drawSubTree(node, curDepth) {
    node.childNodes.forEach((child, index) => {
        if(child !== undefined) {
            child.x = node.x + spaces[curDepth] * index;
            child.y = node.y + heightDiff;

            drawSubTree(child, curDepth + 1);
            drawConnection(node, child);
            child.draw();
        }
    });
}

function drawConnection(c1, c2) {
    if(dist(c1.x, c1.y, c2.x, c2.y) <= 2 * Circle.radius) {
        return;
    }
    
    ctx.beginPath();
    ctx.moveTo(c1.x, c1.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.closePath();
    ctx.stroke();
}

function dist(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt((dx * dx) + (dy * dy));
}