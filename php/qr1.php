<?php
header('Content-Type: application/json');

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "projet_mini_web";

try {
    // Create a PDO connection object
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Check if file is uploaded successfully
    if (!isset($_FILES['file'])) {
        echo json_encode(['success' => false, 'message' => 'File upload failed']);
        exit;
    }
    // Get the uploaded file name
    $uploadedFileName = "qrcodes/" . basename($_FILES['file']['name']); // Add the directory prefix

    // Check if the uploaded file name exists in the database
    $sql = "SELECT image FROM qrcode WHERE image = :uploadedFileName";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':uploadedFileName', $uploadedFileName);
    $stmt->execute();
    $existingFile = $stmt->fetch();

    if ($existingFile) {
        echo json_encode(['success' => true, 'message' => 'File exists in the database', 'filename' => $uploadedFileName, 'db_filename' => $existingFile['image']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'File does not exist in the database', 'filename' => $uploadedFileName]);
    }
    // Close database connection
    $conn = null;
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>