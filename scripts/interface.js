let txt_key;
let btn_add;
let div_error;

window.onload = function() {
    initRenderer();
    
    txt_key = document.getElementById("txt_key");
    btn_add = document.getElementById("btn_add");
    div_error = document.getElementById("div_error");
    
    btn_add.addEventListener("click", onAdd);
}

function onAdd() {
    let key = txt_key.value;
    div_error.innerHTML = "";
    
    if(isEmpty(key)) {
        displayError("Der Key kann nicht leer sein");
        return;
    }
    
    try {
        addNode(new Node(key, "test"));
    }
    catch(e) {
        displayError(e.message);
    }
    
    txt_key.value = "";
}

function displayError(message) {
    div_error.innerHTML = "<p>" + message + "</p>"; 
}

function isEmpty(str) {
    return (str === undefined || str.length === 0 || !str.trim());
};