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
    echo "Connection failed: " . $e->getMessage();
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve  data sent from Angular application and tranform it to json
    $inputs = json_decode(file_get_contents("php://input"), true);
    
    // Extract data from JSON
    $id = $inputs["id"];
    $name = $inputs["name"];
    $LastN = $inputs["LastN"];
    $gender = $inputs["gender"];
    $Birth = $inputs["Birth"];
    $Father = $inputs["Father"];
    $Mother = $inputs["Mother"];
    
    try {
        // Prepare SQL statement to insert data into the table
        $sql = "INSERT INTO official_newborn (id, Name, LastName, gender, Date_Of_Birth, Father, Mother) 
                VALUES (:id, :name , :LastN, :gender, :Birth, :Father, :Mother)";
                
        // Prepare the SQL statement
        $stmt = $connexion->prepare($sql);
        
        // Bind parameters to the prepared statement
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':LastN', $LastN);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':Birth', $Birth);
        $stmt->bindParam(':Father', $Father);
        $stmt->bindParam(':Mother', $Mother);
        
        // Execute the prepared statement
        $stmt->execute();
        
        // Response message
        $response = ["success" => true, "message" => "Data inserted successfully"];
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
?>
