const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:"development",//开发模式
    entry:{
        app:"./src/app.js"
    },//入口
    devServer:{
        contentBase:"./dist"
    },//本地服务器
    plugins:[
        new HtmlWebpackPlugin({
            title:"ES6-News-Project"
        })
    ],//插件
    output:{
        filename:"index.min.js",//输出文件名
        path:path.resolve(__dirname,"dist"),//输出目录
        clean:true,//打包是否清除缓存目录
        publicPath:"/" //输出路径
    },//出口
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader'],
                exclude:/node_modules/
            }
        ]
    } //模块
}