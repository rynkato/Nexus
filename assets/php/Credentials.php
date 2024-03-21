<?php

date_default_timezone_set("Asia/Kuala_Lumpur");

class Credentials {

    function register($name, $email, $pass) {
        $responseDuplicateEmail = $this->checkDuplicateEmails($email);
        if($responseDuplicateEmail['error']) {
            $response['error'] = true;
            $response['message'] = $responseDuplicateEmail['message'];
        } else {
            $DatabaseHandler = new DatabaseHandler();
            $connection = $DatabaseHandler->getMySQLiConnection();

            $passwordHash = password_hash($pass, PASSWORD_DEFAULT);

            $sql = "INSERT INTO users(Name, Email_Address, Password_Hash) VALUES('" . $name . "', '" . $email . "', '" . $passwordHash . "')";

            $statement = $connection->query($sql);

            if($statement) {
                $response['error'] = false;
            } else {
                $response['error'] = true;
                $response['message'] = "There was an issue while registering you.";
            }
        }

        return $response;
    }

    function login($email, $pswd) {
        $DatabaseHandler = new DatabaseHandler();
        $connection = $DatabaseHandler->getMySQLiConnection();

        $sql = "SELECT * FROM users WHERE Email_Address = '$email'";

        $statement = $connection->query($sql);

        if($statement->num_rows > 0) {

            while($row = $statement->fetch_assoc()) {
                $pswdHash = $row["Password_Hash"];
            }

            if(password_verify($pswd, $pswdHash)) {
                $response['error'] = false;
                $response['email'] = $email;
            } else {
                $response['error'] = true;
                $response['message'] = "The password entered is incorrect.";
            }
        } else {
            $response['error'] = true;
            $response['message'] = "There is no user registered with that email.";
        }

        $statement->close();
        $connection->close();

        return $response;
    }

    private function checkDuplicateEmails($email) {
        $DatabaseHandler = new DatabaseHandler();
        $connection = $DatabaseHandler->getMySQLiConnection();

        $sql = "SELECT * FROM users WHERE Email_Address = '$email'";

        $statement = $connection->query($sql);

        if($statement->num_rows > 0) {
            $response['error'] = true;
            $response['message'] = "This email has already been used.";
        } else {
            $response['error'] = false;
        }

        $statement->close();
        $connection->close();

        return $response;
    }

    function getUserDataByID($id, $data) {
        $DatabaseHandler = new DatabaseHandler();
        $connection = $DatabaseHandler->getMySQLiConnection();

        $sql = "SELECT * FROM users WHERE ID = " . intval($id);

        $statement = $connection->query($sql);

        if($statement->num_rows > 0) {
            $response['error'] = false;
            while($row = $statement->fetch_assoc()) {
                $response['data'] = $row[$data];
            }
        } else {
            $response['error'] = true;
        }

        $statement->close();
        $connection->close();

        return $response;
    }

    function getUserDataByEmail($email, $data) {
        $DatabaseHandler = new DatabaseHandler();
        $connection = $DatabaseHandler->getMySQLiConnection();

        $sql = "SELECT * FROM users WHERE Email_Address = '$email'";

        $statement = $connection->query($sql);

        if($statement->num_rows > 0) {
            $response['error'] = false;
            while($row = $statement->fetch_assoc()) {
                $response['data'] = $row[$data];
            }
        } else {
            $response['error'] = true;
        }

        $statement->close();
        $connection->close();

        return $response;
    }

    private function checkDuplicateNetworkData($networkData, $userID) {
        $DatabaseHandler = new DatabaseHandler();
        $connection = $DatabaseHandler->getMySQLiConnection();

        $networkDataFixed = $networkData;

        $sql = "SELECT * FROM networks WHERE Network_Owner = " . intval($userID);

        $statement = $connection->query($sql);

        $response['error'] = false;

        if($statement->num_rows > 0) {
            while($row = $statement->fetch_assoc()) {
                if(!$response['error']) {
                    if($row['Network_Data'] == $networkDataFixed) {
                        $response['error'] = true;
                        $response['message'] = "This network wasn't created as it's the same to one of your saved networks (" . $row['Network_Name'] . ").";
                        break;
                    }
                }
            }
        } else {
            $response['error'] = false;
        }

        $connection->close();

        return $response;
    }

    function addUserNetwork($networkName, $networkData, $dateModified, $email) {
        date_default_timezone_set("Asia/Kuala_Lumpur");

        $responseGetUserID = $this->getUserDataByEmail($email, "ID");

        if($responseGetUserID['error']) {
            $response['error'] = true;
            $response['message'] = $responseGetUserID['message'];
        } else {
            $responseDuplicateNetwork = $this->checkDuplicateNetworkData($networkData, $responseGetUserID['data']);

            if($responseDuplicateNetwork['error']) {
                $response['error'] = true;
                $response['message'] = $responseDuplicateNetwork['message'];
            } else {
                $DatabaseHandler = new DatabaseHandler();
                $connection = $DatabaseHandler->getMySQLiConnection();

                $networkNameFixed = $connection->real_escape_string($networkName);
                $networkDataFixed = $networkData;
                $dateModifiedFixed = $connection->real_escape_string(date('Y-m-d H:i:s'));
                $networkOwnerFixed = intval($responseGetUserID['data']);

                $sql = "INSERT INTO networks(Network_Name, Network_Data, Network_Last_Modified, Network_Owner) VALUES (?,?,?,?)";

                $statement = $connection->prepare($sql);
                $statement->bind_param("sssi", $networkNameFixed, $networkDataFixed, $dateModifiedFixed, $networkOwnerFixed);

                if($statement->execute()) {
                    $response['error'] = false;
                    $response['id'] = $connection->insert_id;
                } else {
                    $response['error'] = true;
                    $response['message'] = $connection->error;
                }

                $statement->close();
                $connection->close();
            }
        }

        return $response;
    }

