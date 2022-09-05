<template>
    <header class="vt-header">
        <span class="vt-title">当前翻译语言类型:</span>
        <span class="vt-result">{{ getCurrentLabel }}</span>
        <div class="vt-lang-panel-container">
            <i class="vt-iconfont vt-menu vt-more" v-show="isShowMenu" @click="showPanel = !showPanel"></i>
            <transition name="vt-fade">
                <ul class="vt-lang-panel" v-show="showPanel" v-click-outside="onClickOutside">
                    <li class="vt-li" v-for="(item, index) in langList" :key="item.value + index"
                        :class="{ 'checked': (currentLang === item.value) }" @click="onChangeHandler(item)">{{ item.label
                        }}</li>
                </ul>
            </transition>
        </div>
    </header>
</template>
<script>
import { isMobile } from "../utils/util"
import style from "../style/app.js"
import styleMobile from "../style/app-mobile.js"
import ClickOutside from "../directives/clickoutside"
export default {
    name: "VtHeader",
    directives: {
        ClickOutside
    },
    data() {
        return {
            langList: [
                {
                    value: "en",
                    label: "英语"
                },
                {
                    value: "zh",
                    label: "汉语"
                },
                {
                    value: "jp",
                    label: "日语"
                },
                {
                    value: "kor",
                    label: "韩语"
                },
                {
                    value: "fra",
                    label: "法语"
                },
                {
                    value: "ru",
                    label: "俄语"
                },
                {
                    value: "de",
                    label: "德语"
                }
            ],
            currentLang: "en",
            isShowMenu: false,
            showPanel: true,
            styleContainer: null
        }
    },
    mounted() {
        this.createStyle()
        this.onResizeHandler();
        window.addEventListener("resize", this.onResizeHandler);
    },
    computed: {
        getCurrentLabel() {
            const find = this.langList.find(i => i.value === this.currentLang);
            return find && find.label;
        }
    },
    methods: {
        isLoadMobile() {
            return (document.body.clientWidth || document.documentElement.clientWidth) > 1132;
        },
        createStyle() {
            const el = document.createElement("style");
            el.id = "appStyle";
            if (!document.querySelector("#appStyle")) {
                document.querySelector("head").appendChild(el);
            }
            this.styleContainer = el;
        },
        onChangeHandler(item) {
            this.currentLang = item.value;
            this.$emit("on-change", item);
        },
        onResizeHandler() {
            this.isShowMenu = !!isMobile() || !this.isLoadMobile();
            this.showPanel = !isMobile() || this.isLoadMobile();
            if (this.styleContainer) {
                this.styleContainer.innerHTML = isMobile() || !this.isLoadMobile() ? styleMobile : style;
            }
        },
        onClickOutside() {
            // eslint-disable-next-line no-console
            if (!!isMobile() || !this.isLoadMobile()) {
                this.showPanel = false;
            }
        }
    }
}
</script>
<style scoped>
.vt-fade-enter-active,
.vt-fade-leave-active {
    transition: opacity .5s;
}

.vt-fade-enter,
.vt-fade-leave-to {
    opacity: 0;
}
</style>