<?php
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "select * from events
        order by weekday, start_time";
$weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($result)){
    echo "<div class=\"event_container\" style=\"background-color: #" . $row['color'] . "\">
                <a class=\"remove_button\" onClick=\"removeEvent(" . $row['EID'] . ")\">X</a>
                <h1>" .$row['EName'] . "</h1>
                <p class=\"admin_event_desc\">" . $row['descr'] . "</p>
                <p class=\"admin_event_desc\">" . $weekdays[$row['weekday']] . ", " . date("g:i A - ", strtotime($row['start_time'])) . date("g:i A", strtotime($row['end_time'])) . "
                <span class=\"edit_btn\" onClick=\"alterEvent(" . $row['EID'] . ")\">&#9999;</span>
                <a class=\"expand_button\" onClick=\"showClasses(" . $row['EID'] . ")\">Classes</a>
            </div>";
}
$conn->close();
?>