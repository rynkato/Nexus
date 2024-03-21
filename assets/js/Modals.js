let editMode = false, simulationMode = false;
let nodeID = 0;
let editType = 0, simulationType = 0;

const EditModeTypes = Object.freeze({"NOT-SELECTED": 0, "DELETE": 1, "ADD-NODE": 2, "DELETE-NODE": 3, "ADD-EDGE": 4, "DELETE-EDGE": 5, "EDIT-NODE": 6});
const SimulateModeTypes = Object.freeze({"NOT-SELECTED": 0, "MATRIX": 1, "SIMULATION": 2});

let history = [];

let history_list_back = [];
let history_list_forward = [];

let nexusNetwork;


function setEditMode(value) {
    editMode = value;
}

function setSimulationMode(value) {
    simulationMode = value;
}

function getEditMode() {
    return editMode;
}

function getSimulationMode() {
    return simulationMode;
}

function setEditType(mode) {
    editType = mode;
}

function setSimulationType(mode) {
    simulationType = mode;
}

function getEditType() {
    return editType;
}

function getSimulationType() {
    return simulationType;
}

function setSelectedNode(id) {
    nodeID = id;
}

function getSelectedNode() {
    return nodeID;
}

let nodesSelectionNumber = 0;

function getLandingModal() {
    if(localStorage.getItem('NexusEmail') !== null) {
        let userName = "";

        $.ajax({
            url: "./assets/php/ajax/user/getUserDataByEmail.php",
            method: "POST",
            cache: false,
            data: {User_Email: localStorage.getItem('NexusEmail'), Data: "Name"},
            success: function(data) {
                if(data !== "ERROR") {
                    userName = data;
                }
            }, complete: function() {
                $.ajax({
                    url: "./assets/php/ajax/user/getUserNetworks.php",
                    method: "POST",
                    cache: false,
                    data: {User_Email: localStorage.getItem('NexusEmail')},
                    success: function (dataNetwork) {
                        if(dataNetwork !== "ERROR") {
                            $('#landing-container-left').html("<div class=\"row\">\n" +
                                "                                <div class=\"col-6\">\n" +
                                "                                    <h5 class=\"text-success mb-5\">" + userName + "</h5>\n" +
                                "                                </div>\n" +
                                "                                <div class=\"col-6\">\n" +
                                "                                    <a href=\"\" onclick=\"logout();\" class=\"float-right\">\n" +
                                "                                        <i class=\"fas fa-2x fa-sign-out-alt text-danger\"></i>\n" +
                                "                                    </a>\n" +
                                "                                </div>\n" +
                                "                            </div>\n" + dataNetwork);
                        }
                    }
                });
            }
        });
    }

    $('#show-sign-up-btn').on('click', function() {
        $('#form-sign-in').slideToggle('fast');
        $('#form-sign-up').slideToggle('fast');
    });

    $('#show-sign-in-btn').on('click', function() {
        $('#form-sign-up').slideToggle('fast');
        $('#form-sign-in').slideToggle('fast');
    });

    $('#form-sign-up').on('submit', function(e) {
        e.preventDefault();

        let name = $('#sign-up-name').val();
        let email = $('#sign-up-email').val();
        let password = $('#sign-up-password').val();

        $.ajax({
            url: "./assets/php/ajax/user/registerUser.php",
            method: "POST",
            cache: false,
            data: {Name: name, Email_Address: email, Password: password},
            success: function(data){
                if(data === "NO-ERROR") {
                    $.ajax({
                        url: "./assets/php/ajax/ui/getAlert.php",
                        method: "POST",
                        cache: false,
                        data: {Type: "SUCCESS", Message: "You've been successfully registered."},
                        success: function(data){
                            $('#toast-container').html(data);
                        }
                    });
                } else {
                    $.ajax({
                        url: "./assets/php/ajax/ui/getAlert.php",
                        method: "POST",
                        cache: false,
                        data: {Type: "DANGER", Message: data},
                        success: function(data){
                            $('#toast-container').html(data);
                        }
                    });
                }
            }
        });
    });

    $('#form-sign-in').on('submit', function(e) {
        e.preventDefault();

        let email = $('#sign-in-email').val();
        let password = $('#sign-in-password').val();

        $.ajax({
            url: "./assets/php/ajax/user/loginUser.php",
            method: "POST",
            cache: false,
            data: {Email_Address: email, Password: password},
            success: function(data){
                if(data === "NO-ERROR") {
                    localStorage.setItem('NexusEmail', email);
                    window.location.reload();
                } else {
                    $.ajax({
                        url: "./assets/php/ajax/ui/getAlert.php",
                        method: "POST",
                        cache: false,
                        data: {Type: "DANGER", Message: data},
                        success: function(data){
                            $('#toast-container').html(data);

                            setTimeout(function() {
                                $('#toast-container').html("");
                            }, 1667);
                        }
                    });
                }
            }
        });
    });
}

