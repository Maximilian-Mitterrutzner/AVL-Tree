let animationQueue = [];
let animationDone = true;

function initAnimationHandler() {
    setInterval(update, 1000 / 60);
}

function update() {
    draw();
    
    if(animationDone === true) {
        return;
    }
    
    if(isDone(rootNode)) {
        if(animationQueue.length === 0) {
            animationDone = true;
            return;
        }
        
        startNextAnimation();
    }
}

function startNextAnimation() {
    console.log("in startNext");
    let change = animationQueue.shift();
    
    shiftCoordinates(rootNode);
    
    change.performChange();
    
    setCoordinates();
}

function pushAction(change) {
    animationQueue.push(change);
    if(animationDone) {
        animationDone = false;
        startNextAnimation();
    }
}

function isDone(node) {
    if(node === undefined) {
        return true;
    }
    return node.isDone && isDone(node.childNodes.get(-1)) && isDone(node.childNodes.get(1));
}

function shiftCoordinates(node) {
    if(node !== undefined) {
        node.shiftCoordinates();
        shiftCoordinates(node.childNodes.get(-1));
        shiftCoordinates(node.childNodes.get(1));
    }
}
