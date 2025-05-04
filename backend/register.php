<?php
require_once 'db-connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['first_name'] ?? '';
    $lastName = $_POST['last_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!empty($firstName) && !empty($lastName) && !empty($email) && !empty($password)) {
        $hashedPassword = password_hash($password, PASSWORD_ARGON2ID);

        try {
            $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                echo json_encode(['error' => 'Email already exists']);
                exit;
            } else {
                $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)");
                $stmt->bindParam(':first_name', $firstName);
                $stmt->bindParam(':last_name', $lastName);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password', $hashedPassword);

                if ($stmt->execute()) {
                    $confirmation_token = bin2hex(random_bytes(32));
                    $user_id = $conn->lastInsertId();

                    $stmt = $conn->prepare("UPDATE users SET confirmation_token = ? WHERE id = ?");
                    $stmt->execute([$confirmation_token, $user_id]);

                    // for test purposes, only a link is made, not sending an email 
                    $confirmation_link = "http://ipdp.local/confirm-account?user_id=" . $user_id . "&token=" . $confirmation_token;
                    echo json_encode(['success' => true, 'confirmation_link' => $confirmation_link]);
                    exit;

                } else {
                    echo json_encode(['error' => 'Failed to register user']);
                }
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Email and password are required']);
    }

    $conn = null;
} else {
    echo json_encode(['error' => 'Only POST requests are allowed']);
}
?>