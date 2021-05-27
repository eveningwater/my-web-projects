const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const app = express();

// 新闻列表
const newsList = require("./mock/news-list.json");
// 新闻分类
const newsTitle = require("./mock/news-tab.json");
// webpack配置对象
const config = require('./webpack.config');
// webpack编译方法
const compiler = webpack(config);

// https://github.com/webpack/webpack-dev-middleware
app.use(webpackDevMiddleware(compiler,{
    publicPath:config.output.publicPath
}))

const requestHandler = () => {
    // 随机请求时间
    const getRandomTime = (time = 1000) => Math.floor(Math.random() * time);

    const router = express.Router();

    // 请求token,token值随便定义的
    router.get("/token",(req,res) => {
        setTimeout(() => {
            res.send({
                token:"123"
            })
        },getRandomTime(600));
    })
    // 请求新闻标题
    router.get("/tabs",(req,res) => {
        setTimeout(() => {
            res.send(newsTitle);
        },getRandomTime(800))
    })
    // 请求新闻列表
    router.get("/news",(req,res) => {
        setTimeout(() => {
            res.send(newsList);
        },getRandomTime())
    })
    return router;
}

// token 验证
app.use("/api",(req,res,next) => {
    if(req.path === '/token' || req.headers.token === "123"){
        next();
    }else{
        next("invalid token");
    }
});
// 请求接口
app.use("/api",requestHandler());

// 应用启动,端口号为3000,访问地址即http://localhost:3000
app.listen(3000,() => {
    console.log('Example app listening on port 3000!\n');
})

