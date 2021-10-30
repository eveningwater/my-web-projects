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
    $id =  (int) $myPost -> id;
    $name = (string) $myPost -> name;
    $age =  (int) $myPost -> age;
    // 执行sql语句
    $sql = "UPDATE students SET name='$name',age='$age' WHERE id = '$id'";
    $result = mysqli_query($DATABASE_LINK,$sql);
    if(! $result ){
        die("无法更改数据".mysqli_error($DATABASE_LINK));
        exit();
    };
    $resultSuccess = array('code' => 200,'msg' => "更改成功");
    $res_success = json_encode($resultSuccess,JSON_UNESCAPED_UNICODE);
    echo $res_success;
    // mysqli_free_result($result);
    mysqli_close($DATABASE_LINK);
?>