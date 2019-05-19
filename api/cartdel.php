<?php
    include 'conn.php';

    $cid = isset($_POST['cid']) ? $_POST['cid'] : '';

    $sql2 = "DELETE FROM cart WHERE cid = $cid";

    $res2 = $conn->query($sql2);

?>