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
    $requestBody = file_get_contents('php://input');
    $requestData = json_decode($requestBody, true);

    $id = isset($requestData['id']) ? intval($requestData['id']) : null;
    $userId = $requestData['userId'] ?? null;
    $platform = $requestData['platform'] ?? null;
    $startDate = $requestData['startDate'] ?? null;
    $billingDate = $requestData['billingDate'] ?? null;
    $billingFrequency = $requestData['billingFrequency'] ?? null;
    $price = $requestData['price'] ?? null;
    $currency = $requestData['currency'] ?? null;


    try {
        $conn->beginTransaction();

        $stmt = $conn->prepare("
            UPDATE subscriptions SET
                platform = :platform,
                start_date = :startDate,
                billing_date = :billingDate,
                billing_frequency = :billingFrequency,
                price = :price,
                currency = :currency
            WHERE id = :id
        ");
        $stmt->bindParam(':platform', $platform);
        $stmt->bindParam(':startDate', $startDate);
        $stmt->bindParam(':billingDate', $billingDate);
        $stmt->bindParam(':billingFrequency', $billingFrequency);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':currency', $currency);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $conn->commit();
            $stmt = $conn->prepare("
                SELECT id, user_id, platform, start_date, billing_date, billing_frequency, price, currency
                FROM subscriptions
                WHERE id = :id
            ");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $updatedSubscription = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($updatedSubscription) {
                echo json_encode(['success' => true, 'message' => 'Subscription updated successfully.', 'updatedSubscription' => $updatedSubscription]);
            } else {
                echo json_encode(['error' => 'Failed to retrieve updated subscription.']);
            }
        } else {
            $conn->rollBack();
            echo json_encode(['error' => 'Failed to update subscription.']);
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