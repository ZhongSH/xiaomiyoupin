<?php
    include 'conn.php';
    
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';

    $sql = "SELECT * FROM user WHERE user = '$name' AND psw = '$psw'";

    $res = $conn->query($sql);

    if($res->num_rows){
        echo 'yes';
    }else{
        echo 'no';
    }

    $res->close();
	$conn->close();
?>