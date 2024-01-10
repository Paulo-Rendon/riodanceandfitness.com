<?php
$firstname = $_POST['FName'];
$lastname = $_POST['LName'];
$phonenum = $_POST['PhoneN'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);
$sql = "select EName as name, color, cp.dt as date, cp.start_time as sttm, cp.end_time as endtm, EID, cp.CID as CID
from events right join 
(select EID, dt, start_time, end_time, CID from classes 
join participants using (CID)
where PhoneN = \"" . $phonenum . "\" AND FName = \"" . $firstname . "\" AND LName = \"" . $lastname . "\" AND dt >= curdate()) as cp using (EID)
order by EID, cp.dt, cp.start_time";
    
$result = mysqli_query($conn, $sql);
$EID = 0;
while($row = mysqli_fetch_assoc($result)){
   if($EID != $row['EID']){
       echo "<h1 class=\"title\" style=\"color:#" . $row['color'] . "; margin-top: 5vh\">" . $row['name'] . "</h1>";
       $EID = $row['EID'];
   }
    echo "<div class=\"event\"><a class=\"remove_button\" onClick=\"removeParticipant(" . $row['CID'] . ", '" . $firstname . "', '" . $lastname . "', " . $phonenum . ")\">X</a>";
    echo "<p style=\"margin-top: 5vh\">" . date_format(date_create($row['date']), "D,  M/d/Y") . ", " . date("g:i A - ", strtotime($row['sttm'])) . date("g:i A", strtotime($row['endtm'])) ."</p></div>";
}
if(!$EID)
    echo "<p>You are currently not enrolled in any future classes</p>";
$conn->close();
?>