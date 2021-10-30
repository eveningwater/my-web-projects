<?php
    // 引入公共连接
    include 'connect.php';
    // 响应头设置  
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    header('Content-Type:application/json'); 
    // 定义请求路径
    define('ROOT',dirname(__FILE__).'/');
    // 接受请求发来的字段
    $postData = file_get_contents('php://input');
    $myPost = json_decode($postData);
    $name = (string) $myPost -> name;
    $age = (int) $myPost -> age;
    if(!$name || $age === 0)return;
    // 执行sql语句
    $sql = "INSERT INTO students (name, age) VALUES ('$name','$age');";
    $result = mysqli_query($DATABASE_LINK,$sql);
    if(! $result ){
        die("无法插入数据".mysqli_error($DATABASE_LINK));
    };
    $resultSuccess = array('code' => 200,'msg' => "添加学生成功");
    echo json_encode($resultSuccess,JSON_UNESCAPED_UNICODE);
    // mysqli_free_result($result);
    mysqli_close($DATABASE_LINK);
?>