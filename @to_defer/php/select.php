<?php
$servername = "127.0.0.1";
$username = "test";
$password = "test";
$dbname = "test_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// ---------------------------------------
$sql = "insert into `t_test` (`memo`) values ('memooooo')";
echo $sql;
echo "\n";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// -----------------------------------
$sql = "SELECT * FROM t_test";
$result = $conn->query($sql);

echo $sql;
echo "\n";

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "seq: " . $row["seq"] . "memo: " . $row["memo"];
		echo "\n";
    }
} else {
    echo "0 results";
}


// ----------------------------
$conn->close();
?>
