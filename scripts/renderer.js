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
    
    let treeHeight = rootNode.getHeight();
    if(treeHeight == 0) {
        return;
    }
    else if(treeHeight == 1) {
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
    spaces[0] = [canvas.width / 2, diameter];
    
    drawTree();
}

function drawTree() {
    rootNode.x = spaces[0][0];
    rootNode.y = spaces[0][1];
    drawSubTree(rootNode, 0);
    rootNode.draw();
}

function drawSubTree(node, curDepth) {
    drawIfPresent(node, node.lChild, curDepth + 1, -1);
    drawIfPresent(node, node.rChild, curDepth + 1, 1);
}

function drawIfPresent(parent, child, curDepth, leftRightDet) {
    if(child !== undefined) {        
        child.x = parent.x + spaces[curDepth] * leftRightDet;
        child.y = parent.y + heightDiff;
        
        drawSubTree(child, curDepth);
        drawConnection(parent, child);
        child.draw();
    }
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