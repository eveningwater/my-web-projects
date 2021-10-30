<?php 
    include 'connect.php';
    header('Access-Control-Allow-Headers:x-requested-with,content-type');
    header('Content-Type:application/json'); 
    // 定义请求路径
    define('ROOT',dirname(__FILE__).'/');
    $param = !empty($_GET);
    $resultSuccess = array();
    $sql = "SELECT * FROM students";
    $result = mysqli_query($DATABASE_LINK,$sql);
    if(! $result ){
        die('无法读取学生信息列表');
    };
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($resultSuccess,array( 
                'id' => (int) $row['id'],
               'name' => $row['name'],
               'age' => (int) $row['age']
            ));
        };
    }
    
    echo json_encode(array('code' => 200,'msg' => "所有学生信息列表",'data' => $resultSuccess));
    mysqli_free_result($result);
    mysqli_close($DATABASE_LINK);
?>