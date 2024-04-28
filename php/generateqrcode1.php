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
    // If connection fails, show error message
    echo json_encode(["success" => false, "message" => "Connection failed: " . $e->getMessage()]);
    exit; // Terminate script execution on connection error
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve data sent from Angular application and transform it to JSON
    $inputs = json_decode(file_get_contents("php://input"), true);

    // Extract data from JSON
    $id = $inputs["id"];
    $weight = $inputs["weight"];
    $height = $inputs["height"];
    $gender = $inputs["gender"];
    $health_state = $inputs["health_state"];
    $Date_Of_Birth = $inputs["Date_Of_Birth"];
    try {
        // Prepare SQL statement to insert data
        $sql = "INSERT INTO newborn (id, weight, height, gender, health_state ,Date_Of_Birth) 
                  VALUES (:id, :weight , :height, :gender, :health_state, :Date_Of_Birth)";

        // Prepare the SQL statement
        $stmt = $connexion->prepare($sql);

        // Bind parameters to the prepared statement
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':weight', $weight);
        $stmt->bindParam(':height', $height);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':health_state', $health_state);
        $stmt->bindParam(':Date_Of_Birth', $Date_Of_Birth);

        // Execute the prepared statement
        $stmt->execute();

        // Generate QR Code URL
        $qrCodeData = urlencode("ID: $id\nweight: $weight \nheight: $height\nGender: $gender\nDate_Of_Birth: $Date_Of_Birth\nhealth_state:$health_state");
        $qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=$qrCodeData";

        // Example code to move uploaded file to a directory
        $targetDir = 'qrcodes/';
        $fileName = "newborn_" . $id . ".jpg"; // Generate unique filename
        $targetFile = $targetDir . $fileName;
        // Save QR code image locally
        file_put_contents($targetFile, file_get_contents($qrCodeUrl));

        // Insert image file path into database
        $imagePath = $targetFile;
        $sql = "INSERT INTO qrcode (image) VALUES (:imagePath)";
        $stmt = $connexion->prepare($sql);
        $stmt->bindParam(':imagePath', $imagePath);
        $stmt->execute();

        // Response message with QR Code URL
        $response = [
            "success" => true,
            "message" => "Data inserted successfully. QR Code generated and stored at: $imagePath",
            "QRCodeURL" => $qrCodeUrl
        ];

        echo json_encode($response);
    } catch(PDOException $e) {
        // If an error occurs during SQL execution, show error message
        $response = ["success" => false, "message" => "Error: " . $e->getMessage()];
        echo json_encode($response);
    }
} else {
    // If the request method is not POST, show an error message
    $response = ["success" => false, "message" => "Invalid request method"];
    echo json_encode($response);
}
?>
