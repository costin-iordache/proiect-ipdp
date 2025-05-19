<?php

$plainTextPassword = "test";

$hashedPassword = password_hash($plainTextPassword, PASSWORD_ARGON2ID);

echo "Plain Text Password: " . $plainTextPassword . "\n\r";
echo "Hashed Password: " . $hashedPassword . "\n";


?>