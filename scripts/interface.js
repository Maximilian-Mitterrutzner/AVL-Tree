let txt_key;
let btn_add;
let btn_remove;
let div_error;

window.onload = function() {
    initRenderer();
    
    txt_key = document.getElementById("txt_key");
    btn_add = document.getElementById("btn_add");
    btn_remove = document.getElementById("btn_remove");
    div_error = document.getElementById("div_error");
    
    btn_add.addEventListener("click", onAdd);
    btn_remove.addEventListener("click", onRemove);
}

function onAdd() {
    let key = txt_key.value;
    div_error.innerHTML = "";
    
    if(isEmpty(key)) {
        displayError("Der Key kann nicht leer sein");
        return;
    }
    
    try {
        addNode(new Node(key));
    }
    catch(e) {
        displayError(e.message);
    }
    
    txt_key.value = "";
    
    draw();
}

function onRemove() {
    let key = txt_key.value;
    div_error.innerHTML = "";
    
    if(isEmpty(key)) {
        displayError("Der Key kann nicht leer sein");
        return;
    }
    
    removeNode(key);
    
    txt_key.value = "";
    
    draw();
}


function displayError(message) {
    div_error.innerHTML = "<p>" + message + "</p>"; 
}

function isEmpty(str) {
    return (str === undefined || str.length === 0 || !str.trim());
};