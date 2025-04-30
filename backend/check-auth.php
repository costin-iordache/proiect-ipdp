<?php
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

if (isset($_SESSION['user_id']) && isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'] === true) {
    echo json_encode(['isLoggedIn' => true, 'userId' => $_SESSION['user_id']]);
} else {
    echo json_encode(['isLoggedIn' => false]);
}
?>