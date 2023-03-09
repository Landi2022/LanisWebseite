document.addEventListener("DOMContentLoaded", init);
function init(){
    const logout = document.getElementById("logout-nav");
    //1. Logout Click event Listener
    if(logout){
        logout.addEventListener("click", function() {
            submitLogout();
        });
    }
}

async function submitLogout() {
    //2. Send Ajax to Logout.php
    let response = await fetch("http://localhost/ajax/logout.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });

    //5. 200 -> Alles Okay, weiterleitung auf index
    if(response.status == 200){
        window.location = "index.html";
    }
}