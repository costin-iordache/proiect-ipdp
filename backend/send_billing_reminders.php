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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $threeDaysFromNow = (new DateTime())->modify('+3 days')->format('Y-m-d');

    try {
        $stmt = $conn->prepare("
            SELECT
                s.id AS id,
                s.platform,
                s.billing_date,
                s.price,
                s.currency,
                u.first_name,
                u.last_name,
                u.email
            FROM subscriptions s
            JOIN users u ON s.user_id = u.id
            WHERE s.billing_date <= :three_days_from_now
        ");
        $stmt->bindParam(':three_days_from_now', $threeDaysFromNow);
        $stmt->execute();
        $upcomingBillings = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $sendgrid_api_key = $_ENV['SENDGRID_API_KEY'] ?? getenv('SENDGRID_API_KEY');
        $sender_email = $_ENV['SENDER_EMAIL'] ?? getenv('SENDER_EMAIL');
        $sender_name = 'SubWiz Reminders';

        $sentCount = 0;
        $errors = [];

        foreach ($upcomingBillings as $billing) {
            $recipientEmail = $billing['email'];
            $recipientName = $billing['first_name'] . ' ' . $billing['last_name'];
            $platform = $billing['platform'];
            $billingDateFormatted = (new DateTime($billing['billing_date']))->format('F j, Y');
            $amount = $billing['price'] . ' ' . $billing['currency'];

            $subject = "Upcoming Billing Reminder for " . htmlspecialchars($platform);
            $plainTextContent = "Hello " . htmlspecialchars($recipientName) . ",\n\n";
            $plainTextContent .= "This is a reminder that your subscription for " . htmlspecialchars($platform) . " is scheduled to be billed on " . $billingDateFormatted . " for the amount of " . htmlspecialchars($amount) . ".\n\n";
            $plainTextContent .= "Please ensure your payment method is up to date.\n\n";
            $plainTextContent .= "Thank you,\nThe SubWiz Team";

            $email_sent_successfully = false;
            try {
                $email_object = new \SendGrid\Mail\Mail();
                $email_object->setFrom($sender_email, $sender_name);
                $email_object->setSubject($subject);
                $email_object->addTo($recipientEmail, $recipientName);
                $email_object->addContent("text/plain", $plainTextContent);

                $sendgrid = new \SendGrid($sendgrid_api_key);
                $response = $sendgrid->send($email_object);

                $email_sent_successfully = $response->statusCode() >= 200 && $response->statusCode() < 300;
                if ($email_sent_successfully) {
                    echo "Reminder email sent to " . $recipientEmail . " for " . $platform . "\n";
                    $sentCount++;
                } else {
                    $errors[] = "SendGrid Error sending to " . $recipientEmail . " for " . $platform . ": " . $response->body();
                    error_log("SendGrid Error sending to " . $recipientEmail . " for " . $platform . ": " . $response->body());
                }

            } catch (Exception $e) {
                $email_sent_successfully = false;
                $errors[] = 'SendGrid Email sending failed: ' . $e->getMessage();
                error_log('SendGrid Email sending failed: ' . $e->getMessage());
            }
        }

        echo json_encode(['success' => true, 'message' => 'Successfully processed ' . count($upcomingBillings) . ' upcoming billings. ' . $sentCount . ' reminders sent.', 'errors' => $errors]);

    } catch (PDOException $e) {
        $error = 'Database error in billing reminder script: ' . $e->getMessage();
        error_log($error);
        echo json_encode(['error' => $error]);
    }

    $conn = null;
} else {
    echo json_encode(['error' => 'Only GET requests are allowed for this script.']);
}
?>