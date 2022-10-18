### vue3实现一个连连看小游戏

通过本文，你将学到:

1. vue3的核心语法
2. vue3的状态管理工具pinia的用法
3. sass的用法
4. 基本算法
5. canvas实现一个下雪的效果，一些canvas的基本用法
6. rem布局
7. typescript知识点

#### 开始之前

在开始之前，我们先来看一下最终的成品是怎么样的，如下图所示:

首页如下:

![](https://image-static.segmentfault.com/315/707/3157077917-634e9e934baf6_fix732)

游戏页如下:

![](https://image-static.segmentfault.com/377/610/3776100401-634e9e9f71fc5_fix732)

如上图所示，我们本游戏包含了两部分，第一部分就是首页，第二部分则是游戏页面。然后首页我们又可以分成两个部分，第一部分则是下雪花的效果，第二部分就是一个背景图和按钮。游戏页面同理也是分成两个部分，第一个部分就是列表，第二个部分则是倒计时效果。

当然其实还有隐藏的第三部分，其实也就是一个弹框组件，因为游戏结束或者游戏赢了，我们要给予一个反馈，而这个反馈就是弹框组件。

所有页面分析完成，接下来让我们初始化一个vite工程项目。

#### 初始化工程

首先在电脑上任意一个目录按住shift + 鼠标右键，选择打开powershell，也就是终端。然后输入如下命令:

```shell
npm create vite <项目名> --template vue-ts
```

然后一路回车，初始化完成工程，初始化完成之后，输入npm install,下载依赖，下载完依赖，由于我们使用到了sass，所以需要额外输入npm install sass --save-dev来安装sass依赖。当然由于我们可能会写tsx，所以我们也安装@vitejs/plugin-vue-jsx，还有就是我们设置导入路径的别名，需要用到node的path模块，所以也需要额外安装@types/node依赖。

> 笔记： 初始化工程都是照着[官网](https://vitejs.dev/guide/)文档来的。

#### 修改配置与调整目录

所有依赖安装完成之后，我们修改一下vite.config.ts的配置，如下:

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: "./", //打包路径配置
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  }, //tsx相关配置
  server: {
    port: 30001,
  },//修改端口
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "~",
        replacement: path.resolve(__dirname, "src/assets/"),
      },
    ],
  }, //配置@和～导入别名
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/variable.scss";`, //顾名思义，这里是一个定义变量scss文件，变量应该是作用于全局的，所以在这里全局导入
      },
    },
  } //新增的导入全局scss文件的配置
})
```

以上代码注释所解释的都是新增的配置，vite默认的配置就只有一个```plugins:[vue()]```。

修改完成配置之后，接下来我们来修改目录（主要是修改src目录）以及文件，修改后的目录应该如下所示：

```ts
// assets: 存储静态资源的目录
// components: 公共组件目录
// core: 游戏核心逻辑目录
// directives: 指令目录
// store: 状态管理目录
// style: 样式目录
// utils: 工具函数目录
// views: 页面视图目录
```

思考一下，我们这里需要用到vue-router吗？最开始我也是在思考，但是后面想了一下，这个页面很简单，暂时可以不需要，可是当我们后面进行扩展就需要了，比如自定义关卡和难度配置页面。

ok,调整好了，让我们继续下一步。

#### 定义接口

由于本游戏我们会将游戏参数抽离出来，并且用到了typescript，所以我们可以额外的创建一个type.d.ts文件，用于定义全局的接口类型。并且vite工程已经帮我们做好了默认导入全局接口类型，所以我们不需要做额外的配置，在src目录下，新建type.d.ts文件，然后写上如下接口:

```ts
enum Status {
    START,
    RUNNING,
    ENDING
}

declare namespace GlobalModule {
    export type LevelType = number | string;
    export type ElementType = HTMLElement | Document | Window | null | Element;
    export interface SnowOptionType {
        snowNumber?: number;
        snowShape?: number;
        speed?: number;
    }
    export interface GameConfigType {
        materialList:Record<string,string> [],
        time: number,
        gameStatus: Status
    }
    export interface MaterialData {
        active: boolean
        src: string
        title?: string
        id: string
        isMatch: boolean
    }
    export type DocumentHandler = <T extends MouseEvent|Event>(mouseup:T,mousedown:T) => void;
    export type FlushList = Map<HTMLElement,{ DocumentHandler:DocumentHandler,bindingFn:(...args:unknown[]) => unknown }>
}
```

以上代码我们定义了一个全局命名空间GlobalModule,定义了一个枚举Status代表游戏的状态。然后我们来看命名空间里面所有的接口类型代表什么。

* LevelType: 数值或者字符串类型，这里是用作h1 ~ h6标签名的组成的类型，也就是说我们在后面将会封装一个Head组件，代表标题组件，组件会用到动态的标签名，也就是这里的1 ～ 6属性，它可以是字符串或者数值，所以定义在这里。

* ElementType: 顾名思义，就是定义元素的类型，这在实现下雪花以及获取Dom元素当中用到。

* SnowOptionType: 下雪花效果配置对象的类型，包含三个参数值，雪花数量，雪花形状以及雪花速度，都是数值类型。

* GameConfigType: 游戏配置类型，materialList代表素材列表类型，是一个对象数组，因此定义成```Record<string,string> []```,time代表倒计时时间，gameStatus代表游戏状态。

* MaterialData: 素材列表对象类型。

* DocumentHandler: 文档对象回调函数类型，是一个函数，这在实现自定义指令中会用到。

* FlushList: 用map数据结构存储元素节点的事件回调函数类型，也是用在实现自定义指令当中。

#### 创建store

在store目录下新建store.ts，写下如下代码：

```ts
import { defineStore } from 'pinia'
import { defaultConfig } from '../core/gameConfig'


export const useConfigStore = defineStore('config',{
    state:() => ({
        gameConfig:{ ...defaultConfig }
    }),
    actions:{
        setGameConfig(config:GlobalModule.GameConfigType) {
            this.gameConfig = config;
        },
        reset(){
            this.$reset();
        }
    }
})
```

代码逻辑很简单，就是定义一个游戏配置的状态，以及修改游戏配置状态的action函数，这里有点意思的就是reset函数，this.$reset是哪里来的？可能会有人有疑问。

答案当然是pinia，因为pinia内部封装了一个重置状态的函数，我们可以直接拿来用就是啦。

随后，我们在main.ts文件里面，注入pinia。修改代码如下：

```ts
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
//新增的样式初始化文件
import "./style/reset.scss"

//新增的代码，调用createPinia函数
const pinia = createPinia()
//修改的代码
createApp(App).use(pinia).mount('#app')
```

#### 游戏配置

还有一个defaultConfig，也就是游戏默认配置，也非常简单，在core目录下，新建一个gameConfig.ts文件，添加如下代码：

```ts
// 素材列表是可以随意更换的
export const BASE_IMAGE_URL = "https://www.eveningwater.com/my-web-projects/js/26/img/";
export const materialList: Record<string,string> [] = new Array(12).fill(null).map((item,index) => ({ title:`图片-${index + 1}`,src:`${BASE_IMAGE_URL + (index + 1)}.jpg`}));
export const defaultConfig: GlobalModule.GameConfigType = {
    materialList,
    time: 120,
    gameStatus: 0
}
```

这里面其实就做了两件事，第一件事当然是导出素材列表，第二件事就是导出游戏默认配置啦。

#### 初始化样式

让我们继续，接下来，先初始化一些scss样式变量和初始化样式，在style目录下新建reset.scss和variable.scss文件。

* varaible.scss代码如下:

```scss
$prefix: bm-;
$white: #fff;
$black: #000;

@mixin setProperty($prop,$value){
    #{$prop}:$value; 
}

