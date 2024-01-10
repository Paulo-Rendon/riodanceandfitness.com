<?php
$firstname = $_POST['FName'];
$lastname = $_POST['LName'];
$phonenumber = $_POST['PhoneN'];
$CID = $_POST['CID'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);
$sql = "delete from participants
        where CID = " . $CID . " AND FName = \"" . $firstname . "\" AND LName = \"" . $lastname . "\" AND PhoneN = " . $phonenumber;
echo $sql;
echo mysqli_query($conn, $sql);
$conn->close();
?>