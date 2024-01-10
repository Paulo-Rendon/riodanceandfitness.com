<?php
$EID = $_POST['EID'];
$dt = $_POST['dt'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "insert into classes(EID, dt, start_time, end_time) 
VALUES(" . $EID . ", \"" . $dt . "\", \"" . $start_time . "\", \"" . $end_time . "\")";
    
$result = mysqli_query($conn, $sql);
$conn -> close();
?>