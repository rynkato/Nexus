<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['Email_Address']) && isset($_POST['Password'])) {
        $response = $Nexus->getCredentials()->login($_POST['Email_Address'], $_POST['Password']);

        if($response['error']) {
            echo $response['message'];
        } else {
            echo "NO-ERROR";
        }
    }