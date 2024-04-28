<?php
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$base = "projet_mini_web";

require_once 'vendor/autoload.php'; // Include the Firebase JWT library

use Firebase\JWT\JWT; // Import the JWT class

try {
    // Create a PDO connection object
    $connexion = new PDO("mysql:host=$servername;dbname=$base", $username, $password);
    // Set PDO error mode to exception
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // If connection fails, show error message
    echo "Connection failed: " . $e->getMessage();
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve JSON data sent from Angular application
    $user_data = json_decode(file_get_contents("php://input"), true);
    // Extract data from JSON
    $signInEmail = isset($user_data["signInEmail"]) ? trim($user_data["signInEmail"]) : '';
    $signInPassword = isset($user_data["signInPassword"]) ? trim($user_data["signInPassword"]) : '';

    // Check for empty inputs
    if (empty($signInEmail) || empty($signInPassword)) {
        $response = ["success" => false, "message" => "Email or password cannot be empty"];
        echo json_encode($response);
        exit; // Stop further execution
    }

    try {
        // Prepare SQL statement to select all columns and role based on email and password
        $select_sql = "SELECT * FROM user WHERE Email = :signInEmail AND password = :signInPassword";
        $select_stmt = $connexion->prepare($select_sql);
        $select_stmt->bindParam(':signInEmail', $signInEmail);
        $select_stmt->bindParam(':signInPassword', $signInPassword);
        $select_stmt->execute();
        $user_data = $select_stmt->fetch(PDO::FETCH_ASSOC);

        if ($user_data) {
            // If user data is found, generate a JWT token
            $token = generateJwtToken($user_data);

            // Return success response with user data and token
            $response = [
                "success" => true,
                "userData" => $user_data,
                "token" => $token,
                "message" => "Login successful"
            ];
        } else {
            // If user data is not found, return failure response
            $response = ["success" => false, "message" => "Login failed. Incorrect email or password."];
        }

        // Encode and return the response
        echo json_encode($response);
    } catch(PDOException $e) {
        // If an error occurs during execution of SQL statement, show error message
        $response = ["success" => false, "message" => "Error: " . $e->getMessage()];
        echo json_encode($response);
    }
} else {
    // If the request method is not POST, show an error message
    $response = ["success" => false, "message" => "Invalid request method"];
    echo json_encode($response);
}

// Function to generate JWT token
function generateJwtToken($user_data)
{
    $secretKey = 'your_secret_key';
    $issuedAt = time();
    $expirationTime = $issuedAt + (60 * 60); // Token valid for 1 hour

    $payload = [
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'data' => $user_data
    ];
    $jwt = JWT::encode($payload, $secretKey, 'HS256');
    return $jwt;
}
?>