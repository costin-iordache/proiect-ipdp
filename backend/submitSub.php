<?php
require_once 'db-connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['userId'] ?? null;
    $platform = $_POST['platform'] ?? '';
    $startDate = $_POST['startDate'] ?? '';
    $billingDate = $_POST['billingDate'] ?? '';
    $frequency = $_POST['frequency'] ?? '';
    $price = $_POST['price'] ?? '';
    $currency = $_POST['currency'] ?? '';

    if ($userId !== null && !empty($platform) && !empty($startDate) && !empty($billingDate) && !empty($frequency) && !empty($price) && !empty($currency)) {
        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("INSERT INTO subscriptions (user_id, platform, start_date, billing_date, billing_frequency, price, currency) VALUES (:user_id, :platform, :start_date, :billing_date, :billing_frequency, :price, :currency)");
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->bindParam(':platform', $platform);
            $stmt->bindParam(':start_date', $startDate);
            $stmt->bindParam(':billing_date', $billingDate);
            $stmt->bindParam(':billing_frequency', $frequency);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':currency', $currency);

            if ($stmt->execute()) {
                $subscriptionId = $conn->lastInsertId();
                $conn->commit();
                echo json_encode(['success' => true, 'message' => 'Subscription added successfully', 'subscriptionId' => $subscriptionId]);
                exit;
            } else {
                $conn->rollBack();
                echo json_encode(['error' => 'Failed to add subscription']);
                exit;
            }

        } catch (PDOException $e) {
            $conn->rollBack();
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
            exit;
        }
    } else {
        echo json_encode(['error' => 'All subscription fields are required']);
        exit;
    }
} else {
    echo json_encode(['error' => 'Only POST requests are allowed']);
    exit;
}
?>