.flex-center {
    @include setProperty(display,flex);
    @include setProperty(justify-content,center);
    @include setProperty(align-items,center);
}
```

这个文件干了什么？

定义了一个class命名前缀bm-，用$prefix变量代表，接着定义了白色和黑色的变量。随后又定义了一个mixin setProperty。

纵观css无非就是属性名和属性值，所以我定义一个mixin传入两个参数，就是分别代表动态设置属性名和属性值。

> PS: 这里纯属添加了个人的爱好在里面，因为我喜欢这么写scss。

至于用法，我想在flex-center里面已经体现出来了。就是@include setProperty(属性名,属性值)。

* reset.scss

```scss
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body,html {
    width: percentage(1);
    height: percentage(1);
    overflow: hidden;
    background: url("~/header_bg.jpg") no-repeat center / cover;
}
.#{$prefix}clearfix::after {
    @include setProperty(content,'');
    @include setProperty(display,table);
    @include setProperty(clear,both);
}
ul,li {
    @include setProperty(list-style,none);
}
.app {
    @include setProperty(position,absolute);
    @include setProperty(width,percentage(1));
    @include setProperty(height,percentage(1));
}
```

初始化样式的代码也很好理解，首先是通配选择器*,将所有的外间距和内间距初始化为0，并且设置body和html的宽高，截断溢出内容，并设置背景。加了一个.bm-clearfix用于清除浮动的样式，因为后面会涉及到这个类名的使用，接着是重置ul,li的列表富豪，以及设置类名为app元素的样式。

基本样式初始化完成，接下来，我们就来实现一下页面当中会用到的工具函数。

#### 实现一些会用到的工具函数

在utils目录下新建一个util.ts，首先在指令当中会用到的就是一个isServer，用来判断是否是服务端环境，也比较好理解，直接判断window对象是否存在即可。代码如下:

```ts
export const isServer = typeof window === "undefined";
```

接下来，简单封装一个on方法，用来给元素添加事件，on方法接受4个参数，第一个参数为添加事件的元素，类型就是ElementType,第二个参数为事件类型，是一个字符串，比如‘click’,第三个参数是事件回调函数，类型为EventListenerOrEventListenerObject，这个类型是DOM内置定义好的事件回调函数类型，第四个参数也就是一个配置，是一个布尔值，代表事件是冒泡还是捕获阶段。

这个代码，其实我们就是利用addEventListener方法来简单的封装一下，所以最终代码如下:

```ts
export function on(
  element: GlobalModule.ElementType,
  type: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
) {
  if (element && type && handler) {
    element.addEventListener(type, handler, useCapture);
  }
}
```

相应的，我们也有off方法，其实就是将addEventListener缓存removeEventListener方法即可，但在本项目当中似乎并没有用到，所以不必封装。


接下来是第三个工具方法，叫做isDom,顾名思义，就是判断一个元素是否是一个DOM元素。思考一下，我们如何判断一个元素是否是DOM元素呢？

或者我们可以这么想，DOM元素都有哪些特点？

首先第一点，当HTMLElement对象存在时，那么DOM对象节点一定是该对象的一个子实例，因此我们有:

```ts
if(typeof HTMLElement === 'object'){
    return el instanceof HTMLElement;
}
```

其次，如果HTMLElement不是一个对象，那我们可以判断el instanceof HTMLCollection。

最后一种判断方法，那就是判断el是否是一个对象，并且存在nodeType和nodeName属性，其中nodeType = 1代表是一个DOM元素节点，具体可以查看[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)知晓这个属性的值分别代表什么。


综上所述，isDom方法就呼之欲出了，如下:

```ts
export function isDom(el: any): boolean {
  return typeof HTMLElement === 'object' ?
    el instanceof HTMLElement :
    el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string'
    || el instanceof HTMLCollection;
}
```

接下来的这个工具方法不需细讲，就是一个创建uuid的工具函数，代码如下:

```ts
export const createUUID = (): string => (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
```

接下来的一个工具方法可是重中之重，也就是倒计时工具函数，让我们来思考一下，我们主要要返回一个状态出去，也就是倒计时的值，即一个数值，倒计时会有一个起始值，也会有一个结束值，并且还有一个步长，以及执行时间。

如何实现一个倒计时？这里很显然就要用到定时器啦，不过我这里采用的是另一种方式，也就是延迟函数+递归来实现。一共有5个参数，所以我们的函数结构如下:

```ts
export const CountDown = (start:number,end:number,step:number = 1,duration:number = 2000,callback:(args: { status:string,value:number,clear:() => void } ) => any) => {
    //核心逻辑
}
```

这个函数的参数比较长，一共有5个参数，主要在第5个参数上，它是一个函数，参数是3个```{ status:'running',value:1,clear:() => {}}```，其中status代表当前是什么状态，value就是倒计时的数值，clear是一个函数，用来清空定时器，并阻止递归。

接下来第一步，定义3个变量，分别代表定时器，当前倒计时数值以及步长，如下:

```ts
let timer: ReturnType<typeof setTimeout>,
    current = start + 1,
    step = (end - start) * step < 0 ? -step : step;
```

紧接着定义一个需要执行递归的函数，并调用它，然后返回一个clear方法，如下:

```ts
const handler = () => {
    //核心代码
}
handler();
return {
    clear:() => clearTimeout(timer);
}
```

在递归函数handler中，我们通过current与步长相加得到了倒计时值，随后我们回调状态以及值出去，最后判断当满足了递归条件，就阻止递归并清除定时器，然后将结束状态以及倒计时值回调出去，否则就是延迟递归执行handler函数。如下:

```ts
current += _step;
callback({
    status:"running",
    value: current,
    clear:() => {
        //这里需要注意，必须要修改current为最终状态值，才能清除定时器并停止递归
        if(end - start > 0){
            current = end - 1;
        }else{
            current = end + 1;
        }
        clearTimeout(timer);
    }
});
//这里就是递归终止条件
const isOver = end - start > 0 ? current >= end - 1 : current <= end + 1;
if(isOver){
    clearTimeout(timer);
    callback({
        status:"running",
        value: current,
        clear:() => {
            //这里需要注意，必须要修改current为最终状态值，才能清除定时器并停止递归
            if(end - start > 0){
               current = end - 1;
            }else{
                current = end + 1;
            }
            clearTimeout(timer);
        }
    });
}else{
    timer = setTimeout(handler,Math.abs(duration));
}
```

合并以上代码就成了我们最终的倒计时函数，如下:

```ts
export const CountDown = (start: number,
  end: number,
  step: number = 1,
  duration: number = 2000,
  callback: (args: { status: string, value: number, clear: () => void }) => any): { clear: () => void } => {
  let timer: ReturnType<typeof setTimeout>,
    current = start + 1,
    _step = (end - start) * step < 0 ? -step : step;
  const handler = () => {
    current += _step;
    callback({
      status: "running",
      value: current,
      clear: () => {
        // 需要修改值
        if (end - start > 0) {
          current = end - 1;
        } else {
          current = end + 1;
        }
        clearTimeout(timer);
      }
    });    
    const isOver = end - start > 0 ? current >= end - 1 : current <= end + 1;
    if (isOver) {
      clearTimeout(timer);
      callback({
        status: "end",
        value: current,
        clear: () => {
          // 需要修改值
          if (end - start > 0) {
            current = end - 1;
          } else {
            current = end + 1;
          }
          clearTimeout(timer);
        }
      })
    } else {
      timer = setTimeout(handler, Math.abs(duration));
    }
  }
  handler();
  return {
    clear: () => clearTimeout(timer)
  }
}
```

#### 实现下雪花效果

在utils下新建snow.ts，然后我们思考一下，如何实现下雪花的效果？

我们可以知道下雪花分成两部分下雪花和雪花，在这里，我们需要用到canvas相关语法，我们把下雪花叫做SnowMove,雪花叫做Snow，如此一来，我们就可以定义好两个类，代码如下:

```ts
class Snow {
    //雪花类核心代码
}
class SnowMove {
    //下雪花类核心代码
}
```

#### 实现Snow类

现在，我们先来实现雪花类，首先我们要知道要实现雪花，就需要添加一个canvas标签，在这里我们选择的是动态添加canvas标签，所以雪花类构造函数中应当有2个参数，第一个就是canvas元素添加的容器元素，另一个就是雪花配置对象。因此，我们继续添加如下代码:

```ts
class Snow {
    constructor(element:GlobalModule.ElementType,option?:GlobalModule.SnowOptionType){
        //初始化代码
    }
}
```

注意2个参数的类型，还有第2个参数是可选的，这样我们就可以定义一个默认配置对象，如果没有传option，就采用默认配置对象，接下来我们要在构造函数里面做什么？那当然是要初始化一些属性，定义一些公共属性来存储容器元素和配置对象。

```ts
class Snow {
    public el: GlobalModule.ElementType;
    public snowOption: GlobalModule.SnowOptionType;
    public defaultSnowOption: Required<GlobalModule.SnowOptionType> = {
        snowNumber: 200,
        snowShape: 5,
        speed: 1
    };
    public snowCan: HTMLCanvasElement | null;
    public snowCtx: CanvasRenderingContext2D | null;
    public snowArr: SnowMove [];
    constructor(element:GlobalModule.ElementType,option?:GlobalModule.SnowOptionType){
        this.el = element;
        this.snowOption = option || this.defaultSnowOption;
        this.snowCan = null;
        this.snowCtx = null;
        this.snowArr = [];
    }
}
```

以上代码虽然稍微有点长，但事实上很好理解，我们就是在类的this对象上绑定了一些属性，比如容器元素，还有初始化canvas元素和元素上下文对象，可能不好理解的是这里有一个snowArr属性，它代表存储的每一个雪花移动的类的数组。

初始化属性完成，接下来创建一个init方法，用来初始化雪花的一些方法，在init方法中，我们调用了3个方法。

* createCanvas: 顾名思义，就是创建canvas元素的方法。
* createSnowShape: 这是一个创建雪花形状的方法。
* drawSnow: 画雪花的方法。

代码如下:

```ts
class Snow {
    //省略了部分代码
    init(){
        this.createCanvas();
        this.createSnowShape();
        this.drawSnow();
    }
}
```

让我们先来看第一个方法，createCanvas方法的实现，我们知道动态创建一个元素，其实也就是使用document.createElement方法，创建canvas元素之后，我们需要额外设置一点样式让canvas填充满整个容器元素，为了方便获取canvas元素，我们给它添加一个id，随后我们需要设置canvas元素的宽度和高度，最后我们将canvas元素添加到容器元素中去。

但是我们需要知道，在这里屏幕可能会发生变动，发生了变动之后，我们的canvas元素应该也会变动，所以我们还需要监听resize事件，用来修改元素的宽高。

让我们来看一下实现的代码吧:

```ts
import { isDom,on } from './util'
class Snow {
    //省略了代码
    createCanvas(){
        //创建一个canvas元素
        this.snowCan = document.createElement('canvas');
        // 设置上下文
        this.snowCtx = this.snowCan.getContext('2d');
        // 设置id属性
        this.snowCan.id = "snowCanvas";
        // canvas元素设置样式
        this.snowCan.style.cssText += "position:absolute;left:0;top:0;z-index:1;";
        //设置canvas元素宽度和高度
        this.snowCan.width = isDom(this.el) ? (this.el as HTMLElement).offsetWidth : document.documentElement.clientWidth;
        this.snowCan.height = isDom(this.el) ? (this.el as HTMLElement).offsetHeight : document.documentElement.clientHeight;
        // 监听resize事件
        on(window,'resize',() => {
            (this.snowCan as HTMLElement).width = document.documentElement.clientWidth;
            (this.snowCan as HTMLElement).height = document.documentElement.clientHeight;
        });
        //最后一步，将canvas元素添加到页面中去
        if(isDom(this.el)){
            (this.el as HTMLElement).appendChild(this.snowCan);
        }else{
            document.body.appendChild(this.snowCan);
        }
    }
    //省略了代码
}
```

createCanvas到此为止了，接下来我们来看下一个方法，也就是createSnowShape方法。这个方法其实也很简单，主要是根据参数创建一个雪花移动的数组并存储起来。如下:

```ts
class Snow {
    //省略了代码
    createSnowShape(){
        const maxNumber = this.snowOption.snowNumber || this.defaultSnowption.snowNumber,
              shape = this.snowOption.snowShape || this.defaultSnowption.snowShape,
              { width,height } = this.snowCan as HTMLCanvasElement,
              snowArr: SnowMove [] = this.snowArr = [];
        for(let i = 0;i < maxNumber;i++){
            snowArr.push(
                new SnowMove(width,height,shape,{ ...this.defaultSnowOption,...this.snowOption })
            )
        }
    }
    //省略了代码
}
```

显然这个方法就是把每一个雪花移动当作一个实例存储到数组中，这个雪花移动的类我们后面会说到，这里先不说。让我们来看下一个方法drawSnow。

其实通过这个方法我们也可以看到真正画雪花是在SnowMove类当中，这个类当中我们实现了render也就是渲染雪花的方法，以及update更新雪花的方法。所以在这个方法但这个方法当中，我们主要做的事情就是🏪存储的雪花数组snowMove，然后调用每一个snowMove实例的render方法和update方法，然后再使用requestAnimationFrame重复调用drawSnow方法。

当然在遍历之前，我们要先调用clearRect方法清除画布。

```ts
class Snow {
    //省略了代码
    drawSnow(){
        //清除画布
        this.snowCtx?.clearRect(0,0,this.snowCan?.width as number,this.snowCan?.height as number);
        //遍历snowArr
        const snowNumber = this.snowOption.snowNumber || this.defaultSnowption.snowNumber;
        for(let i = 0;i < snowNumber;i++){
            this.snowArr[i].render(this.snowCtx as CanvasRenderingContext2D);
            this.snowArr[i].update(this.snowCan as HTMLCanvasElement);
        }
        // 重复调用
        requestAnimationFrame(() => this.drawSnow());
    }
    //省略了代码
}
```

除此之外，Snow类还额外封装了一个remove方法，用来移除Snow创建的canvas元素，虽然在本示例当中没有用到，但是也可以说一下。

```ts
class Snow {
    //省略了代码
    remove(){
        if(isDom(this.el)){
            (this.el as HTMLElement).removeChild(this.snowCan);
        }else{
            document.body.removeChild(this.snowCan);
        }
    }
    //省略了代码
}
```

接下来我们来看SnowMove类的实现。

#### 实现SnowMove类

通过前面的代码，我想我们对这个类的实现已经有了一定的了解了，比如render和update方法，顾名思义，一个就是渲染方法，另一个就是更新方法。接下来我们要思考一下，雪花移动改变的是什么？

雪花移动主要就是改变坐标，也就是x和y坐标的值，它会有一个步长，然后根据步长结合数学函数计算出垂直下落的x和y坐标的一个速度，我们称之为verX和verY,在下落的时候，可能也会飞出边界，所以我们就需要在飞出边界的时候，我们就应该做一个重置操作，所以也就额外增加了一个reset方法。

根据以上分析，我们得出SnowMove类，我们应该初始化的属性有x,y,shape,fallspeed,verX,verY,step,stepNum等属性，分别代表x坐标以及y坐标，雪花形状，下落速度，垂直方向上的x坐标和y坐标，步长，以及步数。

当然为了方便获取在Snow类里面定义的配置属性，我们将Snow定义的配置属性对象当作参数也要传给SnowMove类。

代码如下:

```ts
class SnowMove {
    public x:number;
    public y:number;
    public shape:number;
    public fallspeed:number;
    public verx:number；
    public verY:number;
    public step:number;
    public stepNum: number;
    public context: Required<GlobalModule.SnowOptionType>;
    // 注意构造函数的参数
    constructor(w:number,h:number,s:number,context:Required<GlobalModule.SnowOptionType>){
        // 初始化x和y坐标，取随机数,由于我们的x和y坐标是在canvas元素内部变动，因此我们取canvas元素的宽度和高度去乘以随机数得到初始化的随机x和y坐标
        this.x = Math.floor(w * Math.random());
        // 这也是为什么要将canvas的宽度和高度当作SnowMove的参数原因
        this.y = Math.floor(h * Math.random());
        // 初始化形状
        this.shape = Math.random() * s;
        // 初始化下落速度
        this.fallspeed = Math.random() + context.speed;
        // 初始化x和y方向下落的速度
        this.verY = context.speed;
        this.verX = 0;
        // 初始化context
        this.context = context;
    }
}
```

如此一来我们的初始化工作就完成了，但事实上我们第二个方法reset方法本质上也是重新初始化一次，因此我们可以将初始化的逻辑抽取出来，创建一个init方法，然后直接调用这个方法来初始化。修改代码如下:

```ts
class SnowMove {
    //省略了代码
    constructor(w:number,h:number,s:number,context:Required<GlobalModule.SnowOptionType>){
        this.context = context;
        this.init(w,h,s,context.speed);
    }
    init(w:number,h:number,s:number,speed: number){
        this.x = Math.floor(w * Math.random());
        this.y = Math.floor(h * Math.random());
        this.shape = Math.random() * s;
        this.fallspeed = Math.random() + speed;
        this.verY = speed;
        this.verX = 0;
    }
}
```

如此一来，我们的reset方法也就完成了，如下:

```ts
class SnowMove {
    //省略了代码
    reset(can: HTMLCanvasElement){
        this.init(can.width,can.height,this.context.speed);
    }
    //省略了代码
}
```

接下来，我们来完成update方法，update方法传入canvas作为参数，因为我们要使用到canvas元素的宽度和高度，接下来思考一下，我们要在update方法里面做什么？

我们是不是要更新下落坐标？也可以称之为更新下落速度，这样我们也就相当于更改verX和verY的值，那么如何更改？

verX的计算公式为:

this.verX  = this.verX * 一个随机移动的数（这里是0.95）+ Math.cos(this.step += （一个数，这里取的是0.4）) * this.stepNum;

verY的计算公式为:

this.verY = Math.max(this.fallspeed,this.verY);

然后我们再将两者自增，这样雪花就达到了从最上方落到最下方的效果，当然这个计算公式不是唯一的，根据实际效果而定。

更新了坐标完成之后，我们需要做一个边界处理，边界的判断条件是什么?

很简单不能小于（可以等于可以不等于，这里取等于）0，其次不能大于canvas元素的宽度和高度。

综上所述，update方法就呼之欲出啦，代码如下:

```ts
class SnowMove {
    //省略了代码
    update(can: HTMLCanvasElement){
        this.verX *= 0.95;
        if(this.verY <= this.fallspeed){
            this.verY = this.fallspeed;
        }
        this.verX += Math.cos(this.step += .4) * this.stepNum;
        this.verY += this.verY;
        this.verX += this.verX;
        // 边界判断
        if(this.verX <= 0 || this.verX > can.width || this.verY <= 0 || this.verY > can.height){
            this.reset(can);
        }
    }
    //省略了代码
}
```

update方法完成后，render方法才是最核心的构建雪花的方法，构建雪花我们采用渐变颜色填充，并且这里的雪花是圆形的，所以我们需要用到arc方法来画圆，画圆要用到半径，所以我我们将最开始配置对象的参数shape作为半径。

canvas画一个图形的步骤有，

* ctx.save 保存状态
* ctx.fillStyle 填充颜色
* ctx.beginPath 开始路径
* ctx.arc 画圆
* ctx.fill 填充路径
* ctx.restore 弹出状态

想要知道canvas的这些具体代表什么，可以查看[文档](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/canvas)。

这里我们使用createRadialGradient和addColorStop方法来创建一个渐变颜色。

根据以上分析，render方法，我们基本上就完成了。如下:

```ts
class SnowMove {
    //省略了代码
    render(ctx:CanvasRenderingContext2D){
        const snowStyle = ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.shape);
        snowStyle.addColorStop(0.8, 'rgba(255,255,255,1)');
        snowStyle.addColorStop(0.1, 'rgba(255,255,255,.4)');
        ctx.save();
        ctx.fillStyle = snowStyle;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.shape,0,Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
    }
    //省略了代码
}
```

将以上的分析代码合并，我们的一个Snow下雪花效果就写好了，接下来我们来看是如何使用的。

```ts
const s = new Snow(document.querySelect('.test'));
s.init();
```

#### 一些公共组件的实现

我们来尝试分析一下页面，我们可以将哪些组件做成公共组件，首先是首页，我们可以将按钮组件，还有就是ready go也分别做成公共组件，其次我们还需要一个Modal组件，公共组件基本就这些了。

#### Button组件的实现

button组件的实现很简单，就是一个button，然后写点样式（样式是可以自己随便写的），然后通过defineEmits方法将点击事件传给父组件即可。代码如下:

```vue
<script lang="ts" setup>
    const emit = defineEmits(['click']);
