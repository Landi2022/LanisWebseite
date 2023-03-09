<?php

$json = file_get_contents('php://input');
$values = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($values['username']) && isset($values['password'])) {
    // The request is using the POST method
    $name = $values['username'];
    $passwort = $values['password'];
    //Überprüfen pw && nutzername vorhanden

    //Datenbank check nutzer mit pw && nutzername
    //$dbh = new PDO('mysql:host=localhost;dbname=lani_website', "lani_website", "Lani_webseite2023#");
    $user = array('id' => '1', 'username' => 'lani'); //|| null
    //$user = null;

    //Fall 1: ist vorhanden
    //Fall 2: nicht vorhanden
    if($user != null){
        //Ergebniss senden
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($user);
    } else {
        http_response_code(404);
    }

} else {
    http_response_code(405);
}
?>