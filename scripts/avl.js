let rootNode;

function addNode(toAdd) {
    if(rootNode === undefined) {
        rootNode = toAdd;
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
}

function removeNode(key) {
    if(rootNode.key === key) {
        rootNode = undefined;
        return;
    }
    
    if(!removeNodeRec(rootNode, key)) {
        throw new KeyNotFoundError("The tree does not contain this key!");
        return;
    }
    
    //TODO rebalance if necessary
}

function removeNodeRec(currentNode, key) {
    if(currentNode === undefined) {
        return false;
    }
    
    if(currentNode.key === key) {
        processRemoval(currentNode);
        return true;
    }
    
    if(removeNodeRec(currentNode.lChild, key)) {
        return true;
    }
    return removeNodeRec(currentNode.rChild, key);
}

function processRemoval(toRemove) {
    if(toRemove.lChild === undefined && toRemove.rChild === undefined) {
        toRemove.parent.replaceChild(toRemove, undefined);
    }
    else if (toRemove.lChild === undefined || toRemove.rChild === undefined) {
        removeHalfLeaf(toRemove);
    }
    else {
        let lHeight = 0;
        let rHeight = 0;
        let lNode = toRemove.lChild;
        let rNode = toRemove.rChild;
        
        if(lNode !== undefined) {
            while(lNode.rChild !== undefined) {
                lNode = lNode.rChild;
                lHeight++;
            }
        }
        if(rNode !== undefined) {
            while(rNode.lChild !== undefined) {
                rNode = rNode.lChild;
                rHeight++;
            }
        }
        
        if(lHeight >= rHeight) {
            if(lNode.hasChildren()) {
                removeHalfLeaf(lNode);
            }
            else {
                lNode.parent.replaceChild(lNode, undefined);
            }
            overrideNode(toRemove, lNode);
        }
        else {
            if(rNode.hasChildren()) {
                removeHalfLeaf(rNode);
            }
            else {
                rNode.parent.replaceChild(rNode, undefined);
            }
            overrideNode(toRemove, rNode);
        }
    }
}

function removeHalfLeaf(toRemove) {
    console.log(toRemove);
    let child = toRemove.lChild === undefined ? toRemove.rChild : toRemove.lChild;
    child.parent = toRemove.parent;
    toRemove.parent.replaceChild(toRemove, child);
}

function overrideNode(oldNode, newNode) {
    let parent = oldNode.parent;
    
    parent.replaceChild(oldNode, newNode);
    
    if(oldNode.lChild !== undefined) {
        oldNode.lChild.parent = newNode;
    }
    if(oldNode.rChild !== undefined) {
        oldNode.rChild.parent = newNode;
    }
    
    newNode.parent = oldNode.parent;
    newNode.lChild = oldNode.lChild;
    newNode.rChild = oldNode.rChild;
}

function rebalance() {
    
}