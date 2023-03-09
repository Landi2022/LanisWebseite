document.addEventListener("DOMContentLoaded", init);
function init(){

}

function onClickdankeschoen(){
    
    //blende das Modal ein
    console.log("Test");
    const welcomeModalElement = document.getElementById("welcome");
    const welcomeModal = bootstrap.Modal.getInstance(welcomeModalElement);
    welcomeModal.hide();
}