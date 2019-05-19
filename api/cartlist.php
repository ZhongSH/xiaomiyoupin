<?php
    include 'conn.php';

    $user = isset($_POST['user']) ? $_POST['user'] : '';

    $sql2 = "SELECT * FROM cart WHERE user = $user";

    $res2 = $conn->query($sql2);

    $content2 = $res2->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'cartlist' => $content2,
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>