function getHomeModal() {
    if(localStorage.getItem('NexusNetworkType') === "DIRECTED") {
        nexusNetwork = new NexusNetwork(NetworkType.DIRECTED);
        nexusNetwork.buildAdjacencyMatrix(NetworkType.DIRECTED);
        document.title = "Nexus | Directed";
    } else {
        nexusNetwork = new NexusNetwork(NetworkType.UNDIRECTED);
        nexusNetwork.buildAdjacencyMatrix(NetworkType.UNDIRECTED);
        document.title = "Nexus | Undirected";
    }

    if(localStorage.getItem('NexusEmail') !== null && localStorage.getItem('NexusEmail') !== "") {
        $('#save-database-container').removeClass('d-none');
    }

    // Initialization of variables //
    let network = nexusNetwork.getNetwork();
    let data = nexusNetwork.getData();

    if(localStorage.getItem('NexusNetworkType') === "DIRECTED") {
        $('#networkTypeSwitch').prop('checked', true);
    }

    // START: Network Type Switch
    $('#networkTypeSwitch').change(function(e) {
        if(!getEditMode()) {
            if(this.checked) {
                $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                    "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                    "                                            <i class=\"fas fa-random fa-2x text-success\"></i>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                    "                                            <div class=\"alert-caption-title\">Switch to a Directed Network?</div>\n" +
                    "                                            <p>Switching from an <span class='font-weight-bold text-danger'>undirected network</span> to a <span class='font-weight-bold text-success'>directed network</span> would clear the existing network.</p>\n" +
                    "                                            <p class='mt-3'>Be sure to <span class='font-weight-bold text-success'>export your network in JSON format</span> in order to keep it as a backup.</p>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                    "                                            <button class=\"btn btn-outline-success rounded-24\" id='yesSwitchDirected'>Yes, switch it</button>\n" +
                    "                                            <button class=\"btn btn-outline-danger rounded-24\" id='noSwitchDirected'>No, don't switch</button>\n" +
                    "                                        </div>\n" +
                    "                                    </div>");

                $('#alert-container').hide().fadeIn(200);

                $('#yesSwitchDirected').on('click', function() {
                    $('#alert-container').fadeOut(300);

                    history = [];

                    localStorage.setItem('NexusNetworkType', 'DIRECTED');
                    localStorage.setItem('ServerNetworkEdit', '0');
                    localStorage.setItem('ServerNetworkEditID', '0');
                    localStorage.removeItem('NexusNodes');
                    localStorage.removeItem('NexusEdges');
                    nexusNetwork = new NexusNetwork(NetworkType.DIRECTED);

                    document.title = "Nexus | Directed";
                });

                $('#noSwitchDirected').on('click', function() {
                    $('#networkTypeSwitch').prop('checked', false);
                    $('#alert-container').fadeOut(300);
                });
            } else {
                $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                    "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                    "                                            <i class=\"fas fa-random fa-2x text-success\"></i>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                    "                                            <div class=\"alert-caption-title\">Switch to a Undirected Network?</div>\n" +
                    "                                            <p>Switching from an <span class='font-weight-bold text-danger'>directed network</span> to a <span class='font-weight-bold text-success'>undirected network</span> would clear the existing network.</p>\n" +
                    "                                            <p class='mt-3'>Be sure to <span class='font-weight-bold text-success'>export your network in JSON format</span> in order to keep it as a backup.</p>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                    "                                            <button class=\"btn btn-outline-success rounded-24\" id='yesSwitchUndirected'>Yes, switch it</button>\n" +
                    "                                            <button class=\"btn btn-outline-danger rounded-24\" id='noSwitchUndirected'>No, don't switch</button>\n" +
                    "                                        </div>\n" +
                    "                                    </div>");

                $('#alert-container').hide().fadeIn(200);

                $('#yesSwitchUndirected').on('click', function() {
                    $('#alert-container').fadeOut(300);

                    history = [];

                    localStorage.setItem('NexusNetworkType', 'UNDIRECTED');
                    localStorage.setItem('ServerNetworkEdit', '0');
                    localStorage.setItem('ServerNetworkEditID', '0');
                    localStorage.removeItem('NexusNodes');
                    localStorage.removeItem('NexusEdges');
                    nexusNetwork = new NexusNetwork(NetworkType.UNDIRECTED);

                    document.title = "Nexus | Undirected";
                });

                $('#noSwitchUndirected').on('click', function() {
                    $('#networkTypeSwitch').prop('checked', true);
                    $('#alert-container').fadeOut(300);
                });
            }
        } else {
            if(this.checked) {
                $('#networkTypeSwitch').prop('checked', false);
            } else {
                $('#networkTypeSwitch').prop('checked', true);
            }
        }

    });
    // END: Network Type Switch

    // START: Edit Mode Button
    $('#edit-btn').on('click', function () {
        if(!getEditMode() && !getSimulationMode()) {
            setEditMode(true);

            if($('#editIconChange').hasClass('text-primary')) {
                $('#editIconChange').removeClass('text-primary');
                $('#editIconChange').addClass('text-success');
            }

            $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                "                                            <i class=\"far fa-check-circle fa-2x text-success\"></i>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                "                                            <div class=\"alert-caption-title\">Edit Mode is turned on!</div>\n" +
                "                                            <p>You can now edit the properties of each node.</p>\n" +
                "                                            <p id='selected-mode' class='mt-3 text-success'>Select an option from the options list to continue.</p>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                "                                            <button class=\"btn btn-outline-primary rounded-24\" id='saveEdit'>Save Changes</button>\n" +
                "                                        </div>\n" +
                "                                    </div>");

            // START: Show Edit Node Button & Hide Add Node Button
            if(!$('#add-node-btn').hasClass('d-none')) {
                $('#add-node-btn').addClass('d-none');
            }

            if($('#edit-node-btn').hasClass('d-none')) {
                $('#edit-node-btn').removeClass('d-none');
            }

            $('#edit-modules').slideToggle('fast');
            $('#undo-redo').slideToggle('fast');
            // END: Show Edit Node Button & Hide Add Node Button

            $('#alert-container').hide().fadeIn(200);
        }
    });
    // END: Edit Mode Button

    // START: Save Changes Button
    $('body').on('click', '#saveEdit', function () {
        if(getEditMode()) {
            setEditType(EditModeTypes["NOT-SELECTED"]);
            selectAddon(EditModeTypes["NOT-SELECTED"]);

            $('#alert-container').fadeOut(300);

            $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-25 ml-auto mr-auto mt-3\" style=\"width: 92px !important;\" role=\"alert\">\n" +
                "                                        <div class=\"fabrx-icon\">\n" +
                "                                            <i class=\"far fa-check-circle fa-3x text-success\"></i>\n" +
                "                                        </div>\n" +
                "                                    </div>");

            $('#alert-container').hide().fadeIn(300);

            if($('#editIconChange').hasClass('text-success')) {
                $('#editIconChange').addClass('text-primary');
                $('#editIconChange').removeClass('text-success');
            }

            nexusNetwork.getNetwork().disableEditMode();

            nexusNetwork.saveNetwork();

            // START: Hide Edit Node Button & Show Add Node Button
            if(!$('#edit-node-btn').hasClass('d-none')) {
                $('#edit-node-btn').addClass('d-none');
            }

            if($('#add-node-btn').hasClass('d-none')) {
                $('#add-node-btn').removeClass('d-none');
            }

            $('#edit-modules').slideToggle('fast');
            $('#undo-redo').slideToggle('fast');
            // END: Hide Edit Node Button & Show Add Node Button

            setTimeout(function() {
                $('#alert-container').fadeOut(300);
                setEditMode(false);
            }, 1000);
        }
    });
    // END: Save Changes Button

    // START: Simulation Mode Button
    $('#simulate-btn').on('click', function () {
        if(!getSimulationMode() && !getEditMode()) {
            setSimulationMode(true);

            if($('#simulateIconChange').hasClass('text-primary')) {
                $('#simulateIconChange').removeClass('text-primary');
                $('#simulateIconChange').addClass('text-success');
            }

            $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                "                                        <div class=\"fabrx-icon mr-2\" id='alert-icon'>\n" +
                "                                            <i class=\"fas fa-vr-cardboard fa-2x text-success\"></i>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                "                                            <div class=\"alert-caption-title\">Simulation Mode is turned on!</div>\n" +
                "                                            <p>You can now freely simulate the network.</p>\n" +
                "                                            <p id='selected-mode' class='mt-3 text-success'>Select an option from the options list to continue.</p>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                "                                            <button class=\"btn btn-outline-primary rounded-24\" id='exitSimulation'>Exit Simulation</button>\n" +
                "                                        </div>\n" +
                "                                    </div>");

            $('#simulate-modules').slideToggle('fast');
            // END: Show Edit Node Button & Hide Add Node Button

            $('#alert-container').hide().fadeIn(200);
        }
    });
    // END: Simulation Mode Button

    // START: Exit Simulation Button
    $('body').on('click', '#exitSimulation', function () {
        if(getSimulationMode()) {
            setSimulationType(SimulateModeTypes["NOT-SELECTED"]);
            selectSimulationAddon(SimulateModeTypes["NOT-SELECTED"]);

            $('#alert-container').fadeOut(300);

            $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-25 ml-auto mr-auto mt-3\" style=\"width: 92px !important;\" role=\"alert\">\n" +
                "                                        <div class=\"fabrx-icon\">\n" +
                "                                            <i class=\"far fa-check-circle fa-3x text-success\"></i>\n" +
                "                                        </div>\n" +
                "                                    </div>");

            $('#alert-container').hide().fadeIn(300);

            if($('#simulateIconChange').hasClass('text-success')) {
                $('#simulateIconChange').addClass('text-primary');
                $('#simulateIconChange').removeClass('text-success');
            }

            $('#simulate-modules').slideToggle('fast');

            setTimeout(function() {
                $('#alert-container').fadeOut(300);
                setSimulationMode(false);
            }, 1000);
        }
    });
    // END: Exit Simulation Button

    // START: Simulate Mode - Adjacency Matrix
    $('#simulate-mode-matrix').on('click', function() {
        if(getSimulationType() === SimulateModeTypes["MATRIX"]) {
            setSimulationType(SimulateModeTypes["NOT-SELECTED"]);

            // Set Active Mode
            selectSimulationAddon(SimulateModeTypes["NOT-SELECTED"]);

            $('#selected-mode').text('Select an option from the options list to continue.');
        } else {
            setSimulationType(SimulateModeTypes["MATRIX"]);
            // Set Active Mode
            selectSimulationAddon(SimulateModeTypes["MATRIX"]);

            $('#selected-mode').html('<b>Selected: Adjacency Matrix</b>');

            if(localStorage.getItem('NexusNetworkType') === "DIRECTED") {
                nexusNetwork.buildAdjacencyMatrix(NetworkType.DIRECTED);
            } else {
                nexusNetwork.buildAdjacencyMatrix(NetworkType.UNDIRECTED);
            }

            if(!$('#export-adjacency-button').length) {
                $('#adjacency-matrix-table').tableExport({
                    bootstrap: true,
                    headers: true,
                    footers: true,
                    formats: ["xls"],
                    filename: "Nexus"
                });

                $('#adjacency-matrix-table').children(":first").children(":first").removeClass('btn-default').addClass('btn-primary');
                $('#adjacency-matrix-table').children(":first").children(":first").attr("id", "export-adjacency-button");
            }
        }
    });
    // END: Simulate Mode - Adjacency Matrix

    // START: Simulate Mode - Simulation
    let selectedNodeSimulation = "FIRST";

    $('#simulate-mode-simulation').unbind().on('click', function() {
        if(getSimulationType() === SimulateModeTypes["SIMULATION"]) {
            setSimulationType(SimulateModeTypes["NOT-SELECTED"]);

            $('#alert-container').hide().fadeIn(200);

            // Set Active Mode
            selectSimulationAddon(SimulateModeTypes["NOT-SELECTED"]);

            $('#selected-mode').text('Select an option from the options list to continue.');
        } else {
            setSimulationType(SimulateModeTypes["SIMULATION"]);
            // Set Active Mode
            selectSimulationAddon(SimulateModeTypes["SIMULATION"]);

            $('#alert-container').hide().fadeIn(200);

            let valueSelectedFirst = "notSelectedNode";
            let valueSelectedSecond = "notSelectedNode";

            if(selectedNodeSimulation === "FIRST") {
                valueSelectedFirst = "selectedNode";
            } else if(selectedNodeSimulation === "SECOND") {
                valueSelectedSecond = "selectedNode";
            } else {
                valueSelectedFirst = "notSelectedNode";
                valueSelectedSecond = "notSelectedNode";
            }

            $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                "                                        <div class=\"fabrx-icon mr-2\" id='alert-icon'>\n" +
                "                                            <i class=\"fas fa-vr-cardboard fa-2x text-success\"></i>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                "                                            <div class=\"alert-caption-title\">Simulation Mode > Find Shortest Path</div>\n" +
                "                                            <p>You can now obtain the shortest path from one node to another.</p>\n" +
                "                                            <p id='selected-mode' class='mt-3 text-success'>Left click to select the nodes.</p>\n" +
                "                                            <div class='mt-4 text-success'>" +
                "                                                <button class='btn btn-sm text-success " + valueSelectedFirst + " rounded-0' id='simulation_first_node'><i>First Node</i></button>" +
                "                                                <span class='mr-2 ml-2'><i class=\"fas fa-long-arrow-alt-right\"></i></span>" +
                "                                                <button class='btn btn-sm text-success " + valueSelectedSecond + " rounded-0' id='simulation_second_node'><i>Second Node</i></button>" +
                "                                                <span class='text-success borderDistance'><span class='ml-3'>Distance: <span id='node-distance'>0</span></span></span>" +
                "                                            </div>" +
                "                                        </div>\n" +
                "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                "                                            <button class=\"btn btn-outline-primary rounded-24\" id='exitSimulation'>Exit Simulation</button>\n" +
                "                                        </div>\n" +
                "                                    </div>");

            $('#alert-container').hide().fadeIn(200);

            $('#simulation_first_node').on('click', function() {
                if(selectedNodeSimulation !== "FIRST") {
                    selectedNodeSimulation = "FIRST";

                    if($('#simulation_first_node').hasClass('notSelectedNode')) {
                        $('#simulation_first_node').removeClass('notSelectedNode');
                    }
                    if(!$('#simulation_first_node').hasClass('selectedNode')) {
                        $('#simulation_first_node').addClass('selectedNode');
                    }

                    if($('#simulation_second_node').hasClass('selectedNode')) {
                        $('#simulation_second_node').removeClass('selectedNode');
                    }
                    if(!$('#simulation_second_node').hasClass('notSelectedNode')) {
                        $('#simulation_second_node').addClass('notSelectedNode');
                    }
                } else {
                    selectedNodeSimulation = "NONE";

                    if($('#simulation_first_node').hasClass('selectedNode')) {
                        $('#simulation_first_node').removeClass('selectedNode');
                    }
                    if(!$('#simulation_first_node').hasClass('notSelectedNode')) {
                        $('#simulation_first_node').addClass('notSelectedNode');
                    }

                    if($('#simulation_second_node').hasClass('selectedNode')) {
                        $('#simulation_second_node').removeClass('selectedNode');
                    }
                    if(!$('#simulation_second_node').hasClass('notSelectedNode')) {
                        $('#simulation_second_node').addClass('notSelectedNode');
                    }
                }
            });

            $('#simulation_second_node').on('click', function() {
                if(selectedNodeSimulation !== "SECOND") {
                    selectedNodeSimulation = "SECOND";

                    if($('#simulation_second_node').hasClass('notSelectedNode')) {
                        $('#simulation_second_node').removeClass('notSelectedNode');
                    }
                    if(!$('#simulation_second_node').hasClass('selectedNode')) {
                        $('#simulation_second_node').addClass('selectedNode');
                    }

                    if($('#simulation_first_node').hasClass('selectedNode')) {
                        $('#simulation_first_node').removeClass('selectedNode');
                    }
                    if(!$('#simulation_first_node').hasClass('notSelectedNode')) {
                        $('#simulation_first_node').addClass('notSelectedNode');
                    }
                } else {
                    selectedNodeSimulation = "NONE";
                    
                    if($('#simulation_second_node').hasClass('selectedNode')) {
                        $('#simulation_second_node').removeClass('selectedNode');
                    }
                    if(!$('#simulation_second_node').hasClass('notSelectedNode')) {
                        $('#simulation_second_node').addClass('notSelectedNode');
                    }

                    if($('#simulation_first_node').hasClass('selectedNode')) {
                        $('#simulation_first_node').removeClass('selectedNode');
                    }
                    if(!$('#simulation_first_node').hasClass('notSelectedNode')) {
                        $('#simulation_first_node').addClass('notSelectedNode');
                    }
                }
            });

            let selectedFirstNode = null, selectedSecondNode = null;

            // Simulation Mode - Simulation [Left Click]
            nexusNetwork.getNetwork().on('click', function(properties) {
                if(getSimulationMode() && getSimulationType() === SimulateModeTypes["SIMULATION"]) {
                    let networkType = localStorage.getItem('NexusNetworkType');

                    // First Node
                    if(selectedNodeSimulation === "FIRST") {
                        if(properties.nodes.length !== 0) {
                            selectedFirstNode = properties.nodes[0];
                            $('#simulation_first_node').html(nexusNetwork.getNodeDataFromID(properties.nodes[0]));

                            if(selectedSecondNode !== null && selectedSecondNode !== "") {
                                if(selectedFirstNode !== selectedSecondNode) {
                                    if(networkType === "UNDIRECTED") {
                                        nexusNetwork.simulateNetwork(NetworkType.UNDIRECTED, selectedFirstNode, selectedSecondNode);
                                    } else {
                                        nexusNetwork.simulateNetwork(NetworkType.DIRECTED, selectedFirstNode, selectedSecondNode);
                                    }
                                }
                            }
                        }
                    } else if(selectedNodeSimulation === "SECOND") {
                        if(properties.nodes.length !== 0) {
                            selectedSecondNode = properties.nodes[0];
                            $('#simulation_second_node').html(nexusNetwork.getNodeDataFromID(properties.nodes[0]));

                            if(selectedFirstNode !== null && selectedFirstNode !== "") {
                                if(selectedFirstNode !== selectedSecondNode) {
                                    if(networkType === "UNDIRECTED") {
                                        nexusNetwork.simulateNetwork(NetworkType.UNDIRECTED, selectedFirstNode, selectedSecondNode);
                                    } else {
                                        nexusNetwork.simulateNetwork(NetworkType.DIRECTED, selectedFirstNode, selectedSecondNode);
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    });
    // END: Simulate Mode - Simulation

    // START: Edit Mode Type - Add Node
    $('#edit-mode-add-node').on('click', function() {
        if(getEditType() === EditModeTypes["ADD-NODE"]) {
            setEditType(EditModeTypes["NOT-SELECTED"]);

            // Set Active Mode
            selectAddon(EditModeTypes["NOT-SELECTED"]);

            $('#selected-mode').text('Select an option from the options list to continue.');
        } else {
            setEditType(EditModeTypes["ADD-NODE"]);
            // Set Active Mode
            selectAddon(EditModeTypes["ADD-NODE"]);

            $('#selected-mode').html('<b>Selected: Add Node</b>');
            document.getElementById("addon-node-name").focus();

            Net.addNodeMode();
        }
    });
    // END: Edit Mode Type - Add Node

    // START: Edit Mode Type - Add Edge
    $('#edit-mode-add-edge').on('click', function() {
        if(getEditType() === EditModeTypes["ADD-EDGE"]) {
            setEditType(EditModeTypes["NOT-SELECTED"]);

            // Set Active Mode
            selectAddon(EditModeTypes["NOT-SELECTED"]);

            nexusNetwork.getNetwork().disableEditMode();

            $('#selected-mode').text('Select an option from the options list to continue.');
        } else {
            setEditType(EditModeTypes["ADD-EDGE"]);
            // Set Active Mode
            selectAddon(EditModeTypes["ADD-EDGE"]);

            $('#selected-mode').html('<b>Selected: Add Edge</b>');

            Net.addEdgeMode();
        }
    });
    // END: Edit Mode Type - Add Edge

    // START: Edit Mode Type - Delete Selected
    $('#edit-mode-delete').on('click', function() {
        if(getEditType() === EditModeTypes["DELETE"]) {
            setEditType(EditModeTypes["NOT-SELECTED"]);

            // Set Active Mode
            selectAddon(EditModeTypes["NOT-SELECTED"]);

            $('#selected-mode').text('Select an option from the options list to continue.');
        } else {
            setEditType(EditModeTypes["DELETE"]);
            // Set Active Mode
            selectAddon(EditModeTypes["DELETE"]);

            $('#selected-mode').html('<b>Selected: Delete Node/Edge</b>');

            nexusNetwork.getNetwork().on('click', function(params) {
                if(getEditType() === EditModeTypes["DELETE"]) {
                    nexusNetwork.getNetwork().deleteSelected();
                }
            });

        }
    });
    // END: Edit Mode Type - Delete Selected

    // START: Edit Mode Type - Edit Node
    $('#edit-mode-edit-node').on('click', function() {
        if(getEditType() === EditModeTypes["EDIT-NODE"]) {
            setEditType(EditModeTypes["NOT-SELECTED"]);

            // Set Active Mode
            selectAddon(EditModeTypes["NOT-SELECTED"]);

            nexusNetwork.getNetwork().disableEditMode();

            $('#selected-mode').text('Select an option from the options list to continue.');
        } else {
            setEditType(EditModeTypes["EDIT-NODE"]);
            // Set Active Mode
            selectAddon(EditModeTypes["EDIT-NODE"]);

            $('#selected-mode').html('<b>Selected: Edit Node</b>');

            network.on('click', function(params) {
                if(getEditMode() && getEditType() === EditModeTypes["EDIT-NODE"]) {
                    if(params.nodes.length === 1) {
                        let clickedNode = params['nodes'][0];
                        setSelectedNode(clickedNode);

                        console.log(params);
                        $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-25 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                            "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                            "                                            <i class=\"far fa-check-circle fa-2x text-success\"></i>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                            "                                            <div class=\"alert-caption-title\">Set Node Name</div>\n" +
                            "                                            <p>Enter a new name for this node.</p>\n" +
                            "                                            <div class='input-group'>" +
                            "                                                <input type=\"text\" name=\"addon-node-name-edit\" id=\"addon-node-name-edit\" placeholder=\"Node Name\" class=\"form-control form-line-control is-valid\"/>" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                            "                                            <button class=\"btn btn-outline-primary rounded-24\" id='setEditNodeName'>Set</button>\n" +
                            "                                        </div>\n" +
                            "                                    </div>");

                        $('#addon-node-name-edit').focus();

                        document.getElementById('setEditNodeName').addEventListener('click', function() {
                            let editLabel = document.getElementById("addon-node-name-edit").value;
                            let nameExists = false;

                            nexusNetwork.getData().nodes.forEach(function(node) {
                                if(node.label === editLabel) {
                                    nameExists = true;
                                }
                            });

                            if (editLabel.length !== 0) {
                                if(nameExists) {
                                    alert('The node name already exists! Choose another one.');
                                } else {
                                    nexusNetwork.getNodes().update({
                                        id: nodeID,
                                        label: editLabel
                                    });

                                    $('#alert-container').fadeOut(100);

                                    $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                                        "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                                        "                                            <i class=\"far fa-check-circle fa-2x text-success\"></i>\n" +
                                        "                                        </div>\n" +
                                        "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                                        "                                            <div class=\"alert-caption-title\">Edit Mode is turned on!</div>\n" +
                                        "                                            <p>You can now edit the properties of each node.</p>\n" +
                                        "                                            <p id='selected-mode' class='mt-3 text-success'><b>Selected: Edit Node</b></p>\n" +
                                        "                                        </div>\n" +
                                        "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                                        "                                            <button class=\"btn btn-outline-primary rounded-24\" id='saveEdit'>Save Changes</button>\n" +
                                        "                                        </div>\n" +
                                        "                                    </div>");

                                    $('#alert-container').hide().fadeIn(100);
                                }
                            }
                        });
                    }
                }
            });
        }
    });
    // END: Edit Mode Type - Edit Node

    // START: Save to Database
    $('#save-network-database').on('click', function() {
        $('#create-network-btn').unbind('click');
        $('#cancel-create-network-btn').unbind('click');

        if(localStorage.getItem('ServerNetworkEdit') !== null && localStorage.getItem('ServerNetworkEdit') === "1") {
            // Network is from Server
            let jsonData = {
                "NetworkType": localStorage.getItem('NexusNetworkType'),
                "NexusNodes": localStorage.getItem('NexusNodes'),
                "NexusEdges": localStorage.getItem('NexusEdges')
            };

            let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

            $.ajax({
                url: "./assets/php/ajax/user/updateNetwork.php",
                method: "POST",
                cache: false,
                data: {Network_Data: JSON.stringify(jsonData), Date_Modified: date, Network_ID: parseInt(localStorage.getItem('ServerNetworkEditID'))},
                success: function (data) {
                    console.log(data);
                    if(data === "NO-ERROR") {
                        $('#alert-container-bottom').fadeOut(100);

                        $('#alert-container-bottom').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-bottom w-50 ml-auto mr-auto mb-4\" role=\"alert\">\n" +
                            "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                            "                                            <i class=\"far fa-check-circle fa-2x text-success\"></i>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                            "                                            <div class=\"alert-caption-title\">This network has been saved!</div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>");

                        $('#alert-container-bottom').hide().fadeIn(100);

                        setTimeout(function() {
                            $('#alert-container-bottom').fadeOut(100);
                        }, 3333);
                    } else {
                        $('#alert-container-bottom').fadeOut(100);

                        $('#alert-container-bottom').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-bottom w-50 ml-auto mr-auto mb-4\" role=\"alert\">\n" +
                            "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                            "                                            <i class=\"far fa-times-circle fa-2x text-danger\"></i>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                            "                                            <div class=\"alert-caption-title\">" + data + "</div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>");

                        $('#alert-container-bottom').hide().fadeIn(100);

                        setTimeout(function() {
                            $('#alert-container-bottom').fadeOut(100);
                        }, 3333);
                    }
                }
            });

        } else {
            // Network is not from Server
            $('#save-network-button-container').slideToggle('fast');
            $('#save-network-name-container').slideToggle('fast');

            $('#cancel-create-network-btn').on('click', function() {
                $('#save-network-name-container').slideToggle('fast');
                $('#save-network-button-container').slideToggle('fast');
            });

            $('#create-network-btn').on('click', function() {
                let jsonData = {
                    "NetworkType": localStorage.getItem('NexusNetworkType'),
                    "NexusNodes": localStorage.getItem('NexusNodes'),
                    "NexusEdges": localStorage.getItem('NexusEdges')
                };

                let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

                $.ajax({
                    url: "./assets/php/ajax/user/addUserNetwork.php",
                    method: "POST",
                    cache: false,
                    data: {Network_Name: $('#network-name').val(), Network_Data: JSON.stringify(jsonData), Date_Modified: date, User_Email: localStorage.getItem('NexusEmail')},
                    success: function (data) {
                        if(data.includes("NO-ERROR")) {
                            let networkID = data.split(":")[1];
                            localStorage.setItem('ServerNetworkEdit', '1');
                            localStorage.setItem('ServerNetworkEditID', networkID);

                            $('#alert-container-bottom').fadeOut(100);

                            $('#alert-container-bottom').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-bottom w-50 ml-auto mr-auto mb-4\" role=\"alert\">\n" +
                                "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                                "                                            <i class=\"far fa-check-circle fa-2x text-success\"></i>\n" +
                                "                                        </div>\n" +
                                "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                                "                                            <div class=\"alert-caption-title\">This network has been saved!</div>\n" +
                                "                                        </div>\n" +
                                "                                    </div>");

                            $('#alert-container-bottom').hide().fadeIn(100);

                            setTimeout(function() {
                                $('#alert-container-bottom').fadeOut(100);
                            }, 3333);
                        } else {
                            $('#alert-container-bottom').fadeOut(100);

                            $('#alert-container-bottom').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-bottom w-50 ml-auto mr-auto mb-4\" role=\"alert\">\n" +
                                "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                                "                                            <i class=\"far fa-times-circle fa-2x text-danger\"></i>\n" +
                                "                                        </div>\n" +
                                "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                                "                                            <div class=\"alert-caption-title\">" + data + "</div>\n" +
                                "                                        </div>\n" +
                                "                                    </div>");

                            $('#alert-container-bottom').hide().fadeIn(100);

                            setTimeout(function() {
                                $('#alert-container-bottom').fadeOut(100);
                            }, 3333);
                        }
                    }
                });

                $('#save-network-name-container').slideToggle('fast');
                $('#save-network-button-container').slideToggle('fast');

            });
        }
    });

    // END: Save to Database

    // START: Export JSON
    $('#export-json').on('click', function() {
        let jsonData = {
            "NetworkType": localStorage.getItem('NexusNetworkType'),
            "NexusNodes": localStorage.getItem('NexusNodes'),
            "NexusEdges": localStorage.getItem('NexusEdges')
        };

        let date = new Date();
        let dateFormat = date.getDay() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

        let exportJSONElement = $('#export-json');
        exportJSONElement.prop('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonData)));
        exportJSONElement.prop('download', 'network_' + dateFormat + '.nexus');

    });
    // END: Export JSON




    /* INITIALIZE UNDO & REDO FUNCTIONALITIES */

    // START: Undo Button Click Handler
    $('#undo-btn').on('click', function() {
        if(history.length > 0) {
            for(let i = 0; i < history.length; i++) {
                if(history[i][2] === 1) {
                    if(i !== 0) {
                        history[i][2] = 0;
                        history[i - 1][2] = 1;

                        nexusNetwork.getNetwork().setData({
                            nodes: history[i - 1][0],
                            edges: history[i - 1][1]
                        });

                        nexusNetwork.getNodes().update(history[i - 1][0]);
                        nexusNetwork.getEdges().update(history[i - 1][1]);

                        nexusNetwork.getNetwork().redraw();

                        break;
                    }
                }
            }
        }
    });
    // END: Undo Button Click Handler

    // START: Redo Button Click Handler
    $('#redo-btn').on('click', function() {
        if(history.length > 0) {
            for(let i = 0; i < history.length; i++) {
                if(history[i][2] === 1) {
                    if(i !== history.length - 1) {
                        history[i][2] = 0;
                        history[i + 1][2] = 1;

                        nexusNetwork.getNetwork().setData({
                            nodes: history[i + 1][0],
                            edges: history[i + 1][1]
                        });

                        nexusNetwork.getNetwork().redraw();

                        break;
                    }
                }
            }
        }
    });
    // END: Redo Button Click Handler

    saveHistory();

    /* END OF INITIALIZATION OF UNDO & REDO FUNCTIONALITIES */

    return nexusNetwork;
}

function createNewNetwork() {
    localStorage.removeItem('NexusNetworkType');
    localStorage.removeItem('NexusNodes');
    localStorage.removeItem('NexusEdges');

    localStorage.setItem('ServerNetworkEdit', "0");
    localStorage.setItem('ServerNetworkEditID', "0");
    localStorage.setItem('NexusNetworkType', "UNDIRECTED");

    window.location.href = "home.php";
}

function selectAddon(addon) {
    let addonAddNode = $('#edit-mode-add-node');
    let addonAddEdge = $('#edit-mode-add-edge');
    let addonDelete = $('#edit-mode-delete');
    let addonEditNode = $('#edit-mode-edit-node');

    let moduleAddon = $('#edit-modules-addon');
    let moduleAddNode = $('#module-add-node');

    // Reset Alert Container
    $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
        "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
        "                                            <i class=\"far fa-check-circle fa-2x text-success\"></i>\n" +
        "                                        </div>\n" +
        "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
        "                                            <div class=\"alert-caption-title\">Edit Mode is turned on!</div>\n" +
        "                                            <p>You can now edit the properties of each node.</p>\n" +
        "                                            <p id='selected-mode' class='mt-3 text-success'>Select an option from the options list to continue.</p>\n" +
        "                                        </div>\n" +
        "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
        "                                            <button class=\"btn btn-outline-primary rounded-24\" id='saveEdit'>Save Changes</button>\n" +
        "                                        </div>\n" +
        "                                    </div>");

    // Reset All Styles
    if(addonAddNode.hasClass('btn-success')) {
        addonAddNode.removeClass('btn-success');
    }
    if(!(addonAddNode.hasClass('btn-primary'))) {
        addonAddNode.addClass('btn-primary');
    }
    if(addonAddEdge.hasClass('btn-success')) {
        addonAddEdge.removeClass('btn-success');
    }
    if(!(addonAddEdge.hasClass('btn-primary'))) {
        addonAddEdge.addClass('btn-primary');
    }
    if(addonDelete.hasClass('btn-success')) {
        addonDelete.removeClass('btn-success');
    }
    if(!(addonDelete.hasClass('btn-primary'))) {
        addonDelete.addClass('btn-primary');
    }
    if(addonEditNode.hasClass('btn-success')) {
        addonEditNode.removeClass('btn-success');
    }
    if(!(addonEditNode.hasClass('btn-primary'))) {
        addonEditNode.addClass('btn-primary');
    }

    // Reset All Addons
    addonAddNode.removeClass('btn-success');
    addonAddEdge.removeClass('btn-success');
    addonDelete.removeClass('btn-success');
    addonEditNode.removeClass('btn-success');

    // Reset All Modules
    if(!(moduleAddon.is(':hidden'))) {
        moduleAddon.slideToggle('fast');
    }
    if(!(moduleAddNode.hasClass('d-none'))) {
        moduleAddNode.addClass('d-none');
    }

    // Select Addon
    if(addon === EditModeTypes["ADD-NODE"]) {
        addonAddNode.addClass('btn-primary');

        addonAddNode.removeClass('btn-primary');
        addonAddNode.addClass('btn-success');

        moduleAddNode.removeClass('d-none');

        moduleAddon.slideToggle('fast');
    } else if(addon === EditModeTypes["ADD-EDGE"]) {
        addonAddEdge.removeClass('btn-primary');
        addonAddEdge.addClass('btn-success');
    } else if(addon === EditModeTypes["DELETE"]) {
        addonDelete.removeClass('btn-primary');
        addonDelete.addClass('btn-success');
    } else if(addon === EditModeTypes["EDIT-NODE"]) {
        addonEditNode.removeClass('btn-primary');
        addonEditNode.addClass('btn-success');
    }
}

function selectSimulationAddon(addon) {
    let nodes = nexusNetwork.getNodes().get();
    let edges = nexusNetwork.getEdges().get();

    /* Style resets */
    for(let i = 0; i < nodes.length; i++) {
        nodes[i]['color'] = {
            background: "#006EFF"
        };
    }
    for(let i = 0; i < edges.length; i++) {
        edges[i]['color'] = {
            color: "#006EFF"
        };
    }

    nexusNetwork.getNodes().update(nodes);
    nexusNetwork.getEdges().update(edges);

    let addonMatrix = $('#simulate-mode-matrix');
    let addonSimulation = $('#simulate-mode-simulation');

    let addonMatrixHolder = $('#adjacency-matrix-holder');

    // Reset Alert Container
    $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
        "                                        <div class=\"fabrx-icon mr-2\" id='alert-icon'>\n" +
        "                                            <i class=\"fas fa-vr-cardboard fa-2x text-success\"></i>\n" +
        "                                        </div>\n" +
        "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
        "                                            <div class=\"alert-caption-title\">Simulation Mode is turned on!</div>\n" +
        "                                            <p>You can now freely simulate the network.</p>\n" +
        "                                            <p id='selected-mode' class='mt-3 text-success'>Select an option from the options list to continue.</p>\n" +
        "                                        </div>\n" +
        "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
        "                                            <button class=\"btn btn-outline-primary rounded-24\" id='exitSimulation'>Exit Simulation</button>\n" +
        "                                        </div>\n" +
        "                                    </div>");

    // Reset All Styles
    if(addonMatrix.hasClass('btn-success')) {
        addonMatrix.removeClass('btn-success');
    }
    if(!(addonMatrix.hasClass('btn-primary'))) {
        addonMatrix.addClass('btn-primary');
    }

    if(addonSimulation.hasClass('btn-success')) {
        addonSimulation.removeClass('btn-success');
    }
    if(!(addonSimulation.hasClass('btn-primary'))) {
        addonSimulation.addClass('btn-primary');
    }

    // Reset All Addons
    addonMatrix.removeClass('btn-success');
    addonSimulation.removeClass('btn-success');

    if(!(addonMatrixHolder.is(':hidden'))) {
        addonMatrixHolder.slideToggle('fast');
    }

    // Select Addon
    if(addon === SimulateModeTypes["MATRIX"]) {
        addonMatrix.removeClass('btn-primary');
        addonMatrix.addClass('btn-success');

        addonMatrixHolder.slideToggle('fast');
    } else if(addon === SimulateModeTypes["SIMULATION"]) {
        addonSimulation.removeClass('btn-primary');
        addonSimulation.addClass('btn-success');
    }
}

