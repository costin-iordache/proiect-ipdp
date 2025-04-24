<?php
require_once 'db_connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!empty($email) && !empty($password)) {
        try {
            $stmt = $conn->prepare("SELECT id, email, password, is_confirmed FROM users WHERE email = :email");
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($user) {
                if (!$user['is_confirmed']) {
                    echo json_encode(['error' => 'Account not confirmed. Please check your email.']);
                    exit;
                }

                if (password_verify($password, $user['password'])) {
                    session_start();
                    $_SESSION['user_id'] = $user['id'];
                    echo json_encode(['message' => 'Login successful', 'user' => ['id' => $user['id'], 'email' => $user['email']]]);
                } else {
                    echo json_encode(['error' => 'Invalid credentials']);
                }
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Login failed: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Email and password are required']);
    }

    $conn = null;
} else {
    echo json_encode(['error' => 'Only POST requests are allowed']);
}
?>