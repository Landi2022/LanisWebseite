
document.addEventListener("DOMContentLoaded", init);
function init(){

    //Login - Page
    const emailInput = document.getElementById("emailInput");
    const passwortInput = document.getElementById("passwortInput");
    const loginSubmitButton = document.getElementById("loginSubmitButton");

    if(loginSubmitButton){
        loginSubmitButton.addEventListener("click", function() {
            submitLogin(emailInput.value, passwortInput.value);
        });
    }

    //Contact - Page
    const discordTagInput = document.getElementById("discordTagInput");
    const contactSubmitButton = document.getElementById("contactSubmitButton");

    if(contactSubmitButton){
        contactSubmitButton.addEventListener("click", function() {
            submitContact(discordTagInput.value);
        });
    }
}



async function submitLogin(username, password){
    let missingEmail = document.getElementById("error-missing-e-mail");
    missingEmail.classList.add("d-none"); 
    
    let missingPasswort = document.getElementById("error-missing-password");
    missingPasswort.classList.add("d-none");

    let userNotFound = document.getElementById("error-user-not-found");
    userNotFound.classList.add("d-none");

    let serverError = document.getElementById("serverError");
    serverError.classList.add("d-none");


    if(!username || String(username).length <= 0){
        missingEmail.classList.remove("d-none");
        throw new Error('No Username found!');
    }
    if(!password || String(password).length <= 0){
        missingPasswort.classList.remove("d-none");
        throw new Error('No Password found!');
    }
    //AJAX an server mit username && pw
    let data = { username:username, password:password };
    let response = await fetch("http://localhost/ajax/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    console.log(response.status);

    //Status überprüfung der Antwort ob 200 oder 404
    //Bei 200 weiterleitung Mitgliederbreich
    if(response.status == 200){
        let res = await response.json();
        console.log(res);

        window.location = "Mitgliederbereich.html";
    }
    //Bei 404 Anzeige der Fehler Meldung
    if(response.status == 404){
        userNotFound.classList.remove("d-none");
    }

    //Bei 500 Anzeige der Fehler Meldung
    if(response.status == 500){
        serverError.classList.remove("d-none");
    }
}

function onClickdankeschoen(){
    console.log("Test");
    const welcomeModalElement = document.getElementById("welcome");
    const welcomeModal = bootstrap.Modal.getInstance(welcomeModalElement);
    welcomeModal.hide();
}

async function submitContact(discordTag) {
    let discordTagFinderRegex = /^[A-Za-z0-9]+#[0-9]{4}$/;
    if(discordTag.match(discordTagFinderRegex) == null) {
        throw new Error('No valid Discord Tag found!');
    }

    let data = { discordtag: discordTag };
    let response = await fetch("http://localhost/ajax/contact.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    console.log(response);

    let res = await response.json();
    console.log(res);

    if(response.status == 200) {
        
    }
    

    console.log(discordTag);
}