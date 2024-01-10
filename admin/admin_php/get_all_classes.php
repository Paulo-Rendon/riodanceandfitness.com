<?php
$EID = $_GET['q'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "select start_time, end_time
        from events where EID = " . $EID;
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
echo "<span class=\"add_button\" onClick=\"addClass(" . $EID . ", '" . $row['start_time'] . "', '" . $row['end_time'] . "')\">&plus;</span>";
echo "<span class=\"add_button\" onClick=\"autoFillPerson(" . $EID . ")\">AP</span>";
echo "<span class=\"add_button\" style=\"float: left\" onClick=\"fillClass(" . $EID . ", '" . $row['start_time'] . "', '" . $row['end_time'] . "')\">FILL</span>";

$sql = "select count(pl.CID) as reg_num,
        cd.CID as CID,
        cd.dt as dte
        from    (select cl.dt, cl.CID
                from classes cl where EID=" . $EID . ") as cd
                    left join participants pl
                    on cd.CID = pl.CID
                    group by cd.CID
        order by dte";

$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($result)){
    echo "<div class=\"event_container\">
                <a class=\"remove_button\" onClick=\"removeClass(" . $row['CID'] . ")\">X</a>
                <h1>" .$row['dte'] . "</h1>
                <p class=\"admin_event_desc\">" . $row['reg_num'] . " People Registered!</p>
                <a class=\"expand_button\" onClick=\"showParticipants(" . $row['CID'] . ", " . $EID . ")\">Participants!</a>
            </div>";
}
$conn->close();
?>