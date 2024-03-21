<?php

    session_start();

    include 'assets/php/Nexus.php';

    $Nexus = new Nexus();

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <link rel="icon" type="image/png" href="assets/images/favicon.png" />

        <title>Nexus | Undirected</title>

        <?php $Nexus->getUI()->getHead(); ?>

        <style>
            .m-6 {
                margin: 7rem 3rem 3rem 3rem !important;
            }

            .selectedNode {
                border: none;
                border-bottom: 1px solid #28a745 !important;
            }
            .selectedNode:focus {
                outline: 0 !important;
                box-shadow: none !important;
            }

            .notSelectedNode {
                border: none;
                border-bottom: 1px solid transparent !important;
            }
            .notSelectedNode:focus {
                outline: 0 !important;
                box-shadow: none !important;
            }

            .borderDistance {
                border-left: 2px solid #28a745 !important;
            }
        </style>
    </head>

    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12" style="z-index: 9999;">
                    <div id="alert-container">

                    </div>
                </div>
                <div class="col-12" style="z-index: 9999;">
                    <div id="alert-container-2">

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-8 m-6 position-fixed">
                    <div class="card rounded-24" style="z-index: 0;">
                        <div class="card-body">
                            <div class="row" id="undo-redo" style="display:none;">
                                <div class="col-12">
                                    <button type="button" class="btn btn-sm btn-outline-primary btn-circle rounded-circle mr-1" id="undo-btn"><i class="fas fa-undo"></i></button>
                                    <button type="button" class="btn btn-sm btn-outline-primary btn-circle rounded-circle" id="redo-btn"><i class="fas fa-redo"></i></button>
                                </div>
                            </div>

                            <div id="nexus-network"></div>
                        </div>
                    </div>
                </div>
                <div class="col-4 position-absolute" style="right: 0 !important; overflow-x: hidden; overflow-y: hidden;">
                    <br/>
                    <br/>

                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-8">
                            <div class="row">
                                <div class="col-12">
                                    <div class="custom-control custom-switch custom-switch-lg custom-switch-stack d-flex pl-0 justify-content-center">
                                        <input type="checkbox" class="custom-control-input" id="networkTypeSwitch">
                                        <label class="pr-5">Undirected</label>
                                        <label class="custom-control-label ml-3" for="networkTypeSwitch"></label>
                                        <label>Directed</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-12">
                                    <a href='#' id="edit-btn">
                                        <div class="card rounded-24 shadow-40 text-center">
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <i class="far fa-edit fa-2x text-primary" id="editIconChange"></i>
                                                </div>
                                                <h6 class="mb-2">Edit Mode</h6>
                                                <p class="text-secondary">Select a node and edit its properties.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="row mt-3" id="edit-modules" style="display:none;">
                                <div class="col-12">
                                    <div class="card rounded-24 shadow-40 text-center">
                                        <div class="card-body">
                                            <button class="btn btn-primary btn-has-one btn-sm rounded-24 mr-2" id="edit-mode-add-node" data-toggle="tooltip" data-placement="top" title="Add Node">
                                                <span class="btn-text">
                                                    <i class="fas fa-plus fa-2x p-1 ml-2 mr-2"></i>
                                                </span>
                                            </button>
                                            <button class="btn btn-primary btn-has-one btn-sm rounded-24 mr-2" id="edit-mode-add-edge" data-toggle="tooltip" data-placement="top" title="Add Edge">
                                                <span class="btn-text">
                                                    <i class="fas fa-link fa-2x p-1 ml-2 mr-2"></i>
                                                </span>
                                            </button>
                                            <button class="btn btn-primary btn-has-one btn-sm rounded-24 mr-2" id="edit-mode-delete" data-toggle="tooltip" data-placement="top" title="Delete Edge/Node">
                                                <span class="btn-text">
                                                    <i class="fas fa-trash-alt fa-2x p-1 ml-2 mr-2"></i>
                                                </span>
                                            </button>
                                            <button class="btn btn-primary btn-has-one btn-sm rounded-24 mr-2" id="edit-mode-edit-node" data-toggle="tooltip" data-placement="top" title="Edit Node">
                                                <span class="btn-text">
                                                    <i class="far fa-edit fa-2x p-1 ml-2 mr-2"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3" id="edit-modules-addon" style="display:none;">
                                <div class="col-12">
                                    <div class="card rounded-24 shadow-40 text-center">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-2"></div>
                                                <div class="col-8">
                                                    <div id="module-add-node" class="d-none">
                                                        <!-- [Module] Add Node -->
                                                        <div class="input-group mb-3">
                                                            <input type="text" name="addon-node-name" id="addon-node-name" class="form-control" placeholder="Node Name" required/>
                                                        </div>
                                                        <!-- [Module] Add Node -->
                                                    </div>
                                                    <div id="module-add-edge" class="d-none">
                                                        <!-- [Module] Add Edge -->

                                                        <!-- [Module] Add Edge -->
                                                    </div>
                                                </div>
                                                <div class="col-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-12">
                                    <a href='#' id="simulate-btn">
                                        <div class="card rounded-24 shadow-40 text-center">
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <i class="fas fa-vr-cardboard fa-2x text-primary" id="simulateIconChange"></i>
                                                </div>
                                                <h6 class="mb-2">Simulation</h6>
                                                <p class="text-secondary">Get the shortest path from one node to another.</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div class="row mt-3" id="simulate-modules" style="display: none;">
                                <div class="col-12">
                                    <div class="card rounded-24 shadow-40 text-center">
                                        <div class="card-body">
                                            <button class="btn btn-primary btn-has-one btn-sm rounded-24 mr-2" id="simulate-mode-matrix" data-toggle="tooltip" data-placement="top" title="Display Adjacency Matrix">
                                                <span class="btn-text">
                                                    <i class="fas fa-table fa-2x p-1 ml-2 mr-2"></i>
                                                </span>
                                            </button>
                                            <button class="btn btn-primary btn-has-one btn-sm rounded-24 mr-2" id="simulate-mode-simulation" data-toggle="tooltip" data-placement="top" title="Find Shortest Path">
                                                <span class="btn-text">
                                                    <i class="fas fa-code-branch fa-2x p-1 ml-2 mr-2"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3" id="adjacency-matrix-holder" style="display: none;">
                                <div class="col-12">
                                    <div class="table-responsive rounded-0">
                                        <table class="table table-has-noborder text-center mb-2" id="adjacency-matrix-table">
                                            <tbody id="matrix-table-body">

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-12 mb-3">
                                    <div id="save-database-container" class="d-none">
                                        <div id="save-network-button-container">
                                            <a href="#" class="btn btn-outline-success justify-content-between btn-lg btn-block rounded-12 shadow-40 mb-3" id="save-network-database">
                                                <span class="btn-text">Save to Database</span>
                                                <i class="fas fa-save"></i>
                                            </a>
                                        </div>

                                        <div id="save-network-name-container" style="display: none;">
                                            <h6 class="text-success mb-3">Give this network a name</h6>
                                            <div class="input-group mb-3">
                                                <input type="text" name="network-name" id="network-name" class="form-control mr-2" placeholder="Network Name" required/>
                                            </div>
                                            <div class="mb-3">
                                                <button class="btn btn-sm btn-success p-0 mr-2" id="create-network-btn">Save</button>
                                                <button class="btn btn-sm btn-danger p-0" id="cancel-create-network-btn">Cancel</button>
                                            </div>

                                        </div>

                                        <h6 class="text-center text-success mb-3" style="font-size: 13pt !important;">OR</h6>
                                    </div>

                                    <a href="#" class="btn btn-outline-success justify-content-between btn-lg btn-block rounded-12 shadow-40 mb-3" id="export-json">
                                        <span class="btn-text">Export to JSON</span>
                                        <i class="fas fa-file-export"></i>
                                    </a>
                                    <a href="index.php" class="btn btn-outline-primary justify-content-between btn-lg btn-block rounded-12 shadow-40 mt-4">
                                        <span class="btn-text">Back to Home</span>
                                        <i class="fas fa-home fa-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-2"></div>
                    </div>
                </div>
            </div>

            <!-- Alerts Bottom -->
            <div class="row">
                <div class="col-12" style="z-index: 9999;">
                    <div id="alert-container-bottom">

                    </div>
                </div>
            </div>
        </div>


        <?php $Nexus->getUI()->getScripts(); ?>
        <script src="assets/js/lib/FileSaver.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/TableExport/5.2.0/js/tableexport.min.js" integrity="sha512-XmZS54be9JGMZjf+zk61JZaLZyjTRgs41JLSmx5QlIP5F+sSGIyzD2eJyxD4K6kGGr7AsVhaitzZ2WTfzpsQzg==" crossorigin="anonymous"></script>

        <script type="text/javascript">
            $(document).ready(function() {

                let nexusNetwork = getHomeModal();
            });
        </script>
    </body>
</html>
