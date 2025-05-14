<?php
require __DIR__ . '/../vendor/autoload.php';
require_once 'db-connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__), 'sendgrid.env');
$dotenv->load();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!empty($firstName) && !empty($lastName) && !empty($email) && !empty($password)) {
        $hashedPassword = password_hash($password, PASSWORD_ARGON2ID);

        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $count = $stmt->fetchColumn();

            if ($count > 0) {
                $conn->rollBack();
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

                    $sendgrid_api_key = $_ENV['SENDGRID_API_KEY'] ?? getenv('SENDGRID_API_KEY');
                    $sender_email = $_ENV['SENDER_EMAIL'] ?? getenv('SENDER_EMAIL');
                    $sender_name = 'SubWiz Team';
                    $recipient_email = $email;

                    $subject = "Confirm your account for SubWiz";

                    $plainTextContent = "Hi " . htmlspecialchars($firstName) . " " . htmlspecialchars($lastName) . ",\n\n";
                    $plainTextContent .= "Thank you for registering for SubWiz!\n";
                    $plainTextContent .= "Please confirm your email address by clicking the link below:\n\n";
                    $plainTextContent .= $confirmation_link . "\n\n";
                    $plainTextContent .= "If you did not register for SubWiz, please ignore this email.\n";
                    $plainTextContent .= "Thank you,\nThe SubWiz Team";

                    $email_sent_successfully = false;
                    try {
                        $email_object = new \SendGrid\Mail\Mail();
                        $email_object->setFrom($sender_email, $sender_name);
                        $email_object->setSubject($subject);
                        $email_object->addTo($recipient_email);
                        $email_object->addContent("text/plain", $plainTextContent);

                        $sendgrid = new \SendGrid($sendgrid_api_key);

                        $response = $sendgrid->send($email_object);

                        $email_sent_successfully = $response->statusCode() >= 200 && $response->statusCode() < 300;
                    } catch (Exception $e) {
                        $email_sent_successfully = false;
                        error_log('SendGrid Email sending failed: ' . $e->getMessage());
                        if (isset($response)) {
                            error_log('SendGrid Response Body: ' . $response->body());
                        }
                    }

                    $conn->commit();

                    if ($email_sent_successfully) {
                        echo json_encode(['success' => true, 'message' => 'Registration successful! Please check your email for the confirmation link.', 'confirmation_link' => $confirmation_link]);
                    } else {
                        error_log("Failed to send confirmation email to: " . $email);
                        echo json_encode(['success' => true, 'message' => 'Registration successful, but failed to send confirmation email.']);
                    }
                    exit;

                } else {
                    $conn->rollBack();
                    echo json_encode(['error' => 'Failed to register user']);
                }
            }
        } catch (PDOException $e) {
            $conn->rollBack();
            echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'All fields are required']);
    }

    $conn = null;
} else {
    echo json_encode(['error' => 'Only POST requests are allowed']);
}
?>