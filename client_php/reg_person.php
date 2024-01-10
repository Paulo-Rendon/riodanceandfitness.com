<?php
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$phonenumber = $_POST['phonenumber'];
$classid = $_POST['CID'];
$conn = new mysqli("localhost", "username", "password", "danceclass") or die("Connection Falied: %s\n". $conn -> error);

$sql = "select count(*) from participants where CID = " . $classid . " AND FName = \"" . $firstname . "\" AND LName = \"" . $lastname . "\" AND phoneN = \"" . $phonenumber . "\"";
    
$result = mysqli_query($conn, $sql);
$result = mysqli_fetch_assoc($result);
if ($result['count(*)'] > 0){
    echo 1;
    return;
}

$sqlCheck = "select  cd.partN as part_num, 
        count(pl.CID) as reg_num
        from (select ev.partN, cl.CID from classes cl
                left join events ev
                using (EID) where CID = " . $classid . ") as cd
                    left join participants pl
                    on cd.CID = pl.CID
                    group by cd.CID";

$result = mysqli_query($conn, $sqlCheck);
$result = mysqli_fetch_assoc($result);

if($result['reg_num'] >= $result['part_num']){
    echo 2;
    return;
}
    
$sqlinsert = "insert into participants(CID, FName, LName, PhoneN)
values(" . $classid . ", \"". $firstname . "\", \"" . $lastname . "\", \"" . $phonenumber . "\")";
$result = mysqli_query($conn, $sqlinsert);
$result = mysqli_query($conn, $sql);
$result = mysqli_fetch_assoc($result);
if($result['count(*)'] == 1)
    echo 0;
else
    echo 3;
?>