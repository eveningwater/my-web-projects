const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry:"./src/index.js",
    mode:"development",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"dist")
    },
    devtool:"cheap-module-source-map",
    devServer:{
        port:8081,
        hot:true
    },
    module:{
        rules:[
            {
                test:/\.js/,
                use:{
                    loader:"babel-loader"
                }   
            },
            {
                test:/\.css/,
                use:[MiniCssExtractPlugin.loader,"css-loader"]
            }
        ]
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              filename: 'vendor.js',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
            },
          }
        }
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template:"./index.html"
        })
    ]
}