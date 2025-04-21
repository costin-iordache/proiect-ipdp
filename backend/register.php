<?php
require_once 'db_connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type'); 


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!empty($email) && !empty($password)) {
        $hashedPassword = password_hash($password, PASSWORD_ARGON2ID);

        try {
            $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (:email, :password)");
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashedPassword);

            if ($stmt->execute()) {
                echo json_encode(['message' => 'User registered successfully']);
            } else {
                echo json_encode(['error' => 'Failed to register user']);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Email and password are required']);
    }

    $conn = null;
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST requests are allowed']);
}
?>