<?php

$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);
$sql = "select EID, EName, weekday, start_time, end_time, color
        from events
        order by start_time, weekday";
    
$result = mysqli_query($conn, $sql);
$counter = 7;
$timer = "";
$msg = "";
while($row = mysqli_fetch_assoc($result)){
    
    #if the time is new
    if($timer != $row['start_time']){
        #finish off the last row
        for(;$counter < 7; $counter++){$msg .= "<th></th>";}
        if($msg != "")
            $msg .= "</tr>";
        $counter = 0; 
        #start the new row up to the event weekday
        $msg .= "<tr class=\"dates\">";
        for(;$counter < $row['weekday']; $counter++){$msg .= "<th></th>";}
        #insert the new event into calendar
        $msg .= "<th onClick = \"getClasses(" . $row['EID'] . ")\" class=\"eventColumn\" style=\" background-color: #" . $row['color'] . "\">
                    <h1 class=\"calendar_event_name\">" . $row['EName'] . "</h1>
                    <p class=\"calendar_event_time\">" . date("g:i A - ", strtotime($row['start_time'])) . date("g:i A", strtotime($row['end_time'])) . "</p></th>";
        $timer = $row['start_time'];
        $counter++;
    }
    #else if the timer is the same as the last time
    else{
        #fill in gaps between the two events
        for(;$counter < $row['weekday']; $counter++){$msg.="<th></th>";}
        #insert the new event into calendar
        $msg .= "<th onClick = \"getClasses(" . $row['EID'] . ")\" class=\"eventColumn\" style=\" background-color: #" . $row['color'] . "\">
                    <h1 class=\"calendar_event_name\">" . $row['EName'] . "</h1>
                    <p class=\"calendar_event_time\">" . date("g:i A - ", strtotime($row['start_time'])) . date("g:i A", strtotime($row['end_time'])) . "</p></th>";
        $timer = $row['start_time'];
        $counter++;
    }
}

for(;$counter < 7; $counter++){$msg .= "<th></th>";}
$msg .= "</tr>";
echo $msg;
?>








