let rootNode;

function addNode(toAdd) {
    if(rootNode === undefined) {
        rootNode = toAdd;
        return;
    }
    
    let currentNode = rootNode;
    while(toAdd.parent === undefined) {
        let result = toAdd.key.localeCompare(currentNode.key);
        if(result == 0) {
            throw new DuplicateError("The tree already contains this key");
            return;
        }

        let node = currentNode.childNodes.get(result);
        if(node === undefined) {
            currentNode.childNodes.set(result, toAdd);
            toAdd.parent = currentNode;
        }
        else {
            currentNode = node;
        }
    }
    
    //TODO rebalance if necessary;
}

function removeNode(key) {
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
    
    return removeNodeRec(currentNode.childNodes.get(-1), key) 
        || removeNodeRec(currentNode.childNodes.get(1), key);
}

function processRemoval(toRemove) {
    if(toRemove.childNodes.get(-1) === undefined && toRemove.childNodes.get(1) === undefined) {
        if(toRemove === rootNode) {
            rootNode = undefined;
        }
        else {
            toRemove.parent.replaceChild(toRemove, undefined);
        }
    }
    else if (toRemove.childNodes.get(-1) === undefined || toRemove.childNodes.get(1) === undefined) {
        if(toRemove === rootNode) {
            rootNode = rootNode.childNodes.get(-1) === undefined ? rootNode.childNodes.get(1) : rootNode.childNodes.get(-1);
        }
        else {
            removeHalfLeaf(toRemove);
        }
    }
    else {
        let left = walkDirection(toRemove.childNodes.get(-1), 1);
        let right = walkDirection(toRemove.childNodes.get(1), -1);
        
        let toExtract = left[0] >= right[0] ? left[1] : right[1];
        
        if(toExtract.hasChildren()) {
            removeHalfLeaf(toExtract);
        }
        else {
            toExtract.parent.replaceChild(toExtract, undefined);
        }
        
        if(toRemove === rootNode) {
            rootNode.childNodes.forEach(node => {
                if(node !== undefined) {
                    node.parent = toExtract;
                }
            });
            toExtract.childNodes.set(-1, rootNode.childNodes.get(-1));
            toExtract.childNodes.set(1, rootNode.childNodes.get(1));
            
            rootNode = toExtract;
        }
        else {
            overrideNode(toRemove, toExtract);
        }
    }
}

function walkDirection(node, direction) {
    if(node === undefined) {
        return [0, node];
    }
    
    let height = 0;
    while(node.childNodes.get(direction) !== undefined) {
        node = node.childNodes.get(direction);
        height++;
    }
    return [height, node];
}

function removeHalfLeaf(toRemove) {
    let child = toRemove.childNodes.get(-1) === undefined ? toRemove.childNodes.get(1) : toRemove.childNodes.get(-1);
    child.parent = toRemove.parent;
    toRemove.parent.replaceChild(toRemove, child);
}

function overrideNode(oldNode, newNode) {
    let parent = oldNode.parent;
    
    parent.replaceChild(oldNode, newNode);
    
    oldNode.childNodes.forEach(node => {
        if(node !== undefined) {
            node.parent = newNode;
        }
    });
    
    newNode.parent = oldNode.parent;
    newNode.childNodes.set(-1, oldNode.childNodes.get(-1));
    newNode.childNodes.set(1, oldNode.childNodes.get(1));
}