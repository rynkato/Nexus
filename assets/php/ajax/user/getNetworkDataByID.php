<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['Network_ID']) && isset($_POST['Data'])) {
        $response = $Nexus->getCredentials()->getNetworkDataByID($_POST['Network_ID'], $_POST['Data']);

        if($response['error']) {
            echo "ERROR";
        } else {
            echo $response['data'];
        }
    }