<?php
header("Content-Type: application/json");

// Database connection configuration
$servername = "localhost";
$username = "root";
$password = "";
$database = "projet_mini_web";

try {
    // Create a PDO connection object
    $connexion = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // Set PDO error mode to exception
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // If connection fails, return an error response
    http_response_code(500);
    echo json_encode(array("error" => "Database connection failed: " . $e->getMessage()));
    exit();
}

// Function to fetch all newborn data from the database
function getAllNewBorn() {
    global $connexion;
    try {
        $query = "SELECT * FROM official_newborn";
        $statement = $connexion->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    } catch(PDOException $e) {
        // If query fails, return an error response
        http_response_code(500);
        echo json_encode(array("error" => "Database query failed: " . $e->getMessage()));
        exit();
    }
}

// Call the function to fetch all newborn data and return JSON response
$newbornData = getAllNewBorn();
echo json_encode($newbornData);
?>
