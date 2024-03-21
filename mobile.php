<?php

    include 'assets/php/Nexus.php';

    $Nexus = new Nexus();

?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <link rel="icon" type="image/png" href="assets/images/favicon.png" />

        <title>Nexus | Home</title>

        <?php $Nexus->getUI()->getHead(); ?>
    </head>

    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="blur ml-auto mr-auto mt-5">
                        <div class="ball"></div>
                    </div>
                </div>
            </div>
            <div class="row vertical-center">
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="card rounded-24 shadow-40 text-center">
                        <div class="card rounded-24 shadow-40">
                            <div class="card-body">
                                <h6 class="text-success mb-5">It looks like you're using a mobile to access this site.</h6>
                                <hr class="mt-n3 mb-4 border-100 ml-3 mr-3"/>
                                <p class="text-success">This is not a mistake. We did this intentionally.</p>
                                <span class="text-success mt-3">This project takes a load on the browser and is highly optimized on a computer.</span>

                                <br/>
                                <br/>

                                <hr class="mt-n1 mb-4 border-100 ml-3 mr-3"/>

                                <a href="https://nexuskaizen.com">https://nexuskaizen.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>
        </div>

        <?php $Nexus->getUI()->getScripts(); ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js" integrity="sha512-UdIMMlVx0HEynClOIFSyOrPggomfhBKJE28LKl8yR3ghkgugPnG6iLfRfHwushZl1MOPSY6TsuBDGPK2X4zYKg==" crossorigin="anonymous"></script>
    </body>
</html>