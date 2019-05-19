<?php
    include 'conn.php';
    
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $psw = isset($_POST['psw']) ? $_POST['psw'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';


    $sql = "INSERT INTO user(user,psw,phone) VALUES('$name','$psw','$phone')";

    $res = $conn->query($sql);

    if ($res) {
        echo 'yes';
    } else {
        echo 'no';
    }
?>