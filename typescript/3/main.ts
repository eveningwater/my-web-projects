import "./style.less";
interface FoodElementType {
    left: number;
    top: number;
    text: string;
    color: string;
}
interface renderData {
    currentTime: string;
    whatEat: string;
    eatFood: string;
    btnText: string;
    foodElementList: Array<FoodElementType>;
}
interface OptionsType {
    lazy?: boolean;
}
class WhatToEat {
    private static morningFoods: string = `牛奶 豆浆 油条 面包 稀饭 馒头 花卷 玉米饼 桂花糕 包子 驴肉火烧 煎饼 手抓饼`;
    private static noonFoods: string = `馄饨 拉面 烩面 热干面 刀削面 油泼面 炸酱面 炒面 重庆小面 米线 酸辣粉 
     土豆粉 螺狮粉 凉皮儿 麻辣烫 肉夹馍 羊肉汤 炒饭 盖浇饭 卤肉饭 烤肉饭 黄焖鸡米饭 
     驴肉火烧 川菜 麻辣香锅 火锅 酸菜鱼 烤串 披萨 烤鸭 汉堡 炸鸡 寿司 蟹黄包 煎饼果子 生煎 炒年糕`;
    private static eveningFoods: string = `火锅 川菜 烤肉 柴火鸡 抄手 杂酱面 盖饭 炒饭 烧烤 便当`;
    private static whatEatType: Array<string> = ["早上", "中午", "晚上"];
    private static colorList: Array<string> = [
      "red",
      "orange",
      "#2396ef",
      "#4097ef",
      "#fff",
      "#9744ee",
      "#ff4500",
      "#ff8c00",
      "#ffd700",
      "#90ee90",
      "#00ced1",
      "#1e90ff",
      "#c71585",
      "rgba(255, 69, 0, 0.68)",
      "rgba(255, 120, 0, 1)",
      "rgba(51, 100, 98, 1)",
      "rgba(120, 40, 94, 0.5)",
      "hsl(181, 100%, 37%)",
      "hsla(209, 100%, 56%, 0.73)",
      "#c7158577",
    ];
    private activeEffect;
    private effectMap: WeakMap<any, any> = new WeakMap();
    private container: HTMLElement | Element;
    private renderData: renderData = this.reactive({
        currentTime: "",
        whatEat: "",
        eatFood: "",
        foodElementList: [],
    });
    private timer: NodeJS.Timeout | null = null;
    private count: number = 0;
    private num: number = 0;
    private isStart: boolean = false;
    private stop: boolean = false;
    constructor(container: HTMLElement | string | Element) {
        this.container = typeof container === "string" ? this.$(container) : container;
        this.mount();
        // 初始化时间
        this.initTime(false).then((value: string) => {
          this.renderData.currentTime = value;
        });
        const btn = this.$(".eat-start-btn");
        btn.addEventListener("click", () => {
            if(!this.renderData.currentTime){
               return alert("还没有到开饭时间，请等到开饭时间再来吧!");
            }
            this.isStart = !this.isStart;
            if (this.num <= 4) {
              if (this.isStart) {
                  this.stop = false;
                  btn.textContent = "停止!";
                  this.selectRandom();
              } else {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.stop = true;
                if (this.num !== 0) {
                    btn.textContent = "不行?换一个!";
                }
              }
              this.num++;
            } else {
              btn.textContent = "这么作?那就别吃了!";
              this.stop = false;
              if (this.timer) {
                  clearTimeout(this.timer);
                  this.timer = null;
              }
              setTimeout(() => {
                  this.isStart = false;
              }, 2000);
              setTimeout(() => {
                  btn.remove();
                  this.num = 0;
              }, 5000);
            }
        });
  }
  removeFood() {
    for (let i = 0, len = this.renderData.foodElementList.length;i < len;i++) {
        setTimeout(() => this.renderData.foodElementList.pop(), 1000 * i);
    }
  }
  initTime(status: boolean) {
    return new Promise((resolve) => {
      let currentTime: string = "";
      const date = new Date().getHours();
      const morningFoods = WhatToEat.morningFoods.split(" ");
      const noonFoods = WhatToEat.noonFoods.split(" ");
      const eveningFoods = WhatToEat.eveningFoods.split(" ");
      if (date >= 7 && date <= 8) {
          currentTime = WhatToEat.whatEatType[0];
          if (status) {
              this.renderData.foodElementList = morningFoods.map((food) => this.createFood(food));
          }
      } else if (date >= 12 && date <= 13) {
          currentTime = WhatToEat.whatEatType[1];
          if (status) {
            this.renderData.foodElementList = noonFoods.map((food) => this.createFood(food));
          }
      } else if (date >= 18 && date <= 19) {
          currentTime = WhatToEat.whatEatType[2];
          if (status) {
            this.renderData.foodElementList = eveningFoods.map((food) => this.createFood(food));
          }
      } else {
          currentTime = "";
          this.renderData.foodElementList = [];
          this.renderData.whatEat = `还没有到开饭时间，请等到开饭时间再来吧!科学建议吃饭时间:早餐:7:00 ~ 9:00,午餐:12:00 ~ 14:00,晚餐:18:00 ~ 20:00，请遵守规则。`;
      }
      if (currentTime) {
          this.renderData.whatEat = "吃什么,吃什么?";
          this.removeFood();
      }
      resolve(currentTime);
    });
  }
  createFood(food) {
    const colorList = WhatToEat.colorList;
    return {
        text: food,
        left: this.random(window.innerWidth) - 14 * food.length, //default font-size is 14
        top: this.random(window.innerHeight) - 14 * food.length,
        color: colorList[this.random(colorList.length)],
    };
  }
  $(v: string, el: HTMLElement | Document | Element = document) {
      return el.querySelector(v);
  }
  $$(v: string, el: HTMLElement | Document | Element = document) {
      return el.querySelectorAll(v);
  }
  isObject<T>(value: T) {
      return typeof value === "object" && !!value;
  }
  track(target: any, key: string) {
      let depsMap = this.effectMap.get(target);
      if (!depsMap) {
        this.effectMap.set(target, (depsMap = new Map()));
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, (dep = new Set()));
      }
      if (!dep.has(this.activeEffect)) {
        dep.add(this.activeEffect);
      }
  }
  trigger(target: any, key: string) {
      const depsMap = this.effectMap.get(target);
      if (!depsMap) {
        return;
      }
      depsMap.get(key) && depsMap.get(key).forEach((effect: Function) => effect && effect());
  }
  effect(handler: Function, options: OptionsType = {}) {
      const __effect = (...args) => {
        this.activeEffect = __effect;
        return handler(...args);
      };
      if (!options.lazy) {
        __effect();
      }
      return __effect;
  }
  reactive(data: Object) {
      if (!this.isObject(data)) {
        return console.error("[whatToEat warning]: the reactive data must be an object!");
      }
      const that = this;
      return new Proxy(data, {
        get(target, key, receiver) {
            const ret = Reflect.get(target, key, receiver);
            that.track(target, key as string);
            return that.isObject(ret) ? that.reactive(ret) : ret;
        },
        set(target, key, val, receiver) {
            Reflect.set(target, key, val, receiver);
            that.trigger(target, key as string);
            return true;
        },
        deleteProperty(target, key) {
            const ret = Reflect.deleteProperty(target, key);
            that.trigger(target, key as string);
            return ret;
        },
      });
  }
  mount() {
      this.effect(() => {
          this.renderData && this.update();
      });
      this.update();
  }
  update() {
      if (this.stop) {
          const eatFoods = this.$$(".eat-wrapper .eat-random-food");
          if (eatFoods.length) {
              eatFoods.forEach((food) => food.remove());
          }
          return;
      }
      this.container.innerHTML = this.render();
  }
  selectRandom() {
    this.initTime(true).then((value: string) => {
        this.renderData.currentTime = value;
    }).then(() => {
        const { foodElementList } = this.renderData;
        this.count = this.randomRange(1, foodElementList.length - 1);
        this.renderData.eatFood = foodElementList[this.count].text;
        this.timer = setTimeout(() => {
          this.selectRandom();
        }, 100);
    });
  }
  randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  random(value: number) {
    return Math.floor(Math.random() * value);
  }
  render() {
    let foodElementHTML = this.renderData.foodElementList.reduce((res: string, item: FoodElementType) => {
        res += `<span 
          style="left:${item.left}px;top:${item.top}px;color:${item.color};position:absolute;" 
          class="eat-random-food">${item.text}</span>`;
        return res;
      },"");
    return `
      <div class="eat-wrapper">
           ${foodElementHTML}
           <h1 class="eat-h1" align="center">
              <span class="eat-time">${this.renderData.currentTime}</span>
              ${this.renderData.whatEat}
           </h1>
           <br>
           <br>
           <p class="eat-food">${this.renderData.eatFood}</p>
           <a href="https://github.com/eveningwater/my-web-projects/tree/master/typescript/3/" target="_blank" rel="noopener noreferrer" class="eat-github">fork me!</a>
      </div>
    `;
  }
}
new WhatToEat(".content");
