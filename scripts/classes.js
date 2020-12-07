class Circle {
    static radius = 0;
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Circle.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        ctx.strokeText(this.key, this.x, this.y);
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
    
    hasChildren() {
        return this.lChild !== undefined || this.rChild !== undefined;
    }
    
    replaceChild(oldChild, newChild) {
        if(this.lChild === oldChild) {
            this.lChild = newChild;
        }
        else {
            this.rChild = newChild;
        }
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

class KeyNotFoundError extends Error {
    constructor(...params) {
        super(params);
        
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, KeyNotFoundError); //TODO check if necessary
        }
    }
}