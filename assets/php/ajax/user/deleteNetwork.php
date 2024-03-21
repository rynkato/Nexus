<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['Network_ID'])) {
        $response = $Nexus->getCredentials()->deleteNetwork($_POST['Network_ID']);

        if($response['error']) {
            echo $response['message'];
        } else {
            echo "NO-ERROR";
        }
    }