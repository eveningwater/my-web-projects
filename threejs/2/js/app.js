//             别间隔时间(毫秒), 识别服务地址, 认证token
const webAR = new WebAR(1000, 'https://cn1-crs.easyar.com:8443/search', '7x8TzZcm9uVrbzYRIDUiiYqhesaayuUowiTgAa/XmNZ1T8VVMk8ED+sukOhf5O9gZOYYmF7E6SUmX9gxXZnh9A==');
// Threejs简单使用类
const threeHelper = new ThreeHelper();
let flag_start = false;
let flag_stop = false;
// 开启识别
document.querySelector('#start').addEventListener('click', () => {
    if(!flag_start){
        webAR.startRecognize((msg) => {
            // console.info(msg);
            // 可以将 setting 作为meta上传到EasyAR的云识别，使用方法如下
            // const setting = JSON.parse(window.atob(msg.target.meta));
            const setting = {
                model: 'model/trex_v3.fbx',
                scale: 0.02,
                position: [0, 0, 0]
            };
            threeHelper.loadObject(setting);
        });
        flag_start = true;
    }else{
        $message.error('请不要重复点击识别!');
    }
}, false);
// 暂停识别
document.querySelector('#stop').addEventListener('click', () => {
    if(!flag_stop){
        webAR.stopRecognize();
        flag_stop = true;
    }else{
        $message.error('请不要重复点击暂停识别!');
    }
}, false);
//# sourceMappingURL=app.js.map
window.onload = function () {
    let cameras = ["user", "environment"];
    webAR.initVideo();
    webAR.initCanvas();
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
        webAR.openCamera({ audio: false, video: { facingMode: { exact: 'environment' } } }).then(msg => {
            // console.info('信息',msg);
        }).catch(err => {
            // console.info('错误信息',err);
        });
    } else {
        let cameraParams = [];
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            let index = 0;
            devices.find((device) => {
                let camera = null;
                if (device.kind === 'videoinput') {
                    // 在iOS12.2上deviceId为空
                    if (device.deviceId == '') {
                        camera = { audio: false, video: { facingMode: { exact: cameras[index] } } };
                        index++;
                    }
                    else {
                        camera = { audio: false, video: { deviceId: { exact: device.deviceId } } };
                    }
                }
                if(camera){
                    cameraParams.push(camera);
                }
                return false;
            });
            console.log(cameraParams[0])
            webAR.openCamera(cameraParams[0]).then(msg => {
                // console.info('信息',msg);
            }).catch(err => {
                // console.info('错误信息',err);
            });
        });
    }
}