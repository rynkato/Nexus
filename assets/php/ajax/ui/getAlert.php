<?php
    include $_SERVER['DOCUMENT_ROOT'] . "/nexus/assets/php/Nexus.php";

    $Nexus = new Nexus();

    if(isset($_POST['Type']) && isset($_POST['Message'])) {
        $response = $Nexus->getUI()->getAlert($_POST['Type'], $_POST['Message']);

        echo $response;
    }