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

        <script>
            if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/WebOs/i)) { // detect mobile browser
                window.location.replace("https://nexuskaizen.com/mobile.php");
            }
        </script>
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
            <div class="row">
                <div class="col-12" style="z-index: 9999;">
                    <div id="alert-container">

                    </div>
                </div>
            </div>
            <div class="row vertical-center">
                <div class="col-1"></div>
                <div class="col-5">
                    <div class="row m-0">
                        <div class="col-2 p-0"></div>
                        <div class="col-8 p-0">
                            <div id="landing-container-left">
                                <!--
                            <div class="row">
                                <div class="col-6">
                                    <h5 class="text-success mb-4">John Doe</h5>
                                </div>
                                <div class="col-6">
                                    <a href="" onclick="logout();" class="float-right">
                                        <i class="fas fa-2x fa-sign-out-alt text-danger"></i>
                                    </a>
                                </div>
                            </div>

                            <table class="table fabrx-table">
                                <thead class="fabrx-table-header">
                                    <tr class="text-center">
                                        <td>#</td>
                                        <td>Network Name</td>
                                        <td>Date Modified</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr class="text-center">
                                        <td>1</td>
                                        <td>KLIA Network</td>
                                        <td>26/05/2021 12:53pm</td>
                                        <td>
                                            <div class="dropdown">
                                                <a href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="Action1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                        <path data-name="Icon Color" d="M13.889,2.889a1.445,1.445,0,1,1,1.445-1.445A1.446,1.446,0,0,1,13.889,2.889Zm-6.222,0A1.445,1.445,0,1,1,9.111,1.444,1.446,1.446,0,0,1,7.667,2.889Zm-6.223,0A1.445,1.445,0,1,1,2.889,1.444,1.446,1.446,0,0,1,1.444,2.889Z" transform="translate(9.778 0.444) rotate(90)" fill="#959393"/>
                                                    </svg>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="Action1">
                                                    <a class="dropdown-item" onclick="openNetwork(1);">Open</a>
                                                    <a class="dropdown-item" onclick="deleteNetwork(1);">Delete</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            -->

                                <form method="post" style="display: block;" id="form-sign-in">
                                    <h5 class="text-success mb-4">Sign In</h5>

                                    <div class="form-group">
                                        <label for="sign-in-email" class="control-icon">
                                            <i class="far fa-envelope fa-lg text-secondary" id="sign-in-email-icon"></i>
                                        </label>
                                        <input type="email" name="sign-in-email" placeholder="Email Address" class="form-control" id="sign-in-email" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="sign-in-password" class="control-icon">
                                            <i class="fas fa-lock fa-lg text-secondary" id="sign-in-pass-icon"></i>
                                        </label>
                                        <input type="password" name="sign-in-password" placeholder="Password" class="form-control" id="sign-in-password" required>
                                    </div>

                                    <div class="row">
                                        <div class="col-6">
                                            <button type="button" class="btn btn-outline-success" style="left: 0 !important;" id="show-sign-up-btn">
                                                <span>Sign Up</span>
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button type="submit" class="btn btn-success btn-has-one d-block ml-auto" style="border-radius: 30px;">
                                                <i class="fas fa-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <form method="post" style="display: none;" id="form-sign-up">
                                    <h5 class="text-success mb-4">Sign Up</h5>

                                    <div class="form-group">
                                        <label for="sign-up-name" class="control-icon">
                                            <i class="far fa-user fa-lg text-secondary" id="sign-up-name-icon"></i>
                                        </label>
                                        <input type="text" name="sign-up-name" placeholder="Name" class="form-control" id="sign-up-name" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="sign-up-email" class="control-icon">
                                            <i class="far fa-envelope fa-lg text-secondary" id="sign-up-email-icon"></i>
                                        </label>
                                        <input type="email" name="sign-up-email" placeholder="Email Address" class="form-control" id="sign-up-email" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="sign-up-password" class="control-icon">
                                            <i class="fas fa-lock fa-lg text-secondary" id="sign-up-pass-icon"></i>
                                        </label>
                                        <input type="password" name="sign-up-password" placeholder="Password" class="form-control" id="sign-up-password" required>
                                    </div>

                                    <div class="row">
                                        <div class="col-6">
                                            <button type="button" class="btn btn-outline-success" style="left: 0 !important;" id="show-sign-in-btn">
                                                <span>Sign In</span>
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button type="submit" class="btn btn-success btn-has-one d-block ml-auto" style="border-radius: 30px;">
                                                <i class="fas fa-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <div class="row mt-5">
                                    <div class="col-12 text-center">
                                        <a href="#" class="text-primary" style="font-size: 15pt;" onclick="createNewNetwork();">Create a new network without signing in <i class="fas fa-long-arrow-alt-right fa-lg ml-2"></i></a>
                                    </div>
                                </div>
                            </div>

                            <div id="toast-container" class="mt-3 position-absolute w-100">

                            </div>
                        </div>
                        <div class="col-2 p-0"></div>
                    </div>
                </div>

                <div class="col-5">
                    <div class="row m-0">
                        <div class="col-2 p-0"></div>
                        <div class="col-8 p-0">
                            <div class="card rounded-24 shadow-40 text-center">
                                <div class="card rounded-24 shadow-40">
                                    <div class="card-body" id="card-upload">
                                        <h6 class="p-1 text-success">Regenerate an existing network with a JSON file</h6>
                                        <div class="fabrx-uploader" data-upload="false"><input type="file" name="nexus-file-input" id="nexus-file-input"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 p-0"></div>
                    </div>
                </div>
                <div class="col-1"></div>
            </div>
        </div>

        <?php $Nexus->getUI()->getScripts(); ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js" integrity="sha512-UdIMMlVx0HEynClOIFSyOrPggomfhBKJE28LKl8yR3ghkgugPnG6iLfRfHwushZl1MOPSY6TsuBDGPK2X4zYKg==" crossorigin="anonymous"></script>

        <script>
            $(document).ready(function() {
                getLandingModal();
            });
        </script>
    </body>
</html>