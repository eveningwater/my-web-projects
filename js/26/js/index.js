//页面加载时调用封装函数
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.open("get","data/data.json",true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            const data = JSON.parse(xhr.responseText);
            new Gallery({ data });
        }
    }
}