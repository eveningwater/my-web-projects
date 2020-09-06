module.exports = {
    title: '从零开始编写一个时间线组件',
    description: '从零开始编写一个时间线组件，从搭建开发环境到封装组件。',
    themeConfig: {
        displayAllHeaders: true, // 默认值：false
        sidebar: [
            {
                title: '详细过程',   // 必要的
                path: '/doc/1',
                children: [
                    {
                        title: "搭建开发环境",
                        collapsable: false, // 可选的, 默认值是 true,
                        sidebarDepth: 1,
                        path:"/doc/1"
                    },
                    {
                        title: "分析与创建时间线基本架构",
                        collapsable: false, // 可选的, 默认值是 true,
                        sidebarDepth: 1,
                        path:"/doc/2"
                    },
                    {
                        title: "编写时间线逻辑",
                        collapsable: false, // 可选的, 默认值是 true,
                        sidebarDepth: 1,
                        path:"/doc/3"
                    }
                ]
            },
        ]
    }
}