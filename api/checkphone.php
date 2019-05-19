<?php
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';

    include 'conn.php';

    $sql = "SELECT * FROM user WHERE phone = '$phone'";

    $res = $conn->query($sql);
    
    if($res->num_rows){
        echo 'no';
    }else{
        echo 'yes';
    }
?>