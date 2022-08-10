[English](./README_en.md) | [简体中文](./README.md)

### 介绍

本项目原生`js`实现的`web`项目前`20`个`demo`参考了[vanilla-web-projects](https://github.com/bradtraversy/vanillawebprojects)所实现的中文版，虽然很多代码借鉴了原项目，但也不同于原项目，因为逻辑代码完全不一致，而且每一个项目也做了相应的扩展，后续的项目为自己平时积累所写。

> angular目录:主要使用angular.js完成的示例

> animate目录:主要使用一些动画库完成的示例。

> CSS目录:主要使用简单的HTML和CSS完成的示例。

> echarts目录:主要使用echarts完成的可视化图表示例。

> JQuery目录:主要使用jQuery完成的示例。

> js目录:主要使用HTML,CSS,JavaScript完成的示例。

> React目录:主要使用React.js完成的示例。

> threejs目录:主要使用three.js完成的示例[内含一个easy AR API完成的AR示例]。

> vue目录:主要使用vue.js完成的示例。

> typescript目录:主要使用typescript完成的示例。

> home目录:本项目的官网，使用vuepress搭建。

> website目录:个人响应式网站。

> php目录:使用php和前端完成的示例。

> plugins目录:通过JavaScript编写的插件集合。

> searchError目录:一些错误的html。

> scripts目录:一些用于运行的脚本文件集合。

> utils目录:一些工具函数。

> gh-pages目录:官网，个人网站以及50个示例网站的源代码（部署）。

> other目录:其它的一些觉得有用的资料。

如果觉得本项目帮助到您学习，还望不吝啬 star。

> 温馨提示:所有项目 demo 仅供学习，不得用于商业用途，违者必究。

* [在线访问地址](https://www.eveningwater.com/my-web-projects/home/)。
* [在线百度查询代码错误](https://www.eveningwater.com/my-web-projects/error-baidu.html)。
* [在线谷歌查询代码错误](https://www.eveningwater.com/my-web-projects/error-google.html)。

### 如何运行

#### gh-pages目录

```shell
npm install // yarn install 或者 pnpm install
npm run dev
```

#### website目录

```shell
npm run start //或者yarn start 或者 pnpm start
```

#### 1.home目录，即文档目录。

```shell
npm run home
```

打包:

```shell
npm run home:build
```
#### 2.animate示例目录。

运行哪一个示例，就携带哪一个参数。如运行第一个示例，目录名为1。则运行命令如下:

```shell
npm run animate 1 //或者yarn run animate 1
```

#### 3.CSS目录

原理同animate目录

```shell
npm run css 1  //或者yarn run css 1
```

#### 4.jQuery目录

原理同上。

```shell
npm run jQuery 1 //或者yarn run jQuery 1
```

#### 5.js目录

原理同上。

```shell
npm run js 1 //或者yarn js 1 (run可省略可不省略)
```

#### 6.react目录

react目录有些不一样，如果执行第一个目录，则同上。

```shell
npm run react 1 //或者yarn react 1
```

如果是第2个目录，则需要安装依赖:

```shell
cd react/2
yarn install
npm run react 2 start //本地运行
npm run react 2 build //打包命令
```

如果是第3个目录，如果是以下命令:

```shell
npm run react 3 //无需下载依赖
```
如果是以下命令,也就是说命令行传了第二个参数:

```shell
npm run react dev/build/watch //需要先安装依赖,即执行命令yarn install/npm install/cnpm install
```

后续目录依次原理类推（由项目目录构建决定，如采用webpack则需要注意 webpack相关的命令）。

#### 7.vue目录

第1到第5个示例命令执行如下:

```shell
npm run vue 1 //或者yarn vue 1,这里的1指的就是目录名
```

#### 8.threejs目录

原理同animate目录

```shell
npm run threejs 1 //或者yarn threejs 1
```

#### 9.typescript目录

需要先安装依赖，然后再执行命令，比如要运行第一个项目，命令如下:

```shell
yarn install //第一步安装依赖
npm run typescript 1 dev/build
```

第二个示例同第一个示例。

> 注意:需要安装git客户端，在git-bash中运行，如果有配置环境变量，则无需在git-bash中运行。当然,home目录除外。

### 友情链接

* [首页](/)
* [个人网站](https://www.eveningwater.com)
* [ewColorPicker](https://eveningwater.github.io/ew-color-picker/)
* [门素材](https://www.17sucai.com/user/800544)
* [掘金](https://juejin.cn/user/4054654613988718)
* [思否](https://segmentfault.com/u/xishui_5ac9a340a5484)
* [知乎](https://www.zhihu.com/people/eveningwater)
* [stackoverflow](https://stackoverflow.com/users/10505577/eveningwater)
* [我的博客](https://www.cnblogs.com/eveningwater/)
* [我的博客](https://eveningwater.github.io/#/)
* [code-segment](https://eveningwater.github.io/code-segment/#/)
* [github](https://github.com/eveningwater/my-web-projects)
* [码云](https://gitee.com/eveningwater)
