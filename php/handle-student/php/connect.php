<?php
    // 设置跨域
    header('Access-Control-Allow-Origin:*');
    // 设置请求头
    header('content-type:text/json;charset=UTF-8');
    // 连接数据库IP地址
    $HOST = "localhost:3306";
    $USERNAME = "";//修改为你自己的用户名
    $PASSWORD = "";//修改为你自己的密码
    // 访问数据库名
    $DATABASE_NAME = ""; //修改为你自己的数据库名
    // 创建一个连接
    $DATABASE_LINK = mysqli_connect($HOST,$USERNAME,$PASSWORD,$DATABASE_NAME);
    // 如果连接失败
    if($DATABASE_LINK -> connect_errno){
        // 打印错误信息
        print "连接".$DATABASE_NAME."数据库失败".$DATABASE_LINK -> connect_error;
        exit();
    }else{
        // print "连接数据库".$DATABASE_NAME."成功";
    }
    // 设置编码
    mysqli_query($DATABASE_LINK,"set names utf8");
?>
