const path = require('path');
module.exports = {
    entry:"./main.ts",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,"dist")
    },
    mode:"development",
    devServer:{
        port:8081,
        open:true
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                use:"ts-loader",
                exclude:/node_modules/
            },
            {

                test:/\.less?$/,
                use:["style-loader","css-loader","less-loader"],
                exclude:/node_modules/
            }
        ]
    },
    resolve:{
        extensions:[".ts",".js"]
    }
}