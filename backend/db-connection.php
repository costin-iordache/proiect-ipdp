<?php
$servername = "mysql:host=db;dbname=proiect_ipdp";
$username = "root";
$password = "123";
$conn = null;

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::MYSQL_ATTR_FOUND_ROWS => true,
];

try {
  $conn = new PDO($servername, $username, $password, $options);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  die("Database connection failed: " . $e->getMessage());
}
?>