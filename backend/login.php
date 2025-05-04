<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once 'db-connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!empty($email) && !empty($password)) {
        try {
            $stmt = $conn->prepare("SELECT id, first_name, last_name, email, password, is_confirmed FROM users WHERE email = :email");
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
                    $_SESSION['is_logged_in'] = true;
                    $userData = [['userId' => $user['id']], 'firstName' => $user['first_name'], 'lastName' => $user['last_name']];
                    echo json_encode(['success' => true, 'user' => $userData, 'isLoggedIn' => true]);
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