
[English](./README_en.md) | [简体中文](./README.md)

### Introduction

The first 20` demos of the `web` project implemented by the native `js` of this project refer to the Chinese version implemented by [vanilla-web-projects](https://github.com/bradtraversy/vanillawebprojects), although many The code draws on the original project, but it is also different from the original project, because the logic code is completely inconsistent, and each project has been expanded accordingly, and subsequent projects are written for their usual accumulation.

> animate directory: mainly use some examples completed by animation library.

> CSS Catalog: Mainly use simple HTML and CSS to complete the examples.

> echarts directory: mainly use the visualization chart examples completed by echarts.

> JQuery catalog: Examples mainly completed with jQuery.

> js directory: mainly use HTML, CSS, JavaScript to complete the example.

> React Catalog: Examples are mainly completed using React.js.

> threejs directory: mainly use three.js to complete the example [includes an AR example completed by easy AR API].

> vue directory: mainly use vue.js to complete the example.

> typescript-directory:mainly use typescript to complete the example.

> demo directory: a collection of demos for some small functions.

> home directory: the official website of this project, built using vuepress.

> website directory: the personal responsive website.

If you feel that this project helps you learn, I hope you don’t be stingy with star.

> Reminder: All project demos are for learning only, not for commercial use, offenders must be investigated.

[Online access address](https://www.eveningwater.com/my-web-projects/home/).

### how to run

#### 1.home directory,the document directory.

```shell
npm run home
```

build:

```shell
npm run home:build
```
#### 2.animate directory。

Which example is run, which parameter is carried.If you run the first example, the directory name is 1.Then run the command as follows:

```shell
npm run animate 1 //or yarn run animate 1
```

#### 3.CSS directory

The principle is same as the animate directory

```shell
npm run css 1  //or yarn run css 1
```

#### 4.jQuery directory

Same principle as above.

```shell
npm run jQuery 1 //or yarn run jQuery 1
```

#### 5.js directory

Same principle as above.

```shell
npm run js 1 //or yarn js 1 (run can be omitted or not)
```

#### 6.react directory

The react directory is a bit different, if the first directory is executed, the same as above:

```shell
npm run react 1 //or yarn react 1
```

If it is the second directory, you need to install dependencies:

```shell
cd react/2
yarn install
npm run react 2 start //Run locally
npm run react 2 build //Packing command
```

If it is the third directory, if it is the following command:

```shell
npm run react 3 //Need not to download dependencies
```

If it is the following command, it means that the second parameter is passed on the command line:

```shell
npm run react dev/build/watch //Need not to download dependencies,run command `yarn install/npm install/cnpm install`
```

Subsequent directories can be deduced by analogy (determined by the project directory construction, if you use webpack, you need to pay attention to webpack-related commands).

#### 7.vue directory

The first to fifth example commands are executed as follows:

```shell
npm run vue 1 //or yarn vue 1,The 1 here refers to the directory name
```

#### 8.threejs directory

The principle is same as the animate directory

```shell
npm run threejs 1 //or yarn threejs 1
```

#### 9.typescript directory

You need to install the dependencies first, and then execute the command. For example, to run the first project, the command is as follows:

```shell
yarn install //The first step is install dependencies
npm run typescript 1 dev/build
```

The second example is the same as the first example.

> notice:You need to install the git client and run it in git-bash. If you have configured environment variables, you don’t need to run it in git-bash.Of course, except for the home directory.


### links

* [home](/)
* [my website](https://www.eveningwater.com)
* [ewColorPicker](https://eveningwater.github.io/ew-color-picker/)
* [17sucai](https://www.17sucai.com/user/800544)
* [juejin](https://juejin.cn/user/4054654613988718)
* [segmentfault](https://segmentfault.com/u/xishui_5ac9a340a5484)
* [zhihu](https://www.zhihu.com/people/eveningwater)
* [stackoverflow](https://stackoverflow.com/users/10505577/eveningwater)
* [my blog](https://www.cnblogs.com/eveningwater/)
* [my blog](https://eveningwater.github.io/#/)
* [code-segment](https://eveningwater.github.io/code-segment/#/)
* [github](https://github.com/eveningwater/my-web-projects)
* [gitee](https://gitee.com/eveningwater)

