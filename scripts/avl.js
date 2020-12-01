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