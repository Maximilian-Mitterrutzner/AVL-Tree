class Circle {
    static radius = 0;
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Circle.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

class Node extends Circle {
    constructor(key, value) {
        super();
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
}

class DuplicateError extends Error {
    constructor(...params) {
        super(params);
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DuplicateError); //TODO check if necessary
        }
    }
}