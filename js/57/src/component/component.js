import { hasClass } from "../util";

export default class Component {
    constructor(data) {
        // 数据的传递
        this.props = {
            data
        };
    }
    /**
     * 创建模板
     */
    create() {
        const html = this.render();
        const $container = document.createElement("div");
        $container.innerHTML = html;

        // 将该元素的子元素绑定到$el属性上
        this.$el = $container.firstElementChild;
    }
    /**
     * 挂载
     * @param {*} $container 
     */
    mount($container) {
        // 如果不存在$el，则创建模板，否则将该元素添加到挂载元素中
        if (!this.$el) {
            this.create();
        }
        // 这里主要将tab导航元素添加到body元素的第一行
        if($container.tagName.toLowerCase() === 'body' && hasClass(this.$el,'tab-container')){
            $container.insertBefore(this.$el,$container.firstElementChild);
        }else{
            $container.appendChild(this.$el);
        }
    }
    /**
     * 渲染
     * @returns 
     */
    render() {
        return null;
    }
}