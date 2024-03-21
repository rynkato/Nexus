<?php

date_default_timezone_set("Asia/Kuala_Lumpur");

require_once $_SERVER['DOCUMENT_ROOT'] . '/nexus/settings/Database.php';

require_once 'UI.php';

require_once 'DatabaseHandler.php';
require_once 'Credentials.php';

class Nexus {

    function getUI() {
        return new UI();
    }

    function getCredentials() {
        return new Credentials();
    }
    
}