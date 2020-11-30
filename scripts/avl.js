let rootNode;

function addNode(toAdd) {
    if(rootNode === undefined) {
        rootNode = toAdd;
        draw();
        return;
    }
    
    let currentNode = rootNode;
    while(toAdd.parent === undefined) {
        switch(toAdd.key.localeCompare(currentNode.key)) {
            case 0:
                throw new DuplicateError("The tree already contains this key");
                return;
            case -1:
                if(currentNode.lChild === undefined) {
                    currentNode.lChild = toAdd;
                    toAdd.parent = currentNode;
                }
                else {
                    currentNode = currentNode.lChild;
                }
                break;
            case 1:
                if(currentNode.rChild === undefined) {
                    currentNode.rChild = toAdd;
                    toAdd.parent = currentNode;
                }
                else {
                    currentNode = currentNode.rChild;
                }
                break;
        }
    }
    
    //TODO rebalance if necessary
    
    draw();
}

function removeNode(toRemove) {
    
}

function rebalance() {
    
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    
    getHeight() {
        return 1 + Math.max(Node.getHeightOfChild(this.lChild), Node.getHeightOfChild(this.rChild));
    }
    
    getBalance() {
        return Math.abs(Node.getHeightOfChild(this.lChild) - Node.getHeightOfChild(this.rChild));
    }
    
    static getHeightOfChild(child) {
        return child === undefined ? 0 : child.getHeight();
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
    }
}

class DuplicateError extends Error {
    constructor(...params) {
        super(params);
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DuplicateError); //TODO check if necessary
        }
    }
}