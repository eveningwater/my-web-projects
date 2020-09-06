const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "build.js"
    },
    devtool: 'inline-source-map',
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(jsx?|babel|es6|js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}