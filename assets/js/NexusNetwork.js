let Nodes;
let Edges;
let Data;
let Net;
let options;
let AdjacencyMatrix;
const NetworkType = Object.freeze({"UNDIRECTED": 0, "DIRECTED": 1});

let nodeCount = 0;
let edgeCount = 0;

class NexusNetwork {

    constructor(networkType) {
        // Options Initializations
        options = {
            edges: {
                color: {
                    color: "#006EFF"
                }
            },
            nodes: {
                color: {
                    background: "#006EFF"
                },
                font: {
                    color: "#ffffff",
                    face: "Roboto"
                }
            },
            layout: {
                improvedLayout: false,
            },
            manipulation: {
                enabled: false,
                addNode: function(data, callback) {
                    if(getEditMode() && getEditType() === EditModeTypes["ADD-NODE"]) {
                        let labelValue = document.getElementById("addon-node-name").value;
                        let nameExists = false;

                        nexusNetwork.getData().nodes.forEach(function(node) {
                            if(node.label === labelValue) {
                                nameExists = true;
                            }
                        });

                        if(labelValue.length !== 0) {
                            if(nameExists) {
                                alert("The node name already exists! Choose another one.");
                            } else {
                                data.label = document.getElementById("addon-node-name").value;
                                callback(data);

                                saveHistory();

                                document.getElementById("addon-node-name").focus();
                            }
                        }
                        Net.addNodeMode();
                    }
                },
                deleteNode: function(data, callback) {
                    callback(data);

                    saveHistory();
                },
                addEdge: function(data, callback) {
                    if(getEditMode() && getEditType() === EditModeTypes["ADD-EDGE"]) {
                        if(!(data.from === data.to)) {
                            callback(data);

                            saveHistory();

                            Net.addEdgeMode();
                        }
                    }
                },
                deleteEdge: function(data, callback) {
                    if(getEditMode() && getEditType() === EditModeTypes["DELETE"]) {
                        callback(data);

                        saveHistory();
                    }
                }
            },
            physics: {
                enabled: true
            }
        };
        if(networkType === NetworkType.DIRECTED) {
            options = {
                edges: {
                    color: {
                        color: "#006EFF"
                    },
                    arrows: {
                        to: {
                            enabled: true,
                            type: "arrow"
                        }
                    }
                },
                nodes: {
                    color: {
                        background: "#006EFF"
                    },
                    font: {
                        color: "#ffffff",
                        face: "Roboto"
                    }
                },
                layout: {
                    improvedLayout: false,
                },
                manipulation: {
                    enabled: false,
                    addNode: function(data, callback) {
                        if(getEditMode() && getEditType() === EditModeTypes["ADD-NODE"]) {
                            let labelValue = document.getElementById("addon-node-name").value;
                            let nameExists = false;

                            nexusNetwork.getData().nodes.forEach(function(node) {
                                if(node.label === labelValue) {
                                    nameExists = true;
                                }
                            });

                            if(labelValue.length !== 0) {
                                if(nameExists) {
                                    alert("Node name already exists!");
                                } else {
                                    data.label = document.getElementById("addon-node-name").value;
                                    callback(data);

                                    saveHistory();

                                    document.getElementById("addon-node-name").focus();
                                }
                            }
                            Net.addNodeMode();
                        }
                    },
                    deleteNode: function(data, callback) {
                        callback(data);

                        saveHistory();
                    },
                    addEdge: function(data, callback) {
                        if(getEditMode() && getEditType() === EditModeTypes["ADD-EDGE"]) {
                            if(!(data.from === data.to)) {
                                $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-25 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                                    "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                                    "                                            <i class=\"far fa-check-circle fa-2x text-success\"></i>\n" +
                                    "                                        </div>\n" +
                                    "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                                    "                                            <div class=\"alert-caption-title\">Set Traffic</div>\n" +
                                    "                                            <p>Enter a value.</p>\n" +
                                    "                                            <div class='input-group'>" +
                                    "                                                <input type=\"number\" name=\"traffic-input\" id=\"traffic-input\" placeholder=\"Traffic\" class=\"form-control form-line-control is-valid\" id=\"traffic-input\" min='0' oninput=\"this.value = \n" +
                                    " !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null\">" +
                                    "                                            </div>\n" +
                                    "                                        </div>\n" +
                                    "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                                    "                                            <button class=\"btn btn-outline-primary rounded-24\" id='setTrafficBtn'>Set</button>\n" +
                                    "                                        </div>\n" +
                                    "                                    </div>");

                                $('#traffic-input').focus();

                                document.getElementById('setTrafficBtn').addEventListener('click', function() {
                                    let trafficValue = document.getElementById("traffic-input").value;
                                    if(trafficValue.length !== 0) {
                                        data.label = trafficValue;
                                        callback(data);

                                        saveHistory();

                                        $('#alert-container').fadeOut(100);

                                        $('#alert-container').html("<div class=\"fabrx-alert alert alert-light fade show shadow-dark-60 rounded-24 fixed-top w-50 ml-auto mr-auto mt-3\" role=\"alert\">\n" +
                                            "                                        <div class=\"fabrx-icon\" id='alert-icon'>\n" +
                                            "                                            <i class=\"far fa-check-circle fa-2x text-success\"></i>\n" +
                                            "                                        </div>\n" +
                                            "                                        <div class=\"alert-captions\" id='alert-captions'>\n" +
                                            "                                            <div class=\"alert-caption-title\">Edit Mode is turned on!</div>\n" +
                                            "                                            <p>You can now edit the properties of each node.</p>\n" +
                                            "                                            <p id='selected-mode' class='mt-3 text-success'><b>Selected: Add Edge</b></p>\n" +
                                            "                                        </div>\n" +
                                            "                                        <div class=\"alert-actions\" id='alert-actions'>\n" +
                                            "                                            <button class=\"btn btn-outline-primary rounded-24\" id='saveEdit'>Save Changes</button>\n" +
                                            "                                        </div>\n" +
                                            "                                    </div>");

                                        $('#alert-container').hide().fadeIn(100);

                                        Net.addEdgeMode();
                                    }
                                });
                            }
                        }
                    },
                    deleteEdge: function(data, callback) {
                        callback(data);

                        saveHistory();
                    }
                },
                physics: {
                    enabled: true
                }
            };
        }
        // Options Initializations

