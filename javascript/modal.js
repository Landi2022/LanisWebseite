document.addEventListener("DOMContentLoaded", init);
function init(){
    const welcomeModalElement = document.getElementById("welcome");
    const welcomeModal = new bootstrap.Modal(welcomeModalElement, {
        backdrop: 'static'
    });

    console.log(welcomeModalElement, welcomeModal);
    welcomeModal.show();
}

function onClickdankeschoen(){

    //blende das Modal ein
    const welcomeModalElement = document.getElementById("welcome");
    const welcomeModal = bootstrap.Modal.getInstance(welcomeModalElement);
    welcomeModal.hide();
}