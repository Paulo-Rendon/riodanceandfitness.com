<?php
$title = $_POST['EName'];
$description = $_POST['descr'];
$class_size = $_POST['partN'];
$EID = $_POST['EID'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$color = ltrim($_POST['color'], '#');
$weekday = $_POST['weekday'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "update events set EName = \"" . $title . "\", 
                            descr = \"". $description . "\", 
                            partN = " . $class_size .",
                            weekday = " . $weekday . ",
                            start_time = \"" . $start_time . "\",
                            end_time = \"" . $end_time . "\",
                            color = \"" . $color . "\"
                            where EID = " . $EID;
    
$result = mysqli_query($conn, $sql);
echo $result;

$conn->close();
?>