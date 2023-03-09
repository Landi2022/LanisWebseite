<?php

$json = file_get_contents('php://input');
$values = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($values['username']) && isset($values['password'])) {
    // The request is using the POST method
    $name = $values['username'];
    $passwort = $values['password'];
    //Überprüfen pw && nutzername vorhanden

    //Datenbank check nutzer mit pw && nutzername
    //Verbindungsfehler
    $user = null;
    try {
        $dbh = new PDO('mysql:host=localhost:3306;dbname=lani_webseite', "lani_webseite", "Lani_webseite2023#");

        $sql = "SELECT id, email, passwort FROM lani_webseite.user WHERE email LIKE :name AND passwort LIKE :passwort LIMIT 1";
        $sth = $dbh->prepare($sql);
        $sth->execute(['name' => $name, 'passwort' => $passwort]);

        //' OR 1 = 1 LIMIT 1 #'

        $user = $sth->fetch(PDO::FETCH_ASSOC);

        $dbh = null;
     } catch (PDOException $e) {
        echo json_encode($e->getMessage());
        http_response_code(500);
        die();
     }


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