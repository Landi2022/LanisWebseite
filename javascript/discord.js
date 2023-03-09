document.addEventListener("DOMContentLoaded", init);
function init(){
    
    //Contact - Page
    const discordTagInput = document.getElementById("discordTagInput");
    const contactSubmitButton = document.getElementById("contactSubmitButton");

    if(contactSubmitButton){
        contactSubmitButton.addEventListener("click", function() {
            submitContact(discordTagInput.value);
        });
    }
}

async function submitContact(discordTag) {

    //blende die alerts aus

    let discordError = document.getElementById("error-discord-not-found");
    discordError.classList.add("d-none");

    let emailError = document.getElementById("error-server-e-mail");
    emailError.classList.add("d-none");

    let succesful = document.getElementById("succesful");
    succesful.classList.add("d-none");

    //Regex
    let discordTagFinderRegex = /^[A-Za-z0-9]+#[0-9]{4}$/;
    if(discordTag.match(discordTagFinderRegex) == null) {
        discordError.classList.remove("d-none");
        throw new Error('No valid Discord Tag found!');
    }

    let discordTagExecludeRegex = /^Wumps#2015$/;
    if(discordTag.match(discordTagExecludeRegex) != null) {
        discordError.classList.remove("d-none");
        throw new Error('No valid Discord Tag found!');
    }


    //ajax
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

    //zeige fehler an
    if(response.status == 502) {
        emailError.classList.remove("d-none");
    }
    
    if(response.status == 200) {
        succesful.classList.remove("d-none");
    }

    if(response.status == 501) {
        emailError.classList.remove("d-none");
    }
    
    if(response.status == 500) {
        emailError.classList.remove("d-none");
    }
    

    console.log(discordTag);
}