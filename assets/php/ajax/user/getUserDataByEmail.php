<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['User_Email']) && isset($_POST['Data'])) {
        $response = $Nexus->getCredentials()->getUserDataByEmail($_POST['User_Email'], $_POST['Data']);

        if($response['error']) {
            echo "ERROR";
        } else {
            echo $response['data'];
        }
    }