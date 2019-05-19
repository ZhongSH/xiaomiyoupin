<?php
    include 'conn.php';

    $cid = isset($_POST['cid']) ? $_POST['cid'] : '';
    $num = isset($_POST['num']) ? $_POST['num'] : '';

    $sql = "UPDATE cart SET gnum = $num WHERE cid = $cid";

    $res = $conn->query($sql);

?>