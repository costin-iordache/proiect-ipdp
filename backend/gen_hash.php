<?php

$plainTextPassword = "test";

$hashedPassword = password_hash($plainTextPassword, PASSWORD_ARGON2ID);

echo "Plain Text Password: " . $plainTextPassword . "\n\r";
echo "Hashed Password: " . $hashedPassword . "\n";


error_log("Testing PHP logging to /var/log/php_errors.log");
trigger_error("This is a test error", E_USER_WARNING);
echo "Logging test complete.\n";


?>