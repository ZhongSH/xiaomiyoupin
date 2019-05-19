<?php
    include 'conn.php';

    $key = isset($_GET['key']) ? $_GET['key'] : '';

    $sql = "SELECT * FROM goods WHERE name like $key";

    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'goodslist' => $content,
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>