<?php

namespace Lani\Laniswebseite;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
require '../vendor/autoload.php';

$json = file_get_contents('php://input');
$values = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($values['discordtag'])) {

    $discordTag = $values['discordtag'];

    $mail = new PHPMailer(true);

    try {
        //1. Verbindungsaufbau SMTP-Server (gmail, gmx ...)
        /* SMTP parameters. */
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->Username = 'dcsupp00t@gmail.com';
        $mail->Password = 'wemswaxnxqvlainv';
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );


        //2. from = lani-webseite@gmail.com
        $mail->setFrom('dcsupp00t@gmail.com', 'No-Reply Laniswebseite');
        //3. to = lani.schlagheck@gmail.com
        $mail->addAddress('lani.schlagheck@gmail.com', 'Lani Schlagheck');

        //4. message = Erledigt|°
        $mail->Subject = 'Discord Zock Anfrage';
        $mail->Body = "Hallo Lani ich würde gerne mit dir mal Zocken. Mein Discord Tag ist {$discordTag}.";

        //Senden der E-Mail
        if(!$mail->send()) {
            echo json_encode($mail->ErrorInfo);
            http_response_code(502);
        }else {
            echo json_encode("E-Mail wurde versendet");
            http_response_code(200);
        }
    } catch (Exception $e) {
        echo json_encode($e->getMessage());
        http_response_code(501);
    } catch (\Exception $e) {
        echo json_encode($e->getMessage());
        http_response_code(500);
    }
} else {
    http_response_code(405);
}
?>