<?php
//registration vorbereiten password_hash($values['password'], PASSWORD_DEFAULT);
//neuen nuter in die datenbank schreiben
//ergebniss zurück senden
//fall 1
//fall 2

//session starten
session_start([
    "cookie_lifetime" => 86400,
]);

if(isset ($_SESSION['rolle'])&& $_SESSION['rolle'] == 'ADMIN'){
        $json = file_get_contents('php://input');
    $values = json_decode($json, true);

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($values['username']) && isset($values['password'])) {
        // The request is using the POST method
        $name = $values['username'];
        $passwort = $values['password'];
        $hashed_passwort = password_hash($passwort, PASSWORD_DEFAULT);
        //Überprüfen pw && nutzername vorhanden
        //Verbindungsfehler
        $user = null;
        try {
            //verbindugsaufbau zuer datenbank
            $dbh = new PDO('mysql:host=localhost:3306;dbname=lani_webseite', "lani_webseite", "Lani_webseite2023#");

            //überprüfung ob neutzer schon existirt
            $sql = "SELECT id, email, passwort FROM lani_webseite.user WHERE email LIKE :name LIMIT 1";
            $sth = $dbh->prepare($sql);
            $res = $sth->execute(['name' => $name ]);
            $count = $sth->fetchColumn();
        
            //$count ob es einen Nutzer gib? 0 oder 1
            if($count == 0){
                //hinzufügen eines neuen benutzers
                $sqlCreate = "INSERT INTO lani_webseite.user (email, passwort, rolle)
                VALUES (:email, :passwort, :rolle);";
                $sthCreate = $dbh->prepare($sqlCreate);
                $resCreate = $sthCreate->execute(['email' => $name, 'passwort' => $hashed_passwort, 'rolle' => "USER"]);
                $countCreate = $sthCreate->fetchColumn();
                http_response_code(200);
                echo json_encode("Benutzer wurde angelegt");

            }else{
                http_response_code(409);
            }

            $dbh = null;
        } catch (PDOException $e) {
            echo json_encode($e->getMessage());
            http_response_code(500);
            die();
        }

    } else {
        http_response_code(405);
    }
}else{
    http_response_code(401);
}
?>