<?php
$CID = $_GET['q'];
$EID = $_GET['e'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "select * from participants where CID = " . $CID . " ORDER BY LName, FName, PhoneN";
    
$result = mysqli_query($conn, $sql);

echo "<span class=\"add_button\" onClick=\"enrollMember(" . $CID . ", " . $EID . ", 1)\">&plus;</span>";

while($row = mysqli_fetch_assoc($result)){
    echo "<div class=\"event_container\">
                <a class=\"remove_button\" onClick=\"removeParticipant(" . $CID . ", '" . $row['FName'] . "', '" . $row['LName'] . "', " . $row['PhoneN'] . ")\">X</a>
                <h1>" .$row['LName'] . ", " . $row['FName'] . "</h1>
                <p class=\"admin_event_desc\">" . $row['PhoneN'] . "</p>
            </div>";
}
$conn->close();
?>