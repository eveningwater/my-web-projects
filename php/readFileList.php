<?php
    // 允许跨域
    header("Access-Control-Allow-Origin:*");
    function getAllFiles($path,&$files){
        if(is_dir($path)){
            $dp = dir($path);
            while($file = $dp -> read()){
                if($file !== "." && $file !== ".."){
                    getAllFiles($path."/".$file,$files);
                }
            }
            $dp -> close();
        }
        if(is_file($path)){
            $files[] = $path;
        }
    }
    function getFileNameByDir($dir){
        $files = array();
        getAllFiles($dir,$files);
        return $files;
    }
    // local
    // $fileNames = getFileNameByDir("./images");
    // online
    //与文件接口所处路径保持一致，比如文件接口在当前目录下,当前目录下有img文件夹，存储着图片文件，就是./img,使用相对路径
    $fileNames = getFileNameByDir("./img");
    $fileURL = "https://www.eveningwater.com/my-web-projects/js/26/";
    $newFileNames = array();
    foreach($fileNames as $value){
        array_push($newFileNames,array(
            "name" => substr_replace($value,$fileURL,0,strlen("./")),
            "caption" => substr($value,strrpos($value,"/") + 1,-4),
            "id" => (int) substr($value,strrpos($value,"/") + 1,-4)
        ));
    }
    usort($newFileNames, function ($item1, $item2) {
        if ($item1['id'] == $item2['id']) return 0;
        return $item1['id'] < $item2['id'] ? -1 : 1;
    });
    $response_data = array('code' => 200,'msg' => "获取图片列表成功!",'data' => $newFileNames);
    echo json_encode($response_data,JSON_UNESCAPED_UNICODE);
?>