<?php
$servername = "mysql:host=db;dbname=proiect_ipdp";
$username = "root";
$password = "123";
$conn = null;

try {
  $conn = new PDO($servername, $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  die("Database connection failed: " . $e->getMessage());
}
?>