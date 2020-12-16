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
    constructor(key) {
        super();
        this.key = key;
        this.childNodes = new Map();
    }
    
    getHeight() {
        return 1 + Math.max(Node.getHeightOfChild(this.childNodes.get(-1)), Node.getHeightOfChild(this.childNodes.get(1)));
    }
    
    hasChildren() {
        return this.childNodes.get(-1) !== undefined || this.childNodes.get(1) !== undefined;
    }
    
    replaceChild(oldChild, newChild) {
        if(this.childNodes.get(-1) === oldChild) {
            this.childNodes.set(-1, newChild);
        }
        else {
            this.childNodes.set(1, newChild);
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