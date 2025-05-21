<?php
require_once 'db-connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['userId'] ?? null;
    $newPassword = $_POST['newPassword'] ?? null;
    $currentPassword = $_POST['currentPassword'] ?? null;

    if ($userId === null || $newPassword === null || $currentPassword === null) {
        echo json_encode(['error' => 'Missing required parameters.']);
        exit;
    }

    try {
        $conn->beginTransaction();

        $stmt = $conn->prepare("SELECT password FROM users WHERE id = :userId");
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($currentPassword, $user['password'])) {
            $conn->rollBack();
            echo json_encode(['error' => 'Incorrect current password.']);
            exit;
        }

        $hashedNewPassword = password_hash($newPassword, PASSWORD_ARGON2ID);

        $stmt = $conn->prepare("UPDATE users SET password = :newPassword WHERE id = :userId");
        $stmt->bindParam(':newPassword', $hashedNewPassword);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $conn->commit();
            echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
        } else {
            $conn->rollBack();
            echo json_encode(['error' => 'Failed to update password.']);
        }

    } catch (PDOException $e) {
        $conn->rollBack();
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }

    $conn = null;
} else {
    echo json_encode(['error' => 'Only POST requests are allowed.']);
}
?>