    function updateNetwork($networkID, $networkData, $dateModified) {
        $DatabaseHandler = new DatabaseHandler();
        $connection = $DatabaseHandler->getMySQLiConnection();

        $networkDataFixed = $networkData;
        $dateModifiedFixed = $connection->real_escape_string(date('Y-m-d H:i:s'));

        $sql = "UPDATE networks SET Network_Data = ?, Network_Last_Modified = ? WHERE ID = " . intval($networkID);

        $statement = $connection->prepare($sql);
        $statement->bind_param("ss", $networkDataFixed, $dateModifiedFixed);

        if($statement->execute()) {
            $response['error'] = false;
        } else {
            $response['error'] = true;
            $response['message'] = $connection->error;
        }

        $statement->close();
        $connection->close();

        return $response;
    }

    function getUserNetworks($email) {
        $responseGetUserID = $this->getUserDataByEmail($email, "ID");

        if($responseGetUserID['error']) {
            $response['error'] = true;
            $response['message'] = $responseGetUserID['message'];
        } else {
            $response['error'] = false;

            $DatabaseHandler = new DatabaseHandler();
            $connection = $DatabaseHandler->getMySQLiConnection();

            $sql = "SELECT * FROM networks WHERE Network_Owner = " . intval($responseGetUserID['data']);

            $statement = $connection->query($sql);

            if($statement->num_rows > 0) {
                $response['data'] = "<table class=\"table fabrx-table\">
                                <thead class=\"fabrx-table-header\">
                                    <tr class=\"text-center\">
                                        <td>#</td>
                                        <td>Network Name</td>
                                        <td>Date Modified</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>

                                <tbody>";

                $i = 1;

                while($row = $statement->fetch_assoc()) {
                    $response['data'] .= "<tr class=\"text-center\">
                                        <td>$i</td>
                                        <td>" . $row['Network_Name'] . "</td>
                                        <td>" . $row['Network_Last_Modified'] . "</td>
                                        <td>
                                            <div class=\"dropdown\">
                                                <a href=\"javascript:void(0);\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" id=\"Action1\">
                                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\">
                                                        <path data-name=\"Icon Color\" d=\"M13.889,2.889a1.445,1.445,0,1,1,1.445-1.445A1.446,1.446,0,0,1,13.889,2.889Zm-6.222,0A1.445,1.445,0,1,1,9.111,1.444,1.446,1.446,0,0,1,7.667,2.889Zm-6.223,0A1.445,1.445,0,1,1,2.889,1.444,1.446,1.446,0,0,1,1.444,2.889Z\" transform=\"translate(9.778 0.444) rotate(90)\" fill=\"#959393\"/>
                                                    </svg>
                                                </a>
                                                <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"Action1\">
                                                    <a class=\"dropdown-item\" onclick=\"openNetwork(" . $row['ID'] . ");\">Open</a>
                                                    <a class=\"dropdown-item\" onclick=\"deleteNetwork(" . $row['ID'] . ");\">Delete</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>";
                    $i++;
                }

                $response['data'] .= "</tbody>
                            </table>
                            <div class=\"row mt-5\">
                                <div class=\"col-12 text-center\">
                                    <a href=\"#\" class=\"text-primary\" style=\"font-size: 15pt;\" onclick=\"createNewNetwork();\">Create a new network <i class=\"fas fa-long-arrow-alt-right fa-lg ml-2\"></i></a>
                                </div>
                            </div>";
            } else {
                $response['data'] = "<div class=\"row\">
                                <div class=\"col-12 p-0\">
                                    <div class=\"card rounded-24 shadow-40 text-center\">
                                        <div class=\"card rounded-24 shadow-40\">
                                            <div class=\"card-body\">
                                                <i class=\"fas fa-scroll fa-2x text-success mt-3 mb-3\"></i>
                                                <h6 class=\"p-1 text-success\">There are currently no saved networks.</h6>
                                                <a href=\"#\" class=\"btn btn-primary mt-5\" onclick=\"createNewNetwork();\">Create a new network <i class=\"fas fa-long-arrow-alt-right fa-lg ml-2\"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>";
            }

            $statement->close();
            $connection->close();
        }

        return $response;
    }

    function getNetworkDataByID($id, $data) {
        $DatabaseHandler = new DatabaseHandler();
        $connection = $DatabaseHandler->getMySQLiConnection();

        $sql = "SELECT * FROM networks WHERE ID = " . intval($id);

        $statement = $connection->query($sql);

        if($statement->num_rows > 0) {
            $response['error'] = false;
            while($row = $statement->fetch_assoc()) {
                $response['data'] = $row[$data];
            }
        } else {
            $response['error'] = true;
        }

        $statement->close();
        $connection->close();

        return $response;
    }

    function deleteNetwork($id) {
        $DatabaseHandler = new DatabaseHandler();
        $connection = $DatabaseHandler->getMySQLiConnection();

        $sql = "DELETE FROM networks WHERE ID = " . intval($id);

        $statement = $connection->query($sql);

        if($statement) {
            $response['error'] = false;
        } else {
            $response['error'] = true;
            $response['message'] = $connection->error;
        }

        $connection->close();

        return $response;
    }

}