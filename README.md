[English](./README_en.md) | [简体中文](./README.md)

### 介绍

本项目原生`js`实现的`web`项目前`20`个`demo`参考了[vanilla-web-projects](https://github.com/bradtraversy/vanillawebprojects)所实现的中文版，虽然很多代码借鉴了原项目，但也不同于原项目，因为逻辑代码完全不一致，而且每一个项目也做了相应的扩展，后续的项目为自己平时积累所写。

> angular 目录:主要使用 angular.js 完成的示例

> animate 目录:主要使用一些动画库完成的示例。

> CSS 目录:主要使用简单的 HTML 和 CSS 完成的示例。

> echarts 目录:主要使用 echarts 完成的可视化图表示例。

> JQuery 目录:主要使用 jQuery 完成的示例。

> js 目录:主要使用 HTML,CSS,JavaScript 完成的示例。

> React 目录:主要使用 React.js 完成的示例。

> threejs 目录:主要使用 three.js 完成的示例[内含一个 easy AR API 完成的 AR 示例]。

> vue 目录:主要使用 vue.js 完成的示例。

> typescript 目录:主要使用 typescript 完成的示例。

> home 目录:本项目的官网，使用 vuepress 搭建。

> website 目录:个人响应式网站。

> php 目录:使用 php 和前端完成的示例。

> plugins 目录:通过 JavaScript 编写的插件集合。

> searchError 目录:一些错误的 html。

> scripts 目录:一些用于运行的脚本文件集合。

> utils 目录:一些工具函数。

> gh-pages 目录:官网，个人网站以及 50 个示例网站的源代码（部署）。

> other 目录:其它的一些觉得有用的资料。

如果觉得本项目帮助到您学习，还望不吝啬 star。

> 温馨提示:所有项目 demo 仅供学习，不得用于商业用途，违者必究。

- [在线访问地址](https://www.eveningwater.com/my-web-projects/home/)。
- [在线查询代码错误](https://www.eveningwater.com/my-web-projects/searchError.html)。

### 如何运行

#### gh-pages 目录

```shell
npm install // yarn install 或者 pnpm install
npm run dev
```

#### website 目录

```shell
npm run start //或者yarn start 或者 pnpm start
```

#### 1.home 目录，即文档目录。

```shell
npm run home
```

打包:

```shell
npm run home:build
```

#### 2.animate 示例目录。

运行哪一个示例，就携带哪一个参数。如运行第一个示例，目录名为 1。则运行命令如下:

```shell
npm run animate 1 //或者yarn run animate 1
```

#### 3.CSS 目录

原理同 animate 目录

```shell
npm run css 1  //或者yarn run css 1
```

#### 4.jQuery 目录

原理同上。

```shell
npm run jQuery 1 //或者yarn run jQuery 1
```

#### 5.js 目录

原理同上。

```shell
npm run js 1 //或者yarn js 1 (run可省略可不省略)
```

#### 6.react 目录

react 目录有些不一样，如果执行第一个目录，则同上。

```shell
npm run react 1 //或者yarn react 1
```

如果是第 2 个目录，则需要安装依赖:

```shell
cd react/2
yarn install
npm run react 2 start //本地运行
npm run react 2 build //打包命令
```

如果是第 3 个目录，如果是以下命令:

```shell
npm run react 3 //无需下载依赖
```

如果是以下命令,也就是说命令行传了第二个参数:

```shell
npm run react dev/build/watch //需要先安装依赖,即执行命令yarn install/npm install/cnpm install
```

后续目录依次原理类推（由项目目录构建决定，如采用 webpack 则需要注意 webpack 相关的命令）。

#### 7.vue 目录

第 1 到第 5 个示例命令执行如下:

```shell
npm run vue 1 //或者yarn vue 1,这里的1指的就是目录名
```

#### 8.threejs 目录

原理同 animate 目录

```shell
npm run threejs 1 //或者yarn threejs 1
```

#### 9.typescript 目录

需要先安装依赖，然后再执行命令，比如要运行第一个项目，命令如下:

```shell
yarn install //第一步安装依赖
npm run typescript 1 dev/build
```

第二个示例同第一个示例。

> 注意:需要安装 git 客户端，在 git-bash 中运行，如果有配置环境变量，则无需在 git-bash 中运行。当然,home 目录除外。

### 友情链接

- [首页](/)
- [个人网站](https://www.eveningwater.com)
- [ewColorPicker](https://eveningwater.github.io/ew-color-picker/)
- [门素材](https://www.17sucai.com/user/800544)
- [掘金](https://juejin.cn/user/4054654613988718)
- [思否](https://segmentfault.com/u/xishui_5ac9a340a5484)
- [知乎](https://www.zhihu.com/people/eveningwater)
- [stackoverflow](https://stackoverflow.com/users/10505577/eveningwater)
- [我的博客](https://www.cnblogs.com/eveningwater/)
- [我的博客](https://eveningwater.github.io/#/)
- [code-segment](https://eveningwater.github.io/code-segment/#/)
- [github](https://github.com/eveningwater/my-web-projects)
- [码云](https://gitee.com/eveningwater)
