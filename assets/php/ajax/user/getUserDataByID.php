<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['User_ID']) && isset($_POST['Data'])) {
        $response = $Nexus->getCredentials()->getUserDataByID($_POST['User_ID'], $_POST['Data']);

        if($response['error']) {
            echo "ERROR";
        } else {
            echo $response['data'];
        }
    }