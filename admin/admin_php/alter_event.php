<?php
$EID = $_GET['q'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "select EName, descr, partN, weekday, start_time, end_time, color
        from events
        where EID = " . $EID;
    
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$week = $row['weekday'];
$msg = "<form class=\"formField\" id=\"alterForm\" action=\"admin_php/alter_event_submit.php\" method=\"post\" target=\"hidden-form\"><h1>Changing Event</h1><label for=\"EName\">Enter Event Title:</label><input type=\"text\" class=\"form-control\" id=\"EName\" name=\"EName\" placeholder=\"Enter title...\" value = \"" . $row['EName'] . "\" required><label for=\"descr\">Enter event description:</label><textarea class=\"form-control\" id=\"descr\" name=\"descr\" placeholder=\"Enter a description of the event...\" cols=\"40\" rows=\"5\" required>" . $row['descr'] . "</textarea><label for=\"partN\">Enter class size:</label><input type=\"number\" class=\"form-control\" id=\"partN\" name=\"partN\" value=\"" . $row['partN'] . "\"required><label for=\"start_time\">Start Time:</label><input type=\"time\" class=\"form-control\" id=\"start_time\" name=\"start_time\" value=\"" . $row['start_time'] . "\" required><label for=\"end_time\">End Time:</label><input type=\"time\" class=\"form-control\" id=\"end_time\" name=\"end_time\" value=\"" . $row['end_time'] . "\" required><label for=\"weekday\">Choose a weekday:</label><select id=\"weekday\" name=\"weekday\"><option value=0";
if($week == 0)
    $msg .= " selected>Sunday</option><option value=1>Monday</option><option value=2>Tuesday</option><option value=3>Wednesday</option><option value=4>Thursday</option><option value=5>Friday</option><option value=6";
else if($week == 1)
    $msg .= ">Sunday</option><option value=1 selected>Monday</option><option value=2>Tuesday</option><option value=3>Wednesday</option><option value=4>Thursday</option><option value=5>Friday</option><option value=6";
else if($week == 2)
    $msg .= ">Sunday</option><option value=1>Monday</option><option value=2 selected>Tuesday</option><option value=3>Wednesday</option><option value=4>Thursday</option><option value=5>Friday</option><option value=6";
else if($week == 3)
    $msg .= ">Sunday</option><option value=1>Monday</option><option value=2>Tuesday</option><option value=3 selected>Wednesday</option><option value=4>Thursday</option><option value=5>Friday</option><option value=6";
else if($week == 4)
    $msg .= ">Sunday</option><option value=1>Monday</option><option value=2>Tuesday</option><option value=3>Wednesday</option><option value=4 selected>Thursday</option><option value=5>Friday</option><option value=6";
else if($week == 5)
    $msg .= ">Sunday</option><option value=1>Monday</option><option value=2>Tuesday</option><option value=3>Wednesday</option><option value=4>Thursday</option><option value=5 selected>Friday</option><option value=6";
else
    $msg .= ">Sunday</option><option value=1>Monday</option><option value=2>Tuesday</option><option value=3>Wednesday</option><option value=4>Thursday</option><option value=5>Friday</option><option value=6 selected";

$msg .= ">Saturday</option></select><label for=\"color\">Enter Background Color:</label><input type=\"color\" class=\"form-control\" id=\"color\" name=\"color\" value=\"#" . $row['color'] . "\" required><input type=\"hidden\" id=\"EID\" name=\"EID\" value=\"" . $EID . "\"><a class=\"nav_button\" onClick=\"alterEventSubmit()\">Submit</a></form><iframe style=\"display:none\" name=\"hidden-form\"></iframe>";

echo $msg;
$conn -> close();
?>