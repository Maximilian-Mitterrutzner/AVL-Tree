let canvas;
let ctx;
let mouseX = 0;
let mouseY = 0;

function initRenderer() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
}

function draw() {
    console.log(rootNode);
    
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.height, canvas.width);
    
    let treeHeight = rootNode.getHeight();
    console.log("TreeHeight: " + treeHeight);
    if(treeHeight == 0) {
        return;
    }
    else if(treeHeight == 1) {
        rootNode.x = canvas.width / 2;
        rootNode.y = canvas.height / 2;
        rootNode.draw();
        return;
    }

    //Calculate positions
    let leafCount = Math.pow(2, treeHeight - 1);
    let diameter = canvas.width / (leafCount * 2);
    let radius = diameter / 2;
    let heightDiff = (canvas.height - diameter) / (treeHeight - 1);
    console.log("(" + canvas.height + " - (" + treeHeight + " * " + radius + ")) / (" + treeHeight + " - 1)");
    console.log("HeightDiff: " + heightDiff + ". Radius: " + radius + ". Height: " + treeHeight);
    Circle.radius = radius;
    
    let prevInset = canvas.width / 2;
    let spaces = [[prevInset, radius]];
    
    for(let i = 1; i < treeHeight; i++) {
        let currentBreadth = Math.pow(2, i);
        let space = prevInset / 2;
        let height = spaces[i - 1][1] + heightDiff;
        
        spaces[i] = [space, height];
        
        let neededSpace = space * (currentBreadth - 1);
        prevInset = (canvas.width - neededSpace) / 2;
    }
    
    console.log(spaces);
    
    drawTree(spaces);
}

function drawTree(spaces) {
    //Colors
    rootNode.x = spaces[0][0];
    rootNode.y = spaces[0][1];
    drawSubTree(rootNode, spaces, 0);
    rootNode.draw();
}

function drawSubTree(node, spaces, curDepth) {
    drawIfPresent(node, node.lChild, spaces, curDepth + 1, -1);
    drawIfPresent(node, node.rChild, spaces, curDepth + 1, 1);
}

function drawIfPresent(parent, child, spaces, curDepth, leftRightDet) {
    if(child !== undefined) {        
        child.x = parent.x + (spaces[curDepth][0] + Circle.radius) * leftRightDet;
        child.y = spaces[curDepth][1];
        
        drawSubTree(child, spaces, curDepth);
        drawConnection(parent, child);
        child.draw();
    }
}

class Circle {
    static radius = 0;
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Circle.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
    }
}


function drawConnection(c1, c2) {
    if(dist(c1.x, c1.y, c2.x, c2.y) <= 2 * Circle.radius) {
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