<?php
$start_date = new DateTime($_POST['start_date']);
$end_date = new DateTime($_POST['end_date']);
$weekday = $_POST['weekday'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$EID = $_POST['EID'];

$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

while($start_date->format('N') != $weekday)
    $start_date->modify('+1 day');
$sql = "INSERT INTO classes(EID, dt, start_time, end_time) values";

while($start_date <= $end_date){
    $sql .= " (" . $EID . ", '" . $start_date->format('Y-m-d') . "', '" . $start_time . "', '" . $end_time . "'),";
    $start_date->modify('+7 days');
}
$sql = substr($sql, 0, -1);
$result = mysqli_query($conn, $sql);
echo $result;
$conn->close();
?>