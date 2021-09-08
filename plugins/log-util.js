const consoleUtil = (url,char = "#",gap = 10) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
        draw();
    }
    // 把图片绘制到canvas里
    const draw = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, img.width, img.height)
        // 获取像素数据
        const imgData = ctx.getImageData(0, 0, img.width, img.height).data
        // 拼接字符
        join(imgData)
    }
    // 把像素数据拼接成字符
    const join = (data) => {
        let str = "";
        for (let h = 0; h < img.height; h += gap) {
            str += '\n'
            for (let w = 0; w < img.width; w += gap) {
                str += ' ' // 因为字符的高度普遍都比其宽度大，所以额外添加一个空字符平衡一下，否则最终的图形会感觉被拉高了
                let pos = (h * img.width + w) * 4
                let r = data[pos]
                let g = data[pos + 1]
                let b = data[pos + 2]
                // rgb转换成yuv格式，根据y（亮度）来判断显示什么字符
                let y = r * 0.299 + g * 0.578 + b * 0.114
                if (y >= 190) {
                    // 浅色
                    str += ' ';
                } else {
                    // 深色
                    str += char;
                }
            }
        }
        console.log(str);
    }
}