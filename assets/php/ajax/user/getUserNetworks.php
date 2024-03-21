<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['User_Email'])) {
        $response = $Nexus->getCredentials()->getUserNetworks($_POST['User_Email']);

        if($response['error']) {
            echo "ERROR";
        } else {
            echo $response['data'];
        }
    }