</script>
<template>
    <button type="button" class="bm-play-btn" @click="emit('click')">开始游戏</button>
</template>
<style lang="scss" scoped>
$color: #753200;
.#{$prefix}play-btn {
    @include setProperty(position, absolute);
    @include setProperty(width, 2rem);
    @include setProperty(height, .6rem);
    @include setProperty(left, percentage(0.5));
    @include setProperty(top, percentage(0.5));
    @include setProperty(background, linear-gradient(135deg,#fefefe 10%,#fff 90%));
    @include setProperty(transform, translate(-50%, -50%));
    @include setProperty(font, bold .34rem/.6rem '微软雅黑');
    @include setProperty(text-align, center);
    @include setProperty(color, $color);
    @include setProperty(border-radius,.4rem);
    @include setProperty(letter-spacing,2px);
    @include setProperty(cursor,pointer);
    @include setProperty(outline,none);
    @include setProperty(border,none);
    &:hover {
        @include setProperty(background, linear-gradient(135deg,#e8e8e8 10%,#fff 90%));
    }
}
</style>
```

在这里，我通过写scss的mixin来写样式，满屏的setProperty可能会让人有些迷惑，你只需要知道它就是mixin即可，也许这不是一个好的方式，这纯属个人的爱好，不一定非要跟着我这样写。

> PS: 这里为了兼容移动端，我们也用到了rem布局，这个我们放到最后来讲。

#### go和ready组件的实现

要实现这两个组件，我们首先需要先简单包装一下标题组件，创建一个Head.vue，代码如下:

```vue
<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
const props = defineProps({
    level: {
        type: [Number, String] as PropType<GlobalModule.LevelType>,
        default: '1',
        validator: (v: GlobalModule.LevelType) => {
            return [1, 2, 3, 4, 5, 6].includes(Number(v));
        }
    },
    content: String as PropType<string>
})
const { level, content } = toRefs(props);
const ComponentName = `h${level.value}`;
</script>
<template>
    <Component :is="ComponentName">
        <slot>{{ content }}</slot>
    </Component>
</template>
```

这个组件的代码也是很好理解的，利用vue的动态组件component，来实现从h1 ~ h6根据props来决定是使用哪个标签元素渲染。

这里使用了对象解构，为了不让props在对象解构当中失去响应式特性，我们使用toRefs方法来包裹了props。

props有两个参数，第一个为level，代表标题标签使用哪种，有6个数值，即1 ~ 6，其次content可以作为标签的内容，当然如果写了插槽内容，默认还是以插槽内容为主。

接下来Go和Ready组件就是基于Head组件来实现的，两者有些共同之处，主要不同的地方在于动画效果的不同，一个是渐隐效果，一个是渐隐 + 缩放效果。

到了这里，我想很多人已经分析出来了，就是使用animation动画来实现。

首先，我们将这两个组件的公共样式提取出来，放到style目录下，新增一个Head.scss，然后写上样式代码。

> 我认为样式还是比较简单好理解的，应该不需要细讲，直接附上源码即可。

```scss
@mixin head {
    color:$white;
    width: percentage(1);
    text: {
        align: center;
    }
    line: {
        height: 400px;
    }
    position: absolute;
    display: block;
}
```

这里值得一提的就是scss的属性语法，我们还可以将属性拆分，比如本示例中的text-align被拆分成了text和align，同理line-height也是，这样我们也可以举一反三，比如border，background等也都可以这么写，当然这种写法与scss的版本也有关系，需要注意你使用的scss版本是否支持。

然后我们来看Go和Ready组件的源码，两者应该是类似的，基本上写了一个，另一个就好写了，无非是动画的效果不同罢了。

* Go.vue

```vue
<script setup lang="ts">
import { PropType } from 'vue';
import Head from './Head.vue';
const props = defineProps({
    modelValue: Boolean as PropType<boolean>
});
const emit = defineEmits(['update:modelValue']);
emit('update:modelValue');
</script>
<template>
    <Head class="bm-go" :class="{ 'active':props.modelValue }">Go</Head>
</template>
<style scoped lang="scss">
@import "../style/head.scss";
.#{$prefix}go {
    @include head();
    opacity: 0;
    transform: scale(0);
    &.active {
        animation: goSlide 1.5s .5s;
    }
    @keyframes goSlide {
        from {
            opacity: 0;
            transform: scale(0);
        }
        to {
            transform: scale(1.7);
            opacity: 1;
        }
    }
}
</style>
```

* Ready.vue

```vue
<script setup lang="ts">
import { PropType } from 'vue';
import Head from './Head.vue';
const props = defineProps({
    modelValue: Boolean as PropType<boolean>
});
const emit = defineEmits(['update:modelValue']);
emit('update:modelValue');
</script>
<template>
    <Head class="bm-ready" :class="{ 'active':props.modelValue }">Ready</Head>
</template>
<style scoped lang="scss">
    @import "../style/head.scss";
    .#{$prefix}ready {
        @include head();
        transform: translateY(-150%);
        &.active {
            animation: readySlide 1.5s;
        }
        // 不同的是动画效果
        @keyframes readySlide {
            from {
                opacity: 1;
                transform: translateY(-150%);
            }
            to {
                transform: translateY(0);
                opacity: 0;
            }
        }
    }
</style>
```

最后一个公共组件就是Modal.vue呢，也就是一个弹框组件的实现，让我们一起来看一下吧。

#### 弹框组件的实现

在开始这个组件之前，我们还需要额外使用到一个指令，即clickOutside指令，顾名思义，就是点击元素区域之外所执行的逻辑。试想一下，我们通常在实现弹框组件的时候，点击弹框内容里面是不用关闭弹框的，但是点击遮罩层就需要关闭弹框了，所以这个指令在此也就有了用武之地。

像一些下拉框组件Select，Popover组件（悬浮框）组件等，都可能会用到这个指令。

那么如何实现这个指令呢？

我们思考一下，要实现点击区域之外，也就是说我们需要一个事件的全局代理，即我们点击整个屏幕，然后通过点击屏幕的事件对象中的点击触发节点来判定是否在弹框内容组件节点中。

有两种方式实现这种效果，一种是通过节点的方式，另一种则是通过判断坐标的方式，这在我的实现颜色选择器的[文章](https://juejin.cn/post/7017408394831233031)和[课程](https://ke.segmentfault.com/course/1650000040761646)当中有详细讲解。


当然以上是题外话，让我们继续，我们在这里很明显需要有一个数据结构，将绑定该指令的所有节点都存储起来，然后通过监听document或者是window对象的mousedown事件，比较节点是否在存储的数据结构中能够找到，如果能够找到，就不执行后续逻辑，否则就执行指令绑定的对应方法。

整体思路就是这么一回事，接下来，我们来看具体的实现，在directives目录下新建一个clickoutside.ts文件。

```ts
import { ComponentPublicInstance, DirectiveBinding, ObjectDirective } from 'vue';
import { isServer,on } from '../utils/util';

const nodeList:GlobalModule.FlushList = new Map();
let startClick:MouseEvent | Event;
if(!isServer){
    on(document,'mousedown',(e:MouseEvent | Event) => startClick = e);
    on(document,'mouseup',(e:MouseEvent | Event) => {
        for(const { DocumentHandler } of nodeList.values()){
            DocumentHandler(e,startClick);
        }
    });
}
const createDocumentHandler = (el:HTMLElement,binding:DirectiveBinding):GlobalModule.DocumentHandler => {
    // the excluding elements
    let excludes:HTMLElement[] = [];
    if(binding.arg){
        if(Array.isArray(binding.arg)){
            excludes = binding.arg;
        }else{
            excludes.push(binding.arg as unknown as HTMLElement);
        }
    }
    return (mouseup,mousedown) => {
        // Maybe we can not considered the tooltip component,which is the popperRef type
        const popperRef = (binding.instance as ComponentPublicInstance<{ popperRef:NonNullable<HTMLElement> }>).popperRef;
        const mouseUpTarget = mouseup.target as Node;
        const mouseDownTarget = mousedown.target as Node;
        const isBinding = !binding || !binding.instance;
        const isExistTargets = !mouseUpTarget || !mouseDownTarget;
        const isContainerEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
        const isSelf = el === mouseUpTarget;
        const isContainByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
        const isTargetExcluded = excludes.length && (excludes.some(item => item.contains && item?.contains(mouseUpTarget)) || excludes.indexOf(mouseDownTarget as HTMLElement) > -1);
        if(isBinding || isExistTargets || isContainerEl || isSelf || isTargetExcluded || isContainByPopper)return;
        // the directive should binding a method or function
        binding.value();
    }
}
const setNodeList = (el:HTMLElement,binding:DirectiveBinding) => {
    nodeList.set(el,{
        DocumentHandler:createDocumentHandler(el,binding),
        bindingFn:binding.value
    })
}
const clickOutside:ObjectDirective = {
    beforeMount(el,binding){
        setNodeList(el,binding);
    },
    updated(el,binding){
        setNodeList(el,binding);
    },
    unmounted(el){
        nodeList.delete(el);
    }
}
export default clickOutside;
```

通过以上源码，我们需要知道哪些点，首先我们是通过map数据结构来存储整个节点，每个节点对应一个对象，对象里面对应一个文档节点的回调方法，和指令值所执行的方法。

我们知道，在vue的指令当中也有对应的生命周期钩子函数，在这里我们用到了beforeMount，updated，以及unmounted钩子函数，在元素挂载和数据更新的钩子函数中，我们存储调用的逻辑对象，在组件卸载的钩子函数中，我们删除以元素作为存储的对应节点的逻辑对象。

在mousedown事件中，我们用了一个变量来存储事件对象，然后在mouseup事件中，我们就调用对应的文档节点存储的回调方法。

这里的判断元素节点是否是在弹框内容之外的核心逻辑，其实就在createDocumentHandler这个函数中。

在这个函数当中，我们首先用一个数组来存储指令的arg参数，这个参数如果传了，并且是一个dom元素，我们就保存起来。

然后我们返回一个函数，函数有2个参数，分别是鼠标按下的事件对象和鼠标释放的事件对象，在这个函数里面，我们主要对每一种情况都做了分析。

归根结底就是判断元素是否存在，并且元素不应该是popover组件，并且在我们存储的数组当中存在该元素，都直接return，代表我们点击的是元素区域内。

如果不满足这些条件，我们才调用指令的值，它是一个方法。

这个指令理解了，接下来我们的弹框组件就好理解多了。

#### 弹框组件的实现

弹框组件整体逻辑并不算复杂，主要需要考虑样式的编写，以及配置属性，可以尝试思考一下，一个弹框组件应该会有哪些基本属性，如下。

* title: 弹框的标题
* content: 弹框的内容

其余的属性都是额外延伸出来的，例如hasFooter属性，顾名思义，就是是否显示弹框底部内容，其他额外的属性如下所示:

* showCancel: 是否显示取消按钮
* isRenderContentHTML: 弹框内容是否渲染html元素
* maskCloseable: 是否允许点击遮罩层关闭弹框
* canceText: 取消按钮文本
* okText: 确认按钮文本
* align: 弹框底部的布局方式
* container: 渲染弹框的容器元素

当然一个复杂的弹框还会有更多属性，用来应对各种各样的场景，但是这些属性在这个示例当中已经足够了。

除此之外，为了实现自定义组件的v-model指令，我们在这里也定义了一个modelValue属性，属性方面分析完成，接下来就是分析事件的注册，主要有三个事件，第一就是update:modelvalue,还有两个就是点击确认和取消事件。

在这里，我们也知道了clickoutside指令的使用方式，首先就是导入指令，然后用一个变量（为了添加独特的标志，代表是Vue框架的指令），我们定义成VClickOutside，然后在模板代码中，我们就可以直接v-click-outside这样来使用了。

其实分析到这里，一个弹框组件基本也就完成了，接下来就是添加样式，去美化弹框组件了，当然这里还使用了一个teleport组件，这个组件是Vue3独特添加的一个组件，用来将组件插入到某个容器元素的，现在我们就来看完整的代码吧:

```vue
<script setup lang="ts">
import { PropType, toRefs } from 'vue';
import clickOutside from "../directives/clickOutside";
const props = defineProps({
    modelValue: Boolean as PropType<boolean>,
    title: String as PropType<string>,
    content: String as PropType<string>,
    hasFooter: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    showCancel: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    isRenderContentHTML: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    maskCloseable: {
        type: Boolean as PropType<boolean>,
        default: true
    },
    cancelText: {
        type: String as PropType<string>,
        default: "取消"
    },
    okText: {
        type: String as PropType<string>,
        default: "确认"
    },
    align: {
        type: String as PropType<string>,
        default: 'right',
        validator: (v: string) => {
            return ['left', 'center', 'right'].includes(v);
        }
    },
    container: {
        type: String as PropType<string>,
        default: 'body'
    }
});
const emit = defineEmits(['update:modelValue', 'on-ok', 'on-cancel']);
emit('update:modelValue');
const { modelValue, title, content, hasFooter, cancelText, okText, align, container, maskCloseable, isRenderContentHTML } = toRefs(props);
const onClickOutsideHandler = () => {
    if (maskCloseable.value) {
        emit('update:modelValue', false);
    }
}
const VClickOutside = clickOutside;
const onCancelHandler = () => {
    emit('update:modelValue', false);
    emit('on-cancel');
}
const onOkHandler = () => {
    emit('on-ok');
}
</script>
<template>
    <teleport :to="container">
        <Transition name="modal">
            <div v-if="modelValue" class="bm-modal-mask">
                <div class="bm-modal-wrapper">
                    <div class="bm-modal-container" v-click-outside="onClickOutsideHandler">
                        <div class="bm-modal-header" v-if="title">
                            <slot name="header">{{ title }}</slot>
                        </div>
                        <div class="bm-modal-body" v-if="content">
                            <slot name="body">
                                <p v-if="isRenderContentHTML" v-html="content"></p>
                                <template v-else>{{ content }}</template>
                            </slot>
                        </div>
                        <div class="bm-modal-footer" v-if="hasFooter" :class="{ ['text-' + align]: true }">
                            <slot name="footer">
                                <button class="bm-modal-footer-btn" @click="onCancelHandler" v-if="showCancel">{{
                                cancelText
                                }}</button>
                                <button class="bm-modal-footer-btn primary" @click="onOkHandler">{{ okText
                                }}</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </teleport>
</template>
    
<style lang="scss" scoped>
$btnBorderColor: #c4c4c4;
$primaryBgColor: linear-gradient(135deg, #77b9f3 10%, #106ad8 90%);
$primaryHoverBgColor: linear-gradient(135deg, #4d95ec 10%, #0754cf 90%);
$btnHoverColor: #3a6be7;
$btnHoverBorderColor: #2c92eb;
.#{$prefix}modal-mask {
    @include setProperty(background-color, fade-out($black, .5));
    @include setProperty(position, fixed);
    @include setProperty(z-index, 2000);
    @include setProperty(top, 0);
    @include setProperty(left, 0);
    @include setProperty(bottom, 0);
    @include setProperty(right, 0);
    @include setProperty(transition, all .2s ease-in-out);
    @include setProperty(font-size,.2rem);
    .#{$prefix}modal-wrapper {
        @extend .flex-center;
        @include setProperty(height, percentage(1));
        .#{$prefix}modal-container {
            @include setProperty(min-width, 300px);
            @include setProperty(margin, 0 auto);
            @include setProperty(background-color, $white);
            @include setProperty(border-radius, 4px);
            @include setProperty(transition, all .2s ease-in-out);
            @include setProperty(box-shadow, 0 1px 6px fade-out($black, .67));
            .#{$prefix}modal-header {
                @include setProperty(padding, 20px 30px);
                @include setProperty(border-bottom, 1px solid fade-out($white, .65));
                @include setProperty(color, fade-out($black, .15));
            }
            .#{$prefix}modal-body {
                @include setProperty(padding, 20px 30px);
            }
            .#{$prefix}modal-footer {
                @include setProperty(padding, 20px 30px);
                &.text-left {
                    @include setProperty(text-align, left);
                }
                &.text-center {
                    @include setProperty(text-align, center);
                }
                &.text-right {
                    @include setProperty(text-align, right);
                }
                &-btn {
                    @include setProperty(outline, none);
                    @include setProperty(display, inline-block);
                    @include setProperty(background, transparent);
                    @include setProperty(border, 1px solid $btnBorderColor);
                    @include setProperty(border-radius, 8px);
                    @include setProperty(padding, 8px 12px);
                    @include setProperty(color, fade-out($black, .15));
                    @include setProperty(letter-spacing, 2px);
                    @include setProperty(font-size, 14px);
                    @include setProperty(font-weight, 450);
                    @include setProperty(cursor, pointer);
                    @include setProperty(transition, background .3s cubic-bezier(.123, .453, .56, .89));
                    &:first-child {
                        @include setProperty(margin-right, 15px);
                    }
                    &:hover {
                        @include setProperty(color, $btnHoverColor);
                        @include setProperty(border-color, $btnHoverBorderColor);
                    }
                    &.primary {
                        @include setProperty(background, $primaryBgColor);
                        @include setProperty(color, $white);
                        &:hover {
                            @include setProperty(background, $primaryHoverBgColor);
                        }
                    }
                }
            }
        }
    }
}
.baseModalStyle {
    @include setProperty(transform, scale(1));
}
.modal-enter-from {
    @include setProperty(opacity, 0);
    .#{$prefix}modal-container {
        @extend .baseModalStyle;
    }
}
.modal-leave-to {
    @include setProperty(opacity, 0);
    .#{$prefix}modal-container {
        @extend .baseModalStyle;
    }
}
</style>
```

弹框组件实现完成，我们本示例所用到的公共组件也就完成了，接下来，我们来完善游戏的核心逻辑，在core目录下新建game.ts文件。

#### 游戏核心逻辑

由于我们每一个素材需要一个唯一的uuid标志，所以createUUID方法需要在这里导入进来，另外我们需要随机打乱顺序，虽然可以自己写方法来实现，但是这里为了方便，我们使用lodash.js，然后我们还要将游戏配置的状态管理store给导入进来。

其实这个文件我们主要导出一个函数组件，所以我们先写一个基本结构，代码如下:

```ts
import { createUUID } from './../utils/util';
import { useConfigStore } from './../store/store';
import _ from 'lodash';
import { onMounted, ref } from 'vue';

