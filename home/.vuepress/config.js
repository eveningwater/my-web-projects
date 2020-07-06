const navConfig = require('./config/navConfig.js')
const sidebarConfig = require('./config/sidebarConfig.js')

module.exports = {
    dest: "./dist",
    base: "/my-web-projects/",
    head: [
        ['link', {
            rel: 'icon',
            href: '/logo.svg'
        }]
    ],
    title: '我的个人项目', //网站的标题
    description: '这是我的个人项目的一个集合，涉及html,css,js,vue.js,react.js等多种前端技术，当然也有可能会涉及到后端技术。', //网站的描述
    themeConfig: {
        nav: navConfig,
        sidebar: sidebarConfig
    },
    plugins: {
        '@vuepress/medium-zoom': {
            selector: '#app img',
            // medium-zoom options here
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
                margin: 16
            }
        },
        '@vuepress/back-to-top': true
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': '/'
            }
        }
    }
}