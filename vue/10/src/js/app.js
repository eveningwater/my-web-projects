import ResumeEditor from "../components/resumeEditor";
import StyleEditor from "../components/styleEditor";
import BottomNav from "../components/bottomNav";
import fullStyle from "./style.js";
import my from "./my.js";
export default {
    name: "app",
    components: {
        ResumeEditor,
        StyleEditor,
        BottomNav
    },
    directives: {
        // 只允许输入数字
        number: {
            inserted(el, binding, vnode) {
                el.oninput = e => {
                    if (
                        isNaN(Number(e.target.value)) ||
                        Number(e.target.value) > 100 ||
                        Number(e.target.value) < 1
                    ) {
                        e.target.value = vnode.context.speed = "";
                        return;
                    }
                };
            }
        }
    },
    data() {
        return {
            interval: 50, //写入字的速度
            speed: 50,
            currentStyle: {
                code: ""
            },
            enableHtml: false, //是否打造成HTML网页
            fullStyle: fullStyle,
            currentMarkdown: "",
            fullMarkdown: my,
            timer: null,
            isDown: false
        };
    },
    created() {
        this.makeResume();
    },
    mounted() { },
    methods: {
        updateSpeed() {
            this.interval = this.speed;
        },
        // 暂停动画
        pauseAnimation(bool) {
            if (bool && this.timer) {
                clearTimeout(this.timer);
            } else {
                this.makeResume();
            }
        },
        // 快速跳过动画
        skipAnimation() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            let str = "";
            this.fullStyle.map(f => {
                str += f;
            });
            setTimeout(() => {
                this.$set(this.currentStyle, "code", str);
            }, 100);
            this.currentMarkdown = my;
            this.enableHtml = true;
            this.$refs.styleEditor.goBottom();
            this.$refs.resumeEditor.goBottom();
            this.$refs.bottomNav.playMusic();
        },
        // 加载动画
        makeResume: async function () {
            await this.writeShowStyle(0);
            await this.writeShowResume();
            await this.writeShowStyle(1);
            await this.writeShowHtml();
            await this.writeShowStyle(2);
            await this.$nextTick(() => {
                this.$refs.bottomNav.playMusic();
            });
        },
        // 打造成HTML网页
        writeShowHtml: function () {
            return new Promise((resolve, reject) => {
                this.enableHtml = true;
                resolve();
            });
        },
        // 写入css代码
        writeShowStyle(n) {
            return new Promise((resolve, reject) => {
                let showStyle = async function () {
                    let style = this.fullStyle[n];
                    if (!style) return;
                    //计算出数组每一项的长度
                    let length = this.fullStyle
                        .filter((f, i) => i <= n)
                        .map(it => it.length)
                        .reduce((t, c) => t + c, 0);
                    //当前要写入的长度等于数组每一项的长度减去当前正在写的字符串的长度
                    let prefixLength = length - style.length;
                    if (this.currentStyle.code.length < length) {
                        let l = this.currentStyle.code.length - prefixLength;
                        let char = style.substring(l, l + 1) || " ";
                        this.currentStyle.code += char;
                        if (style.substring(l - 1, l) === "\n" && this.$refs.styleEditor) {
                            this.$nextTick(() => {
                                this.$refs.styleEditor.goBottom();
                            });
                        }
                        this.timer = setTimeout(showStyle, this.interval);
                    } else {
                        resolve();
                    }
                }.bind(this);
                showStyle();
            });
        },
        // 写入简历
        writeShowResume() {
            return new Promise((resolve, reject) => {
                let length = this.fullMarkdown.length;
                let showResume = () => {
                    if (this.currentMarkdown.length < length) {
                        this.currentMarkdown = this.fullMarkdown.substring(
                            0,
                            this.currentMarkdown.length + 1
                        );
                        let lastChar = this.currentMarkdown[
                            this.currentMarkdown.length - 1
                        ];
                        let prevChar = this.currentMarkdown[
                            this.currentMarkdown.length - 2
                        ];
                        if (prevChar === "\n" && this.$refs.resumeEditor) {
                            this.$nextTick(() => {
                                this.$refs.resumeEditor.goBottom();
                            });
                        }
                        this.timer = setTimeout(showResume, this.interval);
                    } else {
                        resolve();
                    }
                };
                showResume();
            });
        }
    }
};