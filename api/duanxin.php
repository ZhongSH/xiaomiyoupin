<?php
    header("content-type:text/html;charset=utf-8");

    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $num = rand(100000,999999);

    $url = "http://v.juhe.cn/sms/send";
    $params = array(
        'key'   => 'a32fa9a01d91c155a3c5556c318867fc', //您申请的APPKEY
        'mobile'    => $phone, //接受短信的用户手机号码
        'tpl_id'    => '158689', //您申请的短信模板ID，根据实际情况修改
        'tpl_value' =>'#code#='.$num.'&#company#=聚合数据' //您设置的模板变量，根据实际情况修改
    );

    $paramstring = http_build_query($params);
    $content = juheCurl($url, $paramstring);
    $result = json_decode($content, true);
    if ($result) {
	    $datalist = array(
            'phonecode' => $num,
            'message' => $result
        );
         echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
    } else {
        //请求异常
    }

    /**
     * 请求接口返回内容
     * @param  string $url [请求的URL地址]
     * @param  string $params [请求的参数]
     * @param  int $ipost [是否采用POST形式]
     * @return  string
     */
    function juheCurl($url, $params = false, $ispost = 0)
    {
        $httpInfo = array();
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_USERAGENT, 'JuheData');
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        if ($ispost) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
            curl_setopt($ch, CURLOPT_URL, $url);
        } else {
            if ($params) {
                curl_setopt($ch, CURLOPT_URL, $url.'?'.$params);
            } else {
                curl_setopt($ch, CURLOPT_URL, $url);
            }
        }
        $response = curl_exec($ch);
        if ($response === FALSE) {
            //echo "cURL Error: " . curl_error($ch);
            return false;
        }
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $httpInfo = array_merge($httpInfo, curl_getinfo($ch));
        curl_close($ch);
        return $response;
    } 
?>