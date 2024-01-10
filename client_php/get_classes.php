<?php
$d = $_GET['q'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);
$sql = "select EName, descr
        from events where EID =" . $d;

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
echo "<h1 class=\"title\">" . $row['EName'] . "</h1><p>" . $row['descr'] . "</p>";
$sql = "select cd.dt as class_date, 
        cd.partN as part_num, 
        count(pl.CID) as reg_num,
        cd.CID as CID
        from (select cl.dt, ev.partN, cl.CID from classes cl
                left join events ev
                using (EID) where EID = " . $d . " AND dt >= curdate() AND dt <= date_add(curdate(), INTERVAL 31 DAY)) as cd
                    left join participants pl
                    on cd.CID = pl.CID
                    group by cd.CID
                    ORDER BY cd.dt;";
    
$result = mysqli_query($conn, $sql);
while($row = mysqli_fetch_assoc($result)){
    echo "<div class=\"event\">
            <h1 class=\"event_title\"> " . date("F, d", strtotime($row['class_date'])) .  "</h1>
            <div class=\"open_seats\">";
    if($row['reg_num'] >= $row['part_num'])
        echo "<p class=\"seat_count\">Class Full!</p></div></div>";
    
    else 
        echo "<p class=\"seat_count\">" . ($row['part_num'] - $row['reg_num']) . " spots left!</p>
                <a class=\"nav_button_2\" style=\"padding: 0\" onClick=\"enrollMember(" . $row['CID'] . ", " . $d . ", 0)\">Enroll Now</a>
            </div></div>";
}
?>