const useGame = () => {
   //游戏核心逻辑
}

export default useGame;
```

游戏的核心逻辑其实也不难，主要是打乱素材列表然后导出的逻辑，然后还有一个逻辑，那就是如果用户点击的是2个相同的素材，那么我们需要执行相应的逻辑，比如更改素材列表。

我们一步步来看，首先是第一步，拿到游戏的配置状态，代码如下:

```ts
const { gameConfig } = useConfigStore();
```

接着，我们用一个数组来存储数组列表，并且用另外一个数组用来存储用户点击的素材列表，素材列表的对象有如下几个属性:

* active 表示当前素材是否被选中，用来确定是否添加一个选中样式
* src 表示素材的路径，也就是图片路径
* title? 表示描述素材的标题
* id 唯一标志，uuid
* isMatch 表示是否匹配

这里可能有人疑惑为什么不能用active来同时表示选中和是否匹配，其实增加一个字段来表示是否匹配，我们会更方便写逻辑，因为只有在满足2项选中素材的情况下，我们才需要考虑判断是否匹配。

所以定义好两种数据结构，代码如下:

```ts
const materialDataList = ref<GlobalModule.MaterialData[]>([]);
const activeDataList = ref<GlobalModule.MaterialData[]>([]);
```

下一步，我们还用了两个变量来存储错误和正确的audio对象，用来添加音效，当然其实音效逻辑不应该放在这游戏核心逻辑中。

```ts
const rightAudio = ref<HTMLAudioElement>();
const wrongAudio = ref<HTMLAudioElement>();
```

最后，我们还需要定义一个匹配数用来判断用户是否匹配完成所有的素材，以及一个用来确定游戏状态的值，如下:

```ts
const totalMatch = ref(0);
const gameStatus = ref(gameConfig.gameStatus);
```

接下来的逻辑也就比较简单了，其实就是重复复制素材列表，然后随机打乱顺序，并修改。如下:

```ts
const onStartGame = () => {
    materialDataList.value = _.shuffle(_.flatten(_.times(2, _.constant(gameConfig.materialList.map(item => ({
        src: item.src,
        title: item.title,
        active: false,
        isMatch: false
    })))))).map(item => ({
        id: createUUID(),
        ...item
    }));
}
```

这里使用了lodash的shuffle方法来实现打乱顺序，用了flatten,times,constant方法来实现重复复制，这一段逻辑还确实有点点复杂，主要需要了解lodash的4个方法的使用。

接下来就是游戏的点击逻辑，点击逻辑，我们思考一下，可以先将点击的素材对象添加到数组中去，然后判断点击的素材数组中是否有重复的项。

这里难点就来了，如何判断是否重复？

这里我们用到了一个哈希表的算法，详细算法思路可以参考[剑指offer-查找重复的数字](https://eveningwater.github.io/to-offer/#/codes/1/findRepeatNumber)，我这里就是依据这里来进行稍微的改造，从而实现了算法。代码如下:

```ts
const findRepeatItem = function (arr: GlobalModule.MaterialData[]) {
    const unique = new Set();
    for (const item of arr) {
        if (unique.has(item.src)) {
            return true;
        }
        unique.add(item.src);
    }
    return false;
};
```

点击事件的核心逻辑，其实细细分下来，就主要是2点，添加选中样式，然后判断是否重复，分别执行对应的逻辑。说到这里，相信没有人会看不懂如下代码了:

```ts
const onClickHandler = (block: GlobalModule.MaterialData) => {
    block.active = true;
    // 这里判断如果用户点击的是同一张素材，则下面的逻辑就不执行
    if (activeDataList.value.findIndex(item => item.id === block.id) > -1) {
        return;
    }
    // 添加到选中素材数组中
    activeDataList.value.push(block);
    // 获取正确和错误音效audio元素，并存储到数据中
    if(!rightAudio.value){
        rightAudio.value = document.getElementById('rightAudio') as HTMLAudioElement;
    }
    if(!wrongAudio.value){
        wrongAudio.value = document.getElementById('wrongAudio') as HTMLAudioElement;
    }
    // 判断是否存在重复项
    if (findRepeatItem(activeDataList.value)) {
        // 存在就更改isMatch值，并从选中素材数组中删除对应的值
        materialDataList.value = materialDataList.value.map(item => {
            const index = activeDataList.value.findIndex(active => active.id === item.id);
            if (index > -1) {
                item.isMatch = true;
                activeDataList.value.splice(index, 1);
            }
            return item;
        });
        // 统计匹配的数量，这里加2主要是方便，后面该值等于materialDataList.value.length === 2就代表全部消除完了，游戏胜利
        totalMatch.value += 2;
        // 播放音效
        rightAudio.value?.play();
        wrongAudio.value?.pause();
    } else {
        // 素材列表长度不等于2，就代表用户只点击了一张，无法进行匹配，所以后续逻辑不执行
        if (activeDataList.value.length !== 2) {
            return;
        }
        // 重置选中素材列表以及素材列表的喧哗走过呢状态
        activeDataList.value = [];
        materialDataList.value = materialDataList.value.map(item => ({
            ...item,
            active: false
        }));
        // 播放音效
        rightAudio.value?.pause();
        wrongAudio.value?.play();
    }
}
```

下一步，我们就在mounted挂载钩子函数中调用游戏开始函数，如下:

```ts
onMounted(() => {
    onStartGame();
})
```

最后，我们导出需要用到的东西，如下:

```ts
return {
    materialDataList,
    gameConfig,
    gameStatus,
    totalMatch,
    onClickHandler,
    onStartGame
}
```

合并以上代码，我们的游戏核心逻辑就完成了，到了这里，其实我们本游戏就已经基本完成一半了，让我们继续。

#### 更改根元素字体的函数

继续下一个素材列表页面组件的实现之前，我们先来看如何让页面根据浏览器设备自动更改字体大小的函数。

由于这里采用的是javascript写法，所以我直接写在了index.html文件里面，当然这并不是一个好的方式。

首先定义了一个自调用函数，在javascript中，我们通常是这样些自调用函数的:

```js
(function(){
    //  函数核心代码
})();
```

事实上自调用函数不止可以使用括号包裹，还可以使用感叹号，加号等操作符，这里使用的就是感叹号!。

然后在这个自调用函数当中，传入了2个参数，第一个是window对象，第二个则是配置对象，如下:

```js
!function(win,option){
    //核心代码
}(window,{ designWidth: 750 })
```
然后这个自调用函数可以拆分3部分，第一部分就是初始化变量，第二部分则是更改fontsize的函数，第三部分就是监听事件。我们先来看第一部分的变量初始化:

通过变量的初始化，我们可以看到option配置对象的参数有4个。如下:

```js
var count = 0,
    designWidth = option.designWidth,
    designHeight = option.designHeight || 0,
    designFontSize = option.designFontSize || 100,
    callback = option.callback || null,
    root = document.documentElement,
    body = document.body,
    rootWidth, newSize, t, self;
