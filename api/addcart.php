<?php
    include 'conn.php';

    $gid = isset($_POST['gid']) ? $_POST['gid'] : '';
    $gname = isset($_POST['gname']) ? $_POST['gname'] : '';
    $gprice = isset($_POST['gprice']) ? $_POST['gprice'] : '';
    $gnum = isset($_POST['gnum']) ? $_POST['gnum'] : '';
    $gimg = isset($_POST['gimg']) ? $_POST['gimg'] : '';
    $user = isset($_POST['user']) ? $_POST['user'] : '';
    $has = isset($_POST['has']) ? $_POST['has'] : '';

    if($has){
        $sql = "UPDATE cart SET gnum = ($has + $gnum) WHERE gid = $gid";
    }else{
        $sql = "INSERT INTO cart(gid,gname,gprice,gnum,gimg,user) VALUES('$gid','$gname','$gprice','$gnum','$gimg','$user')";
    }


    $res = $conn->query($sql);

    $sql2 = "SELECT * FROM cart WHERE user = $user and gid = $gid";

    $res2 = $conn->query($sql2);
    $content2 = $res2->fetch_all(MYSQLI_ASSOC);

    echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>