<?php
    include 'conn.php';

    $val = isset($_GET['val']) ? $_GET['val'] : '';

    if($val){
        $sql = "SELECT * FROM goods WHERE name like $val";
    }else{
        $sql = "SELECT * FROM goods";
    }


    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'goodslist' => $content,
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>