function saveHistory() {
    let nodes = nexusNetwork.getNodes().get();
    let edges = nexusNetwork.getEdges().get();
    let active = 1;

    if(history.length > 0) {
        history[history.length - 1][2] = 0;
    }
    history.push([nodes, edges, active]);
}

function openNetwork(id) {
    // Get Network from Database
    $.ajax({
        url: "./assets/php/ajax/user/getNetworkDataByID.php",
        method: "POST",
        cache: false,
        data: {Network_ID: parseInt(id), Data: "Network_Data"},
        success: function (data) {
            if (data !== "ERROR") {
                // Set Network to LocalStorage
                let serverNetwork = JSON.parse(data);

                localStorage.setItem('NexusNetworkType', serverNetwork.NetworkType);
                localStorage.setItem('NexusNodes', serverNetwork.NexusNodes);
                localStorage.setItem('NexusEdges', serverNetwork.NexusEdges);
                localStorage.setItem('ServerNetworkEdit', "1");
                localStorage.setItem('ServerNetworkEditID', id);

                window.location.href = "home.php";
            }
        }
    });
}

function deleteNetwork(id) {
    // Delete Network from Database
    $.ajax({
        url: "./assets/php/ajax/user/deleteNetwork.php",
        method: "POST",
        cache: false,
        data: {Network_ID: parseInt(id)},
        success: function(data){
            console.log(data);
            if(data === "NO-ERROR") {
                $.ajax({
                    url: "./assets/php/ajax/ui/getAlert.php",
                    method: "POST",
                    cache: false,
                    data: {Type: "SUCCESS", Message: "The network has been deleted"},
                    success: function(data){
                        $('#toast-container').html(data);

                        setTimeout(function() {
                            $('#toast-container').html("");
                        }, 2333);
                    }
                });
            } else {
                $.ajax({
                    url: "./assets/php/ajax/ui/getAlert.php",
                    method: "POST",
                    cache: false,
                    data: {Type: "DANGER", Message: data},
                    success: function(data){
                        $('#toast-container').html(data);

                        setTimeout(function() {
                            $('#toast-container').html("");
                        }, 2333);
                    }
                });
            }
        }, complete: function() {
            // Refresh Network List
            $.ajax({
                url: "./assets/php/ajax/user/getUserDataByEmail.php",
                method: "POST",
                cache: false,
                data: {User_Email: localStorage.getItem('NexusEmail'), Data: "Name"},
                success: function(data) {
                    if(data !== "ERROR") {
                        userName = data;
                    }
                }, complete: function() {
                    $.ajax({
                        url: "./assets/php/ajax/user/getUserNetworks.php",
                        method: "POST",
                        cache: false,
                        data: {User_Email: localStorage.getItem('NexusEmail')},
                        success: function (dataNetwork) {
                            if(dataNetwork !== "ERROR") {
                                $('#landing-container-left').html("<div class=\"row\">\n" +
                                    "                                <div class=\"col-6\">\n" +
                                    "                                    <h5 class=\"text-success mb-5\">" + userName + "</h5>\n" +
                                    "                                </div>\n" +
                                    "                                <div class=\"col-6\">\n" +
                                    "                                    <a href=\"\" onclick=\"logout();\" class=\"float-right\">\n" +
                                    "                                        <i class=\"fas fa-2x fa-sign-out-alt text-danger\"></i>\n" +
                                    "                                    </a>\n" +
                                    "                                </div>\n" +
                                    "                            </div>\n" + dataNetwork);
                            }
                        }
                    });
                }
            });
        }
    });

}

function logout() {
    localStorage.removeItem('NexusEmail');
    window.location.reload();
}