<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['Network_Name']) && isset($_POST['Network_Data']) && isset($_POST['Date_Modified']) && isset($_POST['User_Email'])) {
        $response = $Nexus->getCredentials()->addUserNetwork($_POST['Network_Name'], $_POST['Network_Data'], $_POST['Date_Modified'], $_POST['User_Email']);

        if($response['error']) {
            echo $response['message'];
        } else {
            echo "NO-ERROR: " . $response['id'];
        }
    }