```

下一个函数，设置字体大小的函数_getNewFontSize，这个函数主要是对字体大小做一个计算，取比例scale与设计图字体的大小相乘，比例可以通过宽度除以设计图宽度或者是高度除以设计图高度即可得到，而设计图宽度和高度就是option配置对象传入的值。代码如下:

```js
function _getNewFontSize() {
    const iw = win.innerWidth > 750 ? 750 : win.innerWidth;
    const scale = designHeight !== 0 ? Math.min(iw / designWidth, win.innerHeight / designHeight) : iw / designWidth;
    return parseInt(scale * 10000 * designFontSize) / 10000;
} 
```

下一步也是一个自调用函数，函数里面，我们做了判断，从而来确定设置字体的大小，代码如下:

```js
!function () {
    rootWidth = root.getBoundingClientRect().width;
    self = self ? self : arguments.callee;
    if (rootWidth !== win.innerWidth && count < 20) {
      win.setTimeout(function () {
        count++;
        self();
      }, 0);
    } else {
      newSize = _getNewFontSize();
      if (newSize + 'px' !== getComputedStyle(root)['font-size']) {
        // 核心代码就这一行
        root.style.fontSize = newSize + "px";
        return callback && callback(newSize);
      };
    };
}();
```

最后监听屏幕旋转事件orientationchange和改变窗口大小事件resize，延迟调用设置字体大小函数即可。代码如下:

```js
win.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
    clearTimeout(t);
    t = setTimeout(function () {
      self();
    }, 200);
}, false);
```

到此为止，这个函数就分析完成了，让我们继续下一步。

#### 素材列表页面组件

素材列表页面组件主要包含3个部分，如下:

* 倒计时
* 素材列表
* 弹框逻辑

本页面采用了浮动和rem布局。根据以上分析，我们的html代码就很简单了，如下:

```html
<div class="bm-container bm-clearfix" :class="{ active:props.active }">
<!-- 倒计时部分 -->
    <div class="bm-start-time">{{ count }}</div>
    <!-- 素材列表部分 -->
    <ul class="bm-game-list bm-clearfix">
        <li class="bm-game-list-item" v-for="item inmaterialDataList" :key="item.id"
            :class="{ active: item.active }" @click="() =>onClickHandler(item)"
            :style="{ opacity: item.isMatch ? 0 : 1 }">
            <img :src="item.src" :alt="item.title" class="bm-game-list-item-image" />
        </li>
    </ul>
    <slot></slot>
    <!-- 弹框组件 -->
    <Modal v-model="showModal" :title="modalTitle" :content="modalContent" :okText="modalOkText"
            @on-ok="onOkHandler" :maskCloseable="false" :show-cancel="false" />
