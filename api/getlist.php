<?php
    include 'conn.php';

    $val = isset($_GET['val']) ? $_GET['val'] : '';
    $page = isset($_GET['page']) ? $_GET['page'] : '1';//第几页
	$num = isset($_GET['num']) ? $_GET['num'] : '8';//每页

    $index = ($page - 1) * $num;

    if($val){
        $sql = "SELECT * FROM goods WHERE name like $val LIMIT $index,$num";
    }else{
        $sql = "SELECT * FROM goods LIMIT $index,$num";
    }

    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    $sql2 = 'SELECT * FROM goods';
	
	//执行语句
	$res2 = $conn->query($sql2);


    $data = array(
		'total' => $res2->num_rows,//总条数
		'goodslist' => $content,
		'page' => $page,
		'num' => $num
    );

    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>