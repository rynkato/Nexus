<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['Network_Data']) && isset($_POST['Date_Modified']) && isset($_POST['Network_ID'])) {
        $response = $Nexus->getCredentials()->updateNetwork($_POST['Network_ID'], $_POST['Network_Data'], $_POST['Date_Modified']);

        if($response['error']) {
            echo $response['message'];
        } else {
            echo "NO-ERROR";
        }
    }