</div>
```

我们用来自父组件的active属性用来确定这个组件是否显示，样式部分其实也没什么好说的，分成了两部分，第一部分是PC端的样式，第二部分则是移动端的样式。代码如下:

```scss
$boxShadowColor: #eee;
$activeBorderColor: #2f3394;
$bgColor: #1f3092;
.#{$prefix}container {
    @include setProperty(position, relative);
    @include setProperty(padding, 0 .1rem .18rem .1rem);
    @include setProperty(left, percentage(.5));
    @include setProperty(top, percentage(.5));
    @include setProperty(width, 10.9rem);
    @include setProperty(height, auto);
    @include setProperty(border-radius, .2rem);
    @include setProperty(transform, translate(-50%, -50%));
    @include setProperty(text-align, center);
    @include setProperty(user-select, none);
    @include setProperty(z-index, 99);
    @include setProperty(background, $bgColor);
    &.active {
        @include setProperty(animation, bounceIn 1s);
        @include setProperty(box-shadow, 0 0 .1rem .1rem $boxShadowColor);
        @keyframes bounceIn {
            from {
                @include setProperty(opacity, 0);
            }
            to {
                @include setProperty(opacity, 1);
            }
        }
    }
    .#{$prefix}start-time {
        @include setProperty(position, absolute);
        @include setProperty(top, -.4rem);
        @include setProperty(color, $white);
        @include setProperty(right, -.5rem);
        @include setProperty(font-size, .28rem);
    }
    .#{$prefix}game-list {
        @include setProperty(width, percentage(1));
        @include setProperty(height, percentage(1));
        @include setProperty(float, left);
        @include setProperty(display, block);
        &-item {
            @include setProperty(float, left);
            @include setProperty(margin, .18rem 0 0 .1rem);
            @include setProperty(width, 1.67rem);
            @include setProperty(height, .9rem);
            @include setProperty(cursor, pointer);
            @include setProperty(border, .03rem solid $white);
            &:hover {
                @include setProperty(box-shadow, 0 0 .2rem $white);
            }
            &.active {
                @include setProperty(border-color, $activeBorderColor);
            }
            &-image {
                @include setProperty(width, percentage(1));
                @include setProperty(height, percentage(1));
                @include setProperty(display, inline-block);
                @include setProperty(vertical-align, top);
            }
        }
    }
}
@media screen and (max-width: 640px) {
    .#{$prefix}container {
        @include setProperty(width, 6rem);
        @include setProperty(padding-bottom, .3rem);
        .#{$prefix}game-list {
            &-item {
                @include setProperty(width, percentage(.3));
                @include setProperty(margin-left, .15rem);
                @include setProperty(margin-top, .3rem);
            }
        }
    }
}
```

都是一些常规的样式布局，我们主要来看一下核心的逻辑，其实核心的逻辑在game.ts里面基本实现了，我们只需要拿出来用即可。

首先是用一个变量存储倒计时的值，其次用一个变量控制弹框组件的显隐，还有3个变量分别代表弹框组件的标题，内容和确定按钮的内容，为什么要用变量代表弹框组件的标题，内容和确定按钮的内容呢？

这里我们的游戏分为两种状态，第一种就是游戏胜利，第二种则是游戏失败，两种状态的反馈提示是不一样的，所以才需要变量来代替。

所以以下代码就比较好理解了。

```ts
import { PropType, ref, watch } from 'vue';
import useGame from '../core/game';
import { CountDown } from '../utils/util';
import Modal from '../components/Modal.vue';
const count = ref<number>();
const showModal = ref(false);
const modalTitle = ref<string>('温馨提示');
const modalContent = ref<string>();
const modalOkText = ref<string>();
```

接下来，我们获取游戏核心逻辑函数中导出的方法和数据，如下:

```ts
const { materialDataList, onClickHandler, gameConfig, totalMatch,onStartGame,gameStatus } = useGame();
```

随后，我们定义一个active的属性，用来确定这个组件是否显示，动画效果已经在scss中实现了，就是渐隐效果，通过类名控制，如以上的模版代码中所写。

接着，我们定义好暴露给父组件的事件，分为3种，游戏结束，游戏胜利和点击弹框确认按钮事件。代码如下:

```ts
const props = defineProps({
    active: {
        type: Boolean as PropType<boolean>
    }
})
const emit = defineEmits(['on-game-over', 'on-win', 'on-ok']);
```

最后，我们监听props.active,如果这个值是true，就代表这个组件显示，也就代表游戏开始，然后我们执行倒计时函数，在倒计时回调函数中，我们通过返回的status是否等于end来判定倒计时时间是否已执行完成，随后我们如前面所说，根据totalMatch是否等于素材列表的长度代表用户是否消除掉所有图片素材，从而确定游戏是否胜利，游戏结束和游戏胜利，我们都要清空倒计时的定时器，并且修改弹框组件的内容和确定按钮的文本，然后暴露出事件传递给父组件，因为父组件可能会在游戏胜利和游戏结束中执行一些逻辑，比如添加音效之类的，所以我们暴露出去。根据这个分析，以下代码就比较好理解了。

```ts
watch(() => props.active, (val) => {
    if (val) {
        CountDown(gameConfig.time, 0, 1, 1000, (res) => {
            count.value = res.value;            
            const isWin = () => totalMatch.value === materialDataList.value.length;
            if (res.status === 'end') {
                if (!isWin()) {
                    showModal.value = true;
                    modalContent.value = `游戏已结束!`;
                    modalOkText.value = '重新开始';
                    res.clear?.();
                    emit('on-game-over');
                }
            } else {
                if (isWin()) {
                    showModal.value = true;
                    modalContent.value = `完成游戏共耗时：${gameConfig.time - count.value}s!`;
                    modalOkText.value = '再玩一次';
                    res.clear?.();
                    emit('on-win');
                }
            }
        });
    }
});
```

然后还有一个逻辑，就是点击确认按钮事件，这个没什么好说的，就是重置游戏的素材列表和一些状态。如下:

```ts
const onOkHandler = () => {
    showModal.value = false;
    onStartGame();
    totalMatch.value = 0;
    emit('on-ok');
}
```

到此为止，这个素材列表组件就完成了，最后一步就是根组件App.vue里面了，这里面主要做一些音效逻辑，我们来详细看一下吧。

#### 根组件里的逻辑实现

根组件主要处理6种音效逻辑，并且用一种状态控制素材列表页面和首页的切换，然后还有一个逻辑，就是使用我们已经封装好的下雪花的逻辑。我们来看模板代码，如下:

```html
<!-- 雪花效果容器元素 -->
<div ref="snow" class="bm-snow"></div>
<!-- 音效元素 -->
<audio :src="bgMusic" ref="bgAudio"></audio>
<audio :src="readyMusic" ref="readyAudio"></audio>
<audio :src="rightMusic" id="rightAudio"></audio>
<audio :src="wrongMusic" id="wrongAudio"></audio>
<audio :src="loseMusic" ref="loseAudio"></audio>
<audio :src="winMusic" ref="winAudio"></audio>
<!-- ready和go组件以及按钮组件 -->
<Ready v-model="countShow" v-show="countShow"></Ready>
<Go v-model="countShow" v-show="countShow"/>
<Button @click="onStart" :style="{ display: countShow ? 'none' : 'block'}"></Button>
<!-- 素材列表组件 -->
<Container 
    v-show="gameStatus === 1"
    :active="gameStatus === 1" 
    @on-game-over="onGameOver" 
    @on-win="onWin" 
    @on-ok="onOkHandler"
