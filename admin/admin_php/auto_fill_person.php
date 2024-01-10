<?php
$firstname = $_POST['fname'];
$lastname = $_POST['lname'];
$phonenumber = $_POST['phonen'];
$eventid = $_POST['EID'];
$start_date = new DateTime($_POST['start_date']);
$start_date = $start_date->format('Y-m-d');
$end_date = new DateTime($_POST['end_date']);
$end_date = $end_date->format('Y-m-d');
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "select CID from classes where EID = " . $eventid . " AND dt >= \"" . $start_date . "\" AND dt <= \"" . $end_date . "\"";
    
$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($result)){
    $sql = "insert into participants(CID, FName, LName, PhoneN)
values(" . $row['CID'] . ", \"". $firstname . "\", \"" . $lastname . "\", \"" . $phonenumber . "\")";
    mysqli_query($conn, $sql);
}

?>