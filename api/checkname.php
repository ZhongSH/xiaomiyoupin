<?php
    $name = isset($_POST['name']) ? $_POST['name'] : '';

    include 'conn.php';

    $sql = "SELECT * FROM user WHERE user = '$name'";

    $res = $conn->query($sql);
    
    if($res->num_rows){
        echo 'no';
    }else{
        echo 'yes';
    }
?>