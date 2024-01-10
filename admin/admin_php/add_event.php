<?php
$title = $_POST['EName'];
$description = $_POST['descr'];
$class_size = $_POST['partN'];
$weekday = $_POST['weekday'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$background_color = ltrim($_POST['color'], '#');
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "insert into events(EName, descr, partN, weekday, start_time, end_time, color) 
        VALUES(\"" . $title . "\", \"" . $description . "\", " . $class_size . ", " . $weekday . ", \"" . $start_time . "\", \"" . $end_time . "\", \"" . $background_color . "\")";
    
$result = mysqli_query($conn, $sql);
echo $result;
$conn -> close();
?>