<?php
require_once 'db-connection.php';
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Origin: http://localhost:3000');

$user_id = $_GET['user_id'] ?? null;
$token = $_GET['token'] ?? null;

if ($user_id && $token) {
    $stmt = $conn->prepare("SELECT id, confirmation_token, is_confirmed FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['confirmation_token'] === $token && !$user['is_confirmed']) {
        $stmt = $conn->prepare("UPDATE users SET is_confirmed = TRUE, confirmation_token = NULL WHERE id = ?");
        if ($stmt->execute([$user_id])) {
            echo "<h1>Account Confirmed!</h1>";
            echo "<p>Your account has been successfully confirmed. You can now try to log in.</p>";
        }
    } else {
        echo "<h1>Invalid Confirmation Link</h1>";
        echo "<p>This confirmation link is invalid or has already been used.</p>";
    }
} else {
    echo "<h1>Invalid Request</h1>";
    echo "<p>Invalid parameters provided in the confirmation link.</p>";
}

$conn = null;
?>