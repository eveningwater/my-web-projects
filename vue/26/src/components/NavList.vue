<script setup lang="ts">
    import { computed } from '@vue/reactivity';
    import { navList } from '../data/nav';
    import { BASE_URL } from '../data/url';
    const beforeResourceURL = computed(() => navList.map(item => `url(${ BASE_URL + item.icon + ".png"})`));
</script> 
<template>
    <nav class="rna-nav-list">
        <ul>
            <li class="rna-nav-item" v-for="(nav,index) in navList" :key="nav.url + index">
                <a :href="nav.url" target="_blank" rel="noopener noreferrer" class="rna-nav-link">{{ nav.text }}</a>
            </li>
        </ul>
    </nav>
</template>
<style lang="less" scoped>
    @import "../style/variable.less";
    .rna-nav-list {
        position: absolute;
        bottom: 80px;
        left: 0;
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            .rna-nav-item {
                padding: 0 0 0 15px;
                transition: transform .4s ease-in-out;
                transform: translateX(-100%);
                margin: 10px 0;
                &::before {
                    content:"";
                    display: inline-block;
                    width: 25px;
                    height: 25px;
                    margin-right: 15px;
                    background-repeat: no-repeat;
                    background-size: cover;
                    vertical-align: middle;
                }
                &:first-of-type::before {
                    background-image: v-bind("beforeResourceURL[0]");
                }
                &:nth-of-type(2)::before {
                    background-image: v-bind("beforeResourceURL[1]");
                }
                &:last-of-type::before{
                    background-image: v-bind("beforeResourceURL[2]");
                }
                .rna-nav-link {
                    text-decoration: none;
                    color: @link_color;
                }
            }
        }
    }
</style>