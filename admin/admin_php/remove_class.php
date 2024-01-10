<?php
$CID = $_GET['q'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "delete from classes
        where CID = " . $CID;
    
mysqli_query($conn, $sql);
$conn->close();
?>