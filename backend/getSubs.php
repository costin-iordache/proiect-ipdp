<?php
require_once 'db-connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');

if (isset($_GET['userId']) && is_numeric($_GET['userId'])) {
    $userId = intval($_GET['userId']);

    try {
        $stmt = $conn->prepare("SELECT id, user_id, platform, start_date, billing_date, billing_frequency, price, currency FROM subscriptions WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $subscriptions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'subscriptions' => $subscriptions]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid or missing userId']);
}
?>