        if(localStorage.getItem('NexusNodes') !== null && localStorage.getItem('NexusEdges') !== null) {
            Nodes = new vis.DataSet(JSON.parse(localStorage.getItem('NexusNodes')));
            Edges = new vis.DataSet(JSON.parse(localStorage.getItem('NexusEdges')));

            nodeCount = Object.keys(JSON.parse(localStorage.getItem('NexusNodes'))).length;
            edgeCount = Object.keys(JSON.parse(localStorage.getItem('NexusEdges'))).length;
        } else {
            Nodes = new vis.DataSet([]);

            Edges = new vis.DataSet([]);
        }

        Data = {
            nodes: Nodes,
            edges: Edges
        };

        this.getNodes();
        this.getEdges();
        this.getData();

        Net = new vis.Network(document.getElementById('nexus-network'), Data, options);
    }

    getNetwork() {
        return Net;
    }

    getNodes() {
        return Nodes;
    }

    getEdges() {
        return Edges;
    }

    getData() {
        return Data;
    }

    getOptions() {
        return Net.getOptions();
    }

    getNodeDataFromID(nodeID) {
        let NexusNodes = JSON.parse(localStorage.getItem('NexusNodes'));
        let response = null;

        for(let i = 0; i < nodeCount; i++) {
            if(NexusNodes[i]['id'] === nodeID) {
                response = NexusNodes[i]['label'];
            }
        }
        return response;
    }

    getEdgesDataFromID(nodeID) {
        let NexusEdges = JSON.parse(localStorage.getItem('NexusEdges'));
        let response = [];

        let counter = 0;

        for(let i = 0; i < edgeCount; i++) {
            if(NexusEdges[i]['from'] === nodeID) {
                response[i + 1] = NexusEdges[i]['to'];
                counter++;
            }

            response[0] = counter;
        }
        return response;
    }

    addNode(nodeLabel) {
        nodeCount++;
        Nodes.add([
            {id: nodeCount, label: nodeLabel}
        ]);

        return nodeCount;
    }

    updateNode(nodeID, nodeLabel, nodeConnections, status) {
        Nodes.update({
            id: nodeID,
            label: nodeLabel,
            edges: nodeConnections
        });
    }

    addEdge(edgeFrom, edgeTo, arrow) {
        edgeCount++;
        if(arrow === 'NO') {
            Edges.add([
                {from: edgeFrom, to: edgeTo}
            ]);
        } else {
            Edges.add([
                {from: edgeFrom, to: edgeTo, arrows: 'to'}
            ]);
        }
    }

    saveNetwork() {
        localStorage.setItem('NexusNodes', JSON.stringify(nexusNetwork.getNetwork().body.data.nodes.get()));
        localStorage.setItem('NexusEdges', JSON.stringify(nexusNetwork.getNetwork().body.data.edges.get()));

        nexusNetwork.getNetwork().redraw();
    }

    buildAdjacencyMatrix(networkType) {

        /*

            A  B  C  D  E
        A   1  2  3  4  5
        B   6  7  8  9  10
        C   11 12 13 14 15
        D   16 17 18 19 20
        E   21 22 23 24 25

         */

        // Rebuild the network
        if(localStorage.getItem('NexusNetworkType') === "DIRECTED") {
            nexusNetwork = new NexusNetwork(NetworkType.DIRECTED);
        } else {
            nexusNetwork = new NexusNetwork(NetworkType.UNDIRECTED);
        }

        // Build Keys for Adjacency Matrix
        let keys = [];
        let keysID = [];

        let nodes = nexusNetwork.getNodes().get();
        let edges = nexusNetwork.getEdges().get();

        // Set first-level keys
        for(let i = 0; i < nodes.length; i++) {
            keys[nodes[i]['id']] = [];
            keysID[nodes[i]['id']] = [];
        }

        // Set second-level keys
        for(let i = 0; i < nodes.length; i++) {
            for(let j = 0; j < nodes.length; j++) {
                keys[nodes[i]['id']][nodes[j]['id']] = 0;
                keysID[nodes[i]['id']][nodes[j]['id']] = "-";
            }
        }

        // Check for links between nodes
        if(networkType === NetworkType.UNDIRECTED) {
            for(let i = 0; i < edges.length; i++) {
                // From -> To
                keys[edges[i]['from']][edges[i]['to']] = 1;
                keysID[edges[i]['from']][edges[i]['to']] = edges[i]['id'];

                // To -> From
                keys[edges[i]['to']][edges[i]['from']] = 1;
                keysID[edges[i]['to']][edges[i]['from']] = edges[i]['id'];
            }
        } else {
            for(let i = 0; i < edges.length; i++) {
                // From -> To
                keys[edges[i]['from']][edges[i]['to']] = edges[i]['label'];
                keysID[edges[i]['from']][edges[i]['to']] = edges[i]['id'];
            }
        }


        let horizontalText = "<tr class='font-weight-bold'><td></td>";
        let verticalText = "<tr>";

        // Present Data
        for(let i = 0; i < nodes.length; i++) {
            horizontalText += "<td class='text-primary'>" + this.getNodeDataFromID(nodes[i]['id']) + "</td>";
            verticalText += "<td class='text-primary font-weight-bold'>" + this.getNodeDataFromID(nodes[i]['id']) + "</td>";

            for(let j = 0; j < nodes.length; j++) {
                verticalText += "<td>" + keys[nodes[i]['id']][nodes[j]['id']] + "</td>";
            }

            verticalText += "</tr>";
        }

        horizontalText += "</tr>";

        let matrixHTML = horizontalText + verticalText;

        $('#matrix-table-body').html(matrixHTML);
    }

    simulateNetwork(networkType, nodeFrom, nodeTo) {
        /* nodeFrom represents the from node ID
           nodeTo represents the to node ID
        */

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

        /* Create a map of all connected nodes
        *
        *
        * PARENT: {
        *   CHILD-1: VALUE,
        *   CHILD-2: VALUE,
        *   CHILD-3: VALUE
        * }
        *
        * */

        const map = {};

        /* Setting the nodes map */
        for(let i = 0; i < nodes.length; i++) {
            map[nodes[i].id] = {};
            for(let j = 0; j < nodes.length; j++) {
                if(nodes[i].id !== nodes[j].id) {
                    map[nodes[i].id][nodes[j].id] = 0;
                }
            }
        }

        /* Altering values in the map */
        if(networkType === NetworkType.UNDIRECTED) {
            for(let i = 0; i < nodes.length; i++) {
                for(let j = 0; j < edges.length; j++) {
                    map[edges[j].from][edges[j].to] = 1;
                    map[edges[j].to][edges[j].from] = 1;
                }
            }
        } else {
            for(let i = 0; i < nodes.length; i++) {
                for(let j = 0; j < edges.length; j++) {
                    map[edges[j].from][edges[j].to] = parseInt(edges[j].label);
                }
            }
        }

        /* Get routes */
        let routeMap = {};

        let currentFromNode, currentToNode, currentFromEdge, currentToEdge;

        /* Set Template for Route Map */
        for(let i = 0; i < nodes.length; i++) {
            if(i === nodes.length - 1) {
                currentFromNode = nodes[i].id;
                currentToNode = null;
            } else {
                currentFromNode = nodes[i].id;
                currentToNode = nodes[i + 1].id;
            }

            routeMap[currentFromNode] = {};
        }

        /* Add Actual Data onto Route Map */
        if(networkType === NetworkType.UNDIRECTED) {
            for(let j = 0; j < edges.length; j++) {
                routeMap[edges[j].from][edges[j].to] = 1;
                routeMap[edges[j].to][edges[j].from] = 1;
            }
        } else {
            for(let j = 0; j < edges.length; j++) {
                routeMap[edges[j].from][edges[j].to] = parseInt(edges[j].label);
            }
        }

        /* Dijkstra's Algorithm Implementation */
        const findLowestWeightNode = (weights, processed) => {
            const knownNodes = Object.keys(weights)

            const lowestWeightNode = knownNodes.reduce((lowest, node) => {
                if(lowest === null && !processed.includes(node)) {
                    lowest = node;
                }
                if(weights[node] < weights[lowest] && !processed.includes(node)) {
                    lowest = node;
                }
                return lowest;
            }, null);

            return lowestWeightNode
        };
        const Dijkstra = (graph) => {
            // Track the lowest cost to each node
            const weights = Object.assign({[nodeTo]: Infinity}, graph[nodeFrom]);

            // Track paths
            const parents = {[nodeTo]: null};
            for (let child in graph[nodeFrom]) {
                parents[child] = nodeFrom;
            }

            // Track nodes that have already been processed
            const processed = [];

            // Initialize the node variable and set a default value and keep looping it to find the lowest weight
            let node = findLowestWeightNode(weights, processed);

            while (node) {

                // Get the weight of the current node
                let weight = weights[node];

                // Get all the neighbors of current node
                let children = graph[node];

                // Loop through each of the children, and calculate the weight to reach that child node
                // The weight of that node will be updated in the weights object if it is lowest or the ONLY weight available
                for (let n in children) {
                    let newWeight = weight + children[n];
                    if (!weights[n] || weights[n] > newWeight) {
                        weights[n] = newWeight;
                        parents[n] = node;
                    }
                }

                // Push processed data into its data structure
                processed.push(node);

                // Repeat until all nodes are processed
                node = findLowestWeightNode(weights, processed);
            }

            let optimalPath = [nodeTo];
            let parent = parents[nodeTo];

            while (parent) {
                if(!optimalPath.includes(parent)) {
                    optimalPath.unshift(parent);

                    if(parent === nodeFrom) {
                        break;
                    }
                    // Add parent to start of path array
                    parent = parents[parent];
                } else {
                    break;
                }
            }

            return {
                distance: weights[nodeTo],
                path: optimalPath
            };

        };

        let simulateDijkstra = Dijkstra(routeMap);
        console.log(simulateDijkstra);

        /* Show the nodes affected */
        if(simulateDijkstra.distance !== Infinity) {
            let affectedNodes = simulateDijkstra['path'];

            // Update Nodes
            for(let i = 0; i < affectedNodes.length; i++) {
                let nodeChange = nexusNetwork.getNodes().get(affectedNodes[i]);
                nodeChange.color = {
                    background: '#28a745'
                }

                nexusNetwork.getNodes().update(nodeChange);
            }

            // Update Edges
            for(let i = 0; i < affectedNodes.length; i++) {
                if(i === affectedNodes.length - 1) {
                    currentFromEdge = affectedNodes[i];
                    currentToEdge = null;
                } else {
                    currentFromEdge = affectedNodes[i];
                    currentToEdge = affectedNodes[i + 1];
                }

                if(networkType === NetworkType.UNDIRECTED) {
                    for(let j = 0; j < edges.length; j++) {
                        if((edges[j].from === currentFromEdge && edges[j].to === currentToEdge) || (edges[j].from === currentToEdge && edges[j].to === currentFromEdge)) {
                            let edgeChange = nexusNetwork.getEdges().get(edges[j].id);
                            edgeChange.color = {
                                color: '#28a745'
                            }

                            nexusNetwork.getEdges().update(edgeChange);
                        }
                    }
                } else {
                    for(let j = 0; j < edges.length; j++) {
                        if(edges[j].from === currentFromEdge && edges[j].to === currentToEdge) {
                            let edgeChange = nexusNetwork.getEdges().get(edges[j].id);
                            edgeChange.color = {
                                color: '#28a745'
                            }

                            nexusNetwork.getEdges().update(edgeChange);
                        }
                    }
                }
            }
        }

        /* Show the distance between both nodes in Alert Container */
        $('#node-distance').html(simulateDijkstra.distance);
    }
}