></Container>
```

样式也没什么好说的，就是给雪花效果容器元素设置一下，让它撑满全屏即可，用绝对定位。

```scss
.#{$prefix}snow {
    @include setProperty(width,percentage(1));
    @include setProperty(height,percentage(1));
    @include setProperty(position,absolute);
    @include setProperty(z-index,0);
}
```

js逻辑代码也很简单，都是一些资源导入以及变量的初始化，还有就是相关事件的逻辑。看下源码基本很好理解。

```ts
import { onMounted,ref } from 'vue';
import Snow from './utils/snow';
import Button from './components/Button.vue';
import Go from './components/Go.vue';
import Ready from './components/Ready.vue';
import bgMusic from '@/assets/audio/bgMusic.mp3';
import readyMusic from '@/assets/audio/go.mp3';
import rightMusic from '@/assets/audio/right.mp3';
import wrongMusic from '@/assets/audio/wrong.mp3';
import loseMusic from '@/assets/audio/lose.mp3';
import winMusic from '@/assets/audio/win.mp3';
import Container from './views/Container.vue';
import { useConfigStore } from './store/store';
import useGame from './core/game';
// 使用到的游戏配置和游戏状态
const { setGameConfig,gameConfig } = useConfigStore();
const { gameStatus } = useGame();
// 一些状态
const snow = ref<HTMLDivElement>();
const countShow = ref(false);
const bgAudio = ref<HTMLAudioElement>();
const readyAudio = ref<HTMLAudioElement>();
const loseAudio = ref<HTMLAudioElement>();
const winAudio = ref<HTMLAudioElement>();
// 游戏开始
const onStart = () => {
    countShow.value = true;
    readyAudio.value?.play();
    bgAudio.value?.play();
    bgAudio.value?.setAttribute('loop','loop');
    setTimeout(() => {
        setGameConfig({
            ...gameConfig,
            gameStatus: 1
        })
        gameStatus.value = 1;
    },1800);
}
// 关闭背景音效
const onStopMusic = () => {
    bgAudio.value?.pause();
}
// 游戏结束
const onGameOver = () => {
    onStopMusic();
    loseAudio.value?.play();
}
// 游戏胜利
const onWin = () => {
    onStopMusic();
    winAudio.value?.play();
}
// 确认按钮的逻辑
const onOkHandler = () => {
    countShow.value = false;
    gameStatus.value = 0;
}
onMounted(() => {
    // 初始化雪花效果
    if(snow.value){
        const s = new Snow(snow.value!);
        s.init();
    }
});
```


到此为止，我们的连连看小游戏就算是大功告成了，当然我只是完成了一个基础版，我们还可以扩展，比如游戏时间的设置，以及素材列表的设置，那就是再添加一个配置页面，或许到了后面我会扩展也说不一定。


