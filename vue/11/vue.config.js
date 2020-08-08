const webpack = require('webpack');
module.exports = {
    lintOnSave:false,
    publicPath:"./",
    configureWebpack: {
        plugins: [
           new webpack.ProvidePlugin({
             $:"jquery",
             jQuery:"jquery",
             "windows.jQuery":"jquery"
           })
         ]
     }
}