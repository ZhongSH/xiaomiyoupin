<?php
    include 'conn.php';

    $user = isset($_POST['user']) ? $_POST['user'] : '';
    $gid = isset($_POST['gid']) ? $_POST['gid'] : '';

    $sql2 = "SELECT * FROM cart WHERE user = $user";

    $res2 = $conn->query($sql2);

    $sql3 = "SELECT * FROM cart WHERE user = $user and gid = $gid";

    $has = $res2->num_rows;

    if($has) {
        $content2 = $res2->fetch_all(MYSQLI_ASSOC);

        $res3 = $conn->query($sql3);
        $content3 = $res3->fetch_all(MYSQLI_ASSOC);
    
        $data = array(
            'cartlist' => $content2,
            'goodnum' => $content3,
        );
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    } else {
        echo 'no';
    }



?>