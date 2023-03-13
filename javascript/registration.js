document.addEventListener("DOMContentLoaded", init);
function init(){

    //Login - Page
    const emailInput = document.getElementById("emailInput");
    const passwortInput = document.getElementById("passwortInput");
    const loginSubmitButton = document.getElementById("loginSubmitButton");

    //onclicksubmit
    if(loginSubmitButton){
        loginSubmitButton.addEventListener("click", function() {
            submitLogin(emailInput.value, passwortInput.value);
        });
    }
}
async function submitLogin(username, password){

    //blende die Alerts aus
    let missingEmail = document.getElementById("error-missing-e-mail");
    missingEmail.classList.add("d-none"); 
    
    let missingPasswort = document.getElementById("error-missing-password");
    missingPasswort.classList.add("d-none");

    let userFound = document.getElementById("error-user-found");
    userFound.classList.add("d-none");

    let serverError = document.getElementById("serverError");
    serverError.classList.add("d-none");

    let successful = document.getElementById("successful");
    successful.classList.add("d-none");



    if(!username || String(username).length <= 0){
        missingEmail.classList.remove("d-none");
        throw new Error('No Username found!');
    }
    if(!password || String(password).length <= 0){
        missingPasswort.classList.remove("d-none");
        throw new Error('No Password found!');
    }

    //ajax an php
    let data = { username:username, password:password };
    let response = await fetch("http://localhost/ajax/regestration.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

console.log(response.status);

    //Status
    if(response.status == 409){
        userFound.classList.remove("d-none");
        console.log(res);
    }

    //Bei 500 Anzeige der Fehler Meldung
    if(response.status == 500){
        serverError.classList.remove("d-none");
    }

    //Bei 405 Anzeige der Fehler Meldung
    if(response.status == 405){
        serverError.classList.remove("d-none");
    }

    //Bei 200 Anzeige der Fehler Meldung
    if(response.status == 200){
        successful.classList.remove("d-none");
    }
    //Bei 200 Anzeige der Fehler Meldung
    if(response.status == 401){
        window.location = "Mitgliederbereich.html";
    } 
}