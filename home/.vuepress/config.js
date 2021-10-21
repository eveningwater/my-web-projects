const navZhConfig = require('./config/zh/navConfig.js');
const sidebarZhConfig = require('./config/zh/sidebarConfig.js');
const navEnConfig = require('./config/en/navConfig.js');
const sidebarEnConfig = require('./config/en/sidebarConfig.js');
module.exports = {
    dest: "./dist",
    base: "/my-web-projects/home/",
    head: [
        ['link', {
            rel: 'icon',
            href: '/logo.svg'
        }],
        [
            'script', {type: 'text/javascript', src: '/documentTitleScroll.js'}
        ]
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '我的个人项目',
            description: '这是我的个人项目的一个集合，涉及html,css,js,vue.js,react.js等多种前端技术，当然也有可能会涉及到后端技术。'
        },
        '/en/': {
            lang: 'en-US',
            title: 'my-web-projects',
            description: 'This is a collection of my personal projects, involving html, css, js, vue.js, react.js and other front-end technologies. Of course, back-end technologies may also be involved.'
        }
    },
    themeConfig: {
        smoothScroll: true,
        editLinks: true,
        repo:"eveningwater/my-web-projects",
        docsDir: 'home',
        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                ariaLabel: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: navZhConfig,
                sidebar:sidebarZhConfig
            },
            '/en/': {
                label: 'English',
                selectText: 'Languages',
                ariaLabel: 'Select language',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: navEnConfig,
                sidebar: sidebarEnConfig
            }
        }
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