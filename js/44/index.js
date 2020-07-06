function concatImage(e) {
    function a(i) {
        if (g > i) {
            var c = new Image;
            c.src = dataImage[i], c.onload = function () {
                n.drawImage(c, 0, 0, 300, 300), a(i + 1)
            }
        } else base64.push(t.toDataURL("image/jpg", .9)), e()
    }
    var t = document.createElement("canvas"),
        n = t.getContext("2d"),
        g = dataImage.length;
    t.width = 300, t.height = 300, n.rect(0, 0, t.width, t.height), n.fillStyle = "#fff", n.fill(), a(0)
}
var dataImage = ["./images/img1.png", "./images/img2.png", "./images/img3.png", "./images/img4.png"],
    base64 = [];
document.getElementById("concatBtn").onclick = function () {
    concatImage(function () {
        document.getElementById("concat").innerHTML = '<p>可以鼠标右键看看是否是图片</p><img src ="' + base64[0] +
            '" alt="图片加载中">'
    })
};