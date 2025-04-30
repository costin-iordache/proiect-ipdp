<?php
$servername = "mysql:host=localhost;dbname=proiect_ipdp";
$username = "root";
$password = "";
$conn = null;

try {
  $conn = new PDO($servername, $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  die("Database connection failed: " . $e->getMessage());
}
?>