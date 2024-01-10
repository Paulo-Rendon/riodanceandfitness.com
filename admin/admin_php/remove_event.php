<?php
$EID = $_GET['q'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "delete from events
        where EID = " . $EID;
    
mysqli_query($conn, $sql);
$conn->close();
?>