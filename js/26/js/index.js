//页面加载时调用封装函数
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.open("get","https://www.eveningwater.com/my-web-projects/js/26/readFileList.php",true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            const res = JSON.parse(xhr.responseText);
            if(res.code === 200){
                const { data } = res;
                new Gallery({ data });
            }
        }
    }
}