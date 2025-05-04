<?php
require_once 'db-connection.php';
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true'); // allow cookies

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 3600'); // how long the preflight response can be cached in seconds
    exit();
}
function getUserById($conn, $userId) {
    try {
        $stmt = $conn->prepare("SELECT id, first_name, last_name FROM user WHERE id = :id");
        $stmt->execute(['id' => $userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Database error in getUserById: " . $e->getMessage());
        return false;
    }
}

if (isset($_SESSION['user_id']) && isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'] === true) {
    $user = getUserById($conn, $_SESSION['user_id']);
    echo json_encode(['isLoggedIn' => true, 'userId' => $_SESSION['user_id'], 'firstName' => $user['first_name'], 'lastName' => $user['last_name']]);
} else {
    echo json_encode(['isLoggedIn' => false]);
}
?>