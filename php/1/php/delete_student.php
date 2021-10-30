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
    // 执行sql语句
    $sql = "DELETE FROM students where id = ";
    $mutSql = "";
    $len = count($myPost);
    for($i = 0;$i < $len;$i++){
        $mutSql .= $sql.$myPost[$i].';';
    };
    $result = mysqli_multi_query($DATABASE_LINK,$mutSql);
    if(! $result ){
        die("无法删除数据".mysqli_error($DATABASE_LINK));
        exit();
    };
    $resultSuccess = array('code' => 200,'msg' => "删除成功");
    $res_success = json_encode($resultSuccess,JSON_UNESCAPED_UNICODE);
    echo $res_success;
    // mysqli_free_result($result);
    mysqli_close($DATABASE_LINK);
?>