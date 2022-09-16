### 实现《羊了个羊-动物版》的小游戏

> 在正文的第一句加入“我正在参加「码上掘金挑战赛」详情请看：[码上掘金挑战赛来了！](https://juejin.cn/post/7139728821862793223)”

这两天火爆全场的《羊了个羊》游戏，相信大家都玩过了，那么在玩这个游戏的同时，我想大家都会好奇这个游戏的实现，本文就带大家使用css,html,js来实现一个动物版的游戏。

首先我用到了2个插件，第一个插件就是[flexible.js](https://github.com/weizihua/flexiblejs),这个插件就是对不同设备设置根元素字体大小，也就是一个移动端的适配方案。

因为这里使用了rem布局，针对移动端做了自适应，所以这里选择采用rem布局方案。

还有一个弹框插件，我很早自行实现的，就是[popbox.js](https://www.eveningwater.com/static/plugin/popbox.min.js),关于这个插件，本文不打算讲解实现原理，只讲解一下使用原理:

```js
ewConfirm({
    title: "温馨提示", //弹框标题
    content: "游戏结束，别灰心，你能行的！", //弹框内容
    sureText: "重新开始", //确认按钮文本
    isClickModal:false, //点击遮罩层是否关闭弹框
    sure(context) {
        context.close();
        //点击确认按钮执行的逻辑
    },//点击确认的事件回调
})
```

引入了这个js之后，会在window对象上绑定一个ewConfirm方法，这个方法传入一个自定义对象，对象的属性有`title,content,sureText,cancelText,cancel,sure,isClickModal`这几个属性，当然这里没有用到cancel按钮，所以不细讲。

正如注释所说，每个属性代表的意思，这里不做赘述。

然后html代码是这样的:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>羊了个羊《动物版》</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
</body>
<script src="https://www.eveningwater.com/static/plugin/popbox.min.js"></script>
<script src="https://www.eveningwater.com/test/demo/flexible.js"></script>
<script src="./script.js"></script>
</html>
```

可以看到html代码是什么都没有的，因为里面的DOM元素，我们都放在js代码里面动态生成了，所以script.js这里的代码是核心，这个后续会讲到，接下来看样式代码，也比较简单。

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body,
html {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

body {
    background: url('https://www.eveningwater.com/my-web-projects/js/21/img/2.gif') no-repeat center / cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ew-box {
    position: absolute;
    width: 8rem;
    height: 8rem;
}

.ew-box-item {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 4px;
    border: 1px solid #535455;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.ew-collection {
    width: 8rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    background: url('https://www.eveningwater.com/static/dist/20d6c430c2496590f224.jpg') no-repeat center/cover;
    position: fixed;
    margin: auto;
    overflow: auto;
    bottom: 10px;
}

.ew-collection > .ew-box-item {
    margin-right: 0.3rem;
}

.ew-left-source,
.ew-right-source {
    width: 2.6rem;
    height: 1.2rem;
    position: absolute;
    top: 0;
}

.ew-left-source {
    left: 0;
}

.ew-right-source {
    right: 0;
}

.ew-shadow {
    box-shadow: 0 0 50px 10px #535455 inset;
}
```

首先是通配选择器'*'代表匹配所有的元素，并且设置样式初始化，然后是html和body元素设置宽高为100%,并且隐藏溢出的内容，然后给body元素设置了一个背景图，并且body元素采用弹性盒子布局，水平垂直居中。

接下来是中间消除的盒子元素box,也很简单就是设置定位，和固定宽高为8rem。

接下来是box-item，代表每一个块元素，也就是消消乐的每一块元素，接着羊了个羊底部有一个存储选中块元素的收集盒子元素，也就是ew-collection,然后是左右的看不到层级的卡牌容器元素。

最后就是为了让块元素看起来有层叠效果而添加的阴影效果。

css核心代码也就比较简单，接下来我们来看javascript代码。

在开始之前，我们需要先导入图片素材列表，这里如下:

```js
const globalImageList = [
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/1.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/2.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/3.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/4.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/5.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/6.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/7.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/8.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/9.jpg',
    'https://www.eveningwater.com/my-web-projects/jQuery/7/img/10.jpg'
]
```

然后在onload也就是页面加载时调用我们封装好的Game类，将这个素材列表传入其中。如下:

```js
window.onload = () => {
    const game = new Game(globalImageList);
}
```

接下来，我们来看Game类的核心代码吧，首先定义这个类:

```js
class Game {
    constructor(originSource, bindElement){
        //核心代码
    }
}
```

这个类名有2个参数，第一个参数就是素材列表，第二个参数则是绑定的DOM元素，默认如果不传入的话，就绑定到document.body上。也因此，我们在构造函数里面初始化一些后续需要用到的变量。如下:

```js
//constructor内部
this.doc = document;
this.originSource = originSource;
this.bindElement = bindElement || this.doc.body;
// 存储随机打乱的元素
this.source = [];
// 存储点击的元素
this.temp = {};
// dom元素
this.box = null; //存储消消乐块元素的容器盒子元素
this.leftSource = null; //左边素材容器元素
this.rightSource = null; //右边素材容器元素
this.collection = null; //收集素材的容器元素
// 需要调用bind方法修改this指向
this.init().then(this.startHandler.bind(this)); //startHandler为游戏开始的核心逻辑函数，init初始化方法
```

这里存储了document对象，存储了原始素材列表，以及绑定的dom元素，然后还定义了source用来存储被打乱后的素材列表，以及temp用来存储点击的元素，方便做消除，添加阴影这些操作。

还有四个变量，其实也就是存储dom元素的，如注释所述。


接下来init方法就是做初始化的一些操作，这个方法返回一个Promise所以才能调用then方法，然后startHandler是游戏开始的核心逻辑函数，这个后面会讲到，注意这里有一个有意思的点，那就是bind(this),因为在then方法内部的this并不是指Game这个实例，所以需要调用bind方法修改this绑定，接下来我们来看init方法做了什么。

```js
init() {
    return new Promise(resolve => {
        const template = `<div class="ew-box" id="ew-box"></div>
        <div class="ew-left-source" id="ew-left-source"></div>
        <div class="ew-right-source" id="ew-right-source"></div>
        <div class="ew-collection" id="ew-collection"></div>`;
        const div = this.create('div');
        this.bindElement.insertBefore(div, document.body.firstChild);
        this.createElement(div, template);
        div.remove();
        resolve();
    })
}
```

很显然这个方法如前所述返回了一个Promise,内部定义了template模板代码，也就是页面的结构，然后调用create方法创建一个容器元素，并且向body元素的首个子元素之前插入这个元素，然后在这个容器元素之前插入创建好的页面结构，删除这个容器元素，并且resolve出去,从而达到将页面元素添加到body元素内部。这里涉及到了两个工具函数，我们分别来看看它们，如下:

```js
create(name) {
    return this.doc.createElement(name);
}
```

create方法其实也就是调用createElement方法来创建一个DOM元素,this.doc指的就是document文件对象，也就是说，create方法只是document.createElement的一个封装而已。来看createElement方法。

```js
createElement(el, str) {
    return el.insertAdjacentHTML('beforebegin', str);
}
```

createElement方法传入2个参数，第一个参数是一个DOM元素，第二个参数是一个DOM元素字符串，表示在第一个DOM元素之前插入传入的模板元素。这个方法可以参考[code-segment](https://eveningwater.github.io/code-segment/#/codes/javascript/insertBefore)。

init方法说白了就是动态创建元素的一个实现，接下来就是startHandler函数的实现。

```js
startHandler() {
    this.box = this.$('#ew-box');
    this.leftSource = this.$('#ew-left-source');
    this.rightSource = this.$('#ew-right-source');
    this.collection = this.$('#ew-collection');
    this.resetHandler();
    //后续还有逻辑
}
```

startHandler是核心实现，所以不可能只有上面那么点代码，但是我们要写一步步的拆分，以上的代码就做了2个逻辑，获取DOM元素和重置。这里涉及到了一个$方法，如下:

```js
$(selector, el = this.doc) {
    return el.querySelector(selector);
}
```

$方法传入2个参数，第一个参数为选择器，是一个字符串，第二个参数为DOM元素，实际上就是document.querySelector的一个封装。当然还有一个$$方法，类似，如下:

```js
$$(selector, el = this.doc) {
    return el.querySelectorAll(selector);
}
```

接下来是resetHandler方法，如下:

```js
resetHandler() {
    this.box.innerHTML = '';
    this.leftSource.innerHTML = '';
    this.rightSource.innerHTML = '';
    this.collection.innerHTML = '';
    this.temp = {};
    this.source = [];
}
```

可以看到resetHandler方法确实是如其定义的那样，就是做重置的，我们要重置用到的数据以及DOM元素的子节点。

让我们继续，在startHandler也就是resetHandler方法的后面，添加这样的代码:

```js
startHandler() {
    this.box = this.$('#ew-box');
    this.leftSource = this.$('#ew-left-source');
    this.rightSource = this.$('#ew-right-source');
    this.collection = this.$('#ew-collection');
    this.resetHandler();
    for (let i = 0; i < 12; i++) {
        this.originSource.forEach((src, index) => {
            this.source.push({
                src,
                index
            })
        })
    }
    this.source = this.randomList(this.source);
    //后续还有逻辑
}
```

可以看到这里实际上就是对素材数据做了一个添加和转换操作，randomList方法顾名思义，就是打乱素材列表的顺序。让我们来看这个工具方法的源码:

```js
/**
* 打乱顺序
* @param {*} arr 
* @returns 
*/
randomList(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i >= 0; i--) {
        const index = Math.floor(Math.random() * i + 1);
        const next = newArr[index];
        newArr[index] = newArr[i];
        newArr[i] = next;
    }
    return newArr;
}
```

这个函数的作用就是将素材列表随机打乱以达到随机的目的，接下来，让我们继续。

```js
startHandler() {
    this.box = this.$('#ew-box');
    this.leftSource = this.$('#ew-left-source');
    this.rightSource = this.$('#ew-right-source');
    this.collection = this.$('#ew-collection');
    this.resetHandler();
    for (let i = 0; i < 12; i++) {
        this.originSource.forEach((src, index) => {
            this.source.push({
                src,
                index
            })
        })
    }
    this.source = this.randomList(this.source);
    //后续还有逻辑
    for (let k = 5; k > 0; k--) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < k; j++) {
                const item = this.create('div');
                item.setAttribute('x', i);
                item.setAttribute('y', j);
                item.setAttribute('z', k);
                item.className = `ew-box-item ew-box-${i}-${j}-${k}`;
                item.style.position = 'absolute';
                const image = this.source.splice(0, 1);
                // 1.44为item设置的宽度与高度
                item.style.left = 1.44 * j + Math.random() * .1 * k + 'rem';
                item.style.top = 1.44 * i + Math.random() * .1 * k + 'rem';
                item.setAttribute('index', image[0].index);
                item.style.backgroundImage = `url(${image[0].src})`;
                const clickHandler = () => {
                    // 如果是在收集框里是不能够点击的
                    if(item.parentElement.className === 'ew-collection'){
                        return;
                    }
                    // 没有阴影效果的元素才能够点击
                    if (!item.classList.contains('ew-shadow')) {
                        const currentIndex = item.getAttribute('index');
                        if (this.temp[currentIndex]) {
                            this.temp[currentIndex] += 1;
                        } else {
                            this.temp[currentIndex] = 1;
                        }
                        item.style.position = 'static';
                        this.collection.appendChild(item);
                        // 重置阴影效果
                        this.$$('.ew-box-item',this.box).forEach(item => item.classList.remove('ew-shadow'));
                        this.createShadow();
                        // 等于3个就消除掉
                        if (this.temp[currentIndex] === 3) {
                            this.$$(`div[index="${currentIndex}"]`, this.collection).forEach(item => item.remove());
                            this.temp[currentIndex] = 0;
                        }
                        let num = 0;
                        for (let i in this.temp) {
                            num += this.temp[i];
                        }
                        if (num > 7) {
                            item.removeEventListener('click', clickHandler);
                            this.gameOver();
                        }
                    }
                }
                item.addEventListener('click', clickHandler)
                this.box.append(item);
            }
        }
    }
}
```

这里的代码很长，但是总结下来就二点，添加块元素，并为每个块元素绑定点击事件。我们知道羊了个羊每一个消除的块元素都会有层叠的效果，那么我们这里也要实现同样的效果，如何实现呢？

答案就是定位，我们应该知道定位会分为层级关系，层级越高就会占上面，这里也是采用同样的道理，这里之所以用3个循环，就是盒子元素是分成5行5列的，所以也就是为什么循环是5的原因。

然后在循环内部，我们就是创建每一个块元素，每个元素都设置了x,y,z三个属性，并且还添加了`ew-box-${i}-${j}-${k}`类名,很显然这里的x,y,z属性和这个类名关联上了，这方便我们后续对元素进行操作。

同样的每个块元素我们也设置了样式,类名是'ew-box-item',同样的每个块元素也设置为绝对定位。

> PS: 大家可能有些好奇为什么每个元素我都加一个'ew-'的前缀，其实也就是我个人喜欢给自己写的代码加的一个前缀，代表这是我自己写的代码的一个标志。

接下来从素材列表中取出单个素材，取出的数据结构应该是{ src:'图片路径',index:'索引值' }这样。然后将该元素设置背景图，就是素材列表的图片路径，以及index属性，还有left和top偏移值，这里的left和top偏移值之所以是随机的，也就是因为每一个块元素都是随机的。

接下来是clickHandler也就是点击块元素执行的回调，这个我们先不详细叙述，我们继续往后看，就是为该元素添加事件，利用addEventListener方法，并且将块元素添加到box盒子元素中。

让我们继续来看clickHandler函数内部。

首先这里有这样一个判断:

```js
if(item.parentElement.className === 'ew-collection'){
    return;
}
```

很简单，当我们的收集框里面点击该元素，是不能触发点击事件的，所以这里要做判断。

然后又是一个判断，有阴影效果的都是多了一个类名'ew-shadow',有阴影效果代表它的层级最小，被叠加遮盖住了，所以无法被点击。

接下来获取当前点击块元素的index索引值，这也是为什么在添加块元素之前会设置一个index属性的原因。

然后判断点击的次数，如果点击的是同一个，则在temp对象里面存储点击的索引值，否则点击的是不同的块元素，索引值就是1。

然后将该元素的定位设置为静态定位，也就是默认值，并且添加到收集框容器元素当中去。

接下来就是重置阴影效果，并且重新添加阴影效果。这里有一个createShadow方法，让我们来揭开它的神秘面纱。如下:

```js
createShadow(){
    this.$$('.ew-box-item',this.box).forEach((item,index) => {
        let x = item.getAttribute('x'),
            y = item.getAttribute('y'),
            z = item.getAttribute('z'),
            ele = this.$$(`.ew-box-${x}-${y}-${z - 1}`),
            eleOther = this.$$(`.ew-box-${x + 1}-${y + 1}-${z - 1}`);
        if (ele.length || eleOther.length) {
            item.classList.add('ew-shadow');
        }
    })
}
```

这里很显然通过获取x,y,z属性设置的类名来确定是否需要添加阴影，因为通过这三个属性值可以确定元素的层级，如果不是在最上方，就能够获取到该元素，所以就添加阴影。注意$$方法返回的是一个NodeList集合，所以可以拿到length属性。

接下来就是通过存储的索引值等于3个，代表选中了3个相同的块，那就要从收集框里面移除掉该三个块元素，并且重置对应的index索引值为0。

接下来的for...in循环所做的操作当然是统计收集框里面的块元素，如果达到了7个代表槽位满了，然后游戏结束，并且移除块元素的点击事件。我们来看游戏结束这个方法的实现:

```js
gameOver() {
    const self = this;
    ewConfirm({
        title: "温馨提示",
        content: "游戏结束，别灰心，你能行的！",
        sureText: "重新开始",
        isClickModal:false,
        sure(context) {
            context.close();
            self.startHandler();
        }
    })
}
```

这也是最开始提到的弹框插件的用法，在点击确认的回调里面调用startHandler方法表示重新开始游戏，这没什么好说的。

到这里，我们实现了中间盒子元素的每一个块元素与槽位容器元素的对应逻辑，接下来还有2点，那就是被遮盖看不到层级的两边块元素集合。所以继续看startHandler后续的逻辑。

```js
startHandler() {
    this.box = this.$('#ew-box');
    this.leftSource = this.$('#ew-left-source');
    this.rightSource = this.$('#ew-right-source');
    this.collection = this.$('#ew-collection');
    this.resetHandler();
    for (let i = 0; i < 12; i++) {
        this.originSource.forEach((src, index) => {
            this.source.push({
                src,
                index
            })
        })
    }
    this.source = this.randomList(this.source);
    for (let k = 5; k > 0; k--) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < k; j++) {
                const item = this.create('div');
                item.setAttribute('x', i);
                item.setAttribute('y', j);
                item.setAttribute('z', k);
                item.className = `ew-box-item ew-box-${i}-${j}-${k}`;
                item.style.position = 'absolute';
                const image = this.source.splice(0, 1);
                // 1.44为item设置的宽度与高度
                item.style.left = 1.44 * j + Math.random() * .1 * k + 'rem';
                item.style.top = 1.44 * i + Math.random() * .1 * k + 'rem';
                item.setAttribute('index', image[0].index);
                item.style.backgroundImage = `url(${image[0].src})`;
                const clickHandler = () => {
                    // 如果是在收集框里是不能够点击的
                    if(item.parentElement.className === 'ew-collection'){
                        return;
                    }
                    // 没有阴影效果的元素才能够点击
                    if (!item.classList.contains('ew-shadow')) {
                        const currentIndex = item.getAttribute('index');
                        if (this.temp[currentIndex]) {
                            this.temp[currentIndex] += 1;
                        } else {
                            this.temp[currentIndex] = 1;
                        }
                        item.style.position = 'static';
                        this.collection.appendChild(item);
                        // 重置阴影效果
                        this.$$('.ew-box-item',this.box).forEach(item => item.classList.remove('ew-shadow'));
                        this.createShadow();
                        // 等于3个就消除掉
                        if (this.temp[currentIndex] === 3) {
                            this.$$(`div[index="${currentIndex}"]`, this.collection).forEach(item => item.remove());
                            this.temp[currentIndex] = 0;
                        }
                        let num = 0;
                        for (let i in this.temp) {
                            num += this.temp[i];
                        }
                        if (num >= 7) {
                            item.removeEventListener('click', clickHandler);
                            this.gameOver();
                        }
                    }
                }
                item.addEventListener('click', clickHandler)
                this.box.append(item);
            }
        }
    }
    //从这里开始分析
    let len = Math.ceil(this.source.length / 2);
    this.source.forEach((item, index) => {
        let div = this.create('div');
        div.classList.add('ew-box-item')
        div.setAttribute('index', item.index);
        div.style.backgroundImage = `url(${item.src})`;
        div.style.position = 'absolute';
        div.style.top = 0;
        if (index > len) {
            div.style.right = `${(5 * (index - len)) / 100}rem`;
            this.rightSource.appendChild(div);
        } else {
            div.style.left = `${(5 * index) / 100}rem`;
            this.leftSource.appendChild(div)
        }
        const clickHandler = () => {
            if(div.parentElement.className === 'ew-collection'){
                return;
            }
            const currentIndex = div.getAttribute('index');
            if (this.temp[currentIndex]) {
                this.temp[currentIndex] += 1;
            } else {
                this.temp[currentIndex] = 1;
            }
            div.style.position = 'static';
            this.collection.appendChild(div);
            if (this.temp[currentIndex] === 3) {
                this.$$(`div[index="${currentIndex}"]`, this.collection).forEach(item => item.remove());
                this.temp[currentIndex] = 0;
            }
            let num = 0;
            for (let i in this.temp) {
                num += this.temp[i];
            }
            if (num >= 7) {
                div.removeEventListener('click', clickHandler);
                this.gameOver();
            }
        }
        div.addEventListener('click', clickHandler);
    });
    this.createShadow();
}
```

这里很显然取的是source素材列表的一般来分别生成对应的左右素材列表，同理，这里面的块元素点击事件逻辑应该是和块容器元素里面的逻辑是很相似的，所以没什么好说的。我们主要看以下这段代码:

```js
let div = this.create('div');
div.classList.add('ew-box-item');
div.setAttribute('index', item.index);
div.style.backgroundImage = `url(${item.src})`;
div.style.position = 'absolute';
div.style.top = 0;
if (index > len) {
    div.style.right = `${(5 * (index - len)) / 100}rem`;
    this.rightSource.appendChild(div);
} else {
    div.style.left = `${(5 * index) / 100}rem`;
    this.leftSource.appendChild(div)
}
```

其实这里也很好理解,也就是同样的创建块元素，这里根据index > len来确定是添加到右边素材容器元素还是左边素材元素,并且它们的top偏移量应该是一致的，主要不同在left和right而已，计算方式也很简单。

注意这里是不需要设置x,y,z属性的，因为不需要用到设置阴影的函数。

到此为止，我们一个《羊了个羊——动物版》的小游戏就完成了。

## 最后

如有兴趣可以参考[源码](https://github.com/eveningwater/my-web-projects/tree/master/js/116)。

[在线示例](https://www.eveningwater.com/my-web-projects/js/116/)

最后谢谢大家观看，如果觉得本文有帮助到你，望不吝啬点赞和收藏，动动小手点star,嘿嘿。



