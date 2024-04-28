<?php
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$base = "projet_mini_web";

try {
    // Create a PDO connection object
    $connexion = new PDO("mysql:host=$servername;dbname=$base", $username, $password);
    // Set PDO error mode to exception
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // If connection fails, return JSON error message
    echo json_encode(["success" => false, "message" => "Connection failed: " . $e->getMessage()]);
    exit; // Stop further execution
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve JSON data sent from Angular application
    $user_data = json_decode(file_get_contents("php://input"), true);

    // Check if all required fields are present and not empty
    $required_fields = ["CIN", "firstName", "lastName", "email", "password", "role"];
        foreach ($required_fields as $field) {
        if (!isset($user_data[$field]) || empty($user_data[$field])) {
            // If any required field is missing or empty, return JSON error message
            echo json_encode(["success" => false, "message" => "All fields are required"]);
            exit; // Stop further execution
        }
    }
    try {
        // Check if the email already exists in the database
        $check_sql = "SELECT * FROM user WHERE Email = :email";
        $check_stmt = $connexion->prepare($check_sql);
        $check_stmt->bindParam(':email', $user_data["email"]);
        $check_stmt->execute();
        $existing_user = $check_stmt->fetch(PDO::FETCH_ASSOC);

        if ($existing_user) {
            // If email exists, return JSON error message
            echo json_encode(["success" => false, "message" => "Email address already exists"]);
            exit; // Stop further execution
        } else {
            // $hashed_password = password_hash($user_data["password"], PASSWORD_DEFAULT);
            // Insert the user data into the database
            $sql = "INSERT INTO user (CIN, FirstName, LastName, Email, password, role) 
                    VALUES (:CIN, :FirstName, :LastName, :Email, :password, :role)";
            $stmt = $connexion->prepare($sql);
            $stmt->bindParam(':CIN', $user_data["CIN"]);
            $stmt->bindParam(':FirstName', $user_data["firstName"]);
            $stmt->bindParam(':LastName', $user_data["lastName"]);
            $stmt->bindParam(':Email', $user_data["email"]);
            $stmt->bindParam(':password', $user_data['password']);
            $stmt->bindParam(':role', $user_data["role"]);            
            $stmt->execute();
            
            // Return success response
            echo json_encode(["success" => true, "message" => "Data inserted successfully"]);
        }
    } catch(PDOException $e) {
        // If an error occurs, return JSON error message
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
} else {
    // If the request method is not POST, return JSON error message
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>