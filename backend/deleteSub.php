<?php
require_once 'db-connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true");
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_GET['subId']) && is_numeric($_GET['subId'])) {
    $subIdToDelete = intval($_GET['subId']);

    try {
        $stmt = $conn->prepare("DELETE FROM subscriptions WHERE id = :id");
        $stmt->bindParam(':id', $subIdToDelete, PDO::PARAM_INT);

        if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Subscription deleted successfuly.']);
        } else {
            error_log("Failed to delete subscription with ID: $subIdToDelete");
            echo json_encode(['success' => false, 'error' => 'Failed to delete subscription.']);
        }

    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }

} else {
    error_log("Invalid subscription ID provided: " . $_GET['subId']);
    echo json_encode(['success' => false, 'error' => 'Invalid subscription ID provided.']);
}

$conn = null;
?>