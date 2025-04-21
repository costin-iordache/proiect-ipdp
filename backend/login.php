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
        try {
            $stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['email'] = $user['email'];
                echo json_encode(['message' => 'Login successful', 'user' => ['id' => $user['id'], 'email' => $user['email']]]);
            } else {
                echo json_encode(['error' => 'Invalid credentials']);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Login failed: ' . $e->getMessage()]);
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