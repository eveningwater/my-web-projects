<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineAsyncComponent, ref } from 'vue';
import axios from "axios";
import gpInput from './components/gp-input.vue';
import { api } from './utils/const';
const asyncTitle = defineAsyncComponent(() => import("./components/Title.vue"));
const requestErrorMessage = ref("");
const startRequest = ref(false);
const repoList = ref<Array<{ href:string,text:string }>>([]);
interface CardInfoType {
    [propName: string]:any
}
const cardInfo = ref<CardInfoType>({});
const getRepo = async (value:string) => {
    try {
        const { data } = await axios(api + value + "/repos?sort=created");
        repoList.value = data.slice(0,5).map((item:CardInfoType) => ({ href:item.html_url,text:item.name }));
    } catch (error) {
        if((error as any).response.status === 404){
            requestErrorMessage.value = "查询仓库出错!";
        }
    }
}
const getUser = async (value:string) => {
    try {
        const res = await fetch(api + value);
        const data = await res.json();
        startRequest.value = true;
        if(!data.id){
            requestErrorMessage.value = "查无此用户";
            return;
        }
        requestErrorMessage.value = "";
        cardInfo.value = data;
        getRepo(value);
    } catch (error) {
        if((error as any).response.status === 404){
            requestErrorMessage.value = "查询用户出错!";
        }
    }
}
const onKeydownHandler = (e:KeyboardEvent) => {
    if(e.keyCode === 13){
        getUser((e.target as HTMLInputElement).value.trim());
        setTimeout(() => (e.target as HTMLInputElement).value = "",1000);
    }
}
</script>

<template>
    <div class="gp-search-input">
        <gp-input placeHolder="请输入需要搜索的github用户" @on-keydown="onKeydownHandler"></gp-input>
    </div>
    <main class="gp-main">
        <div class="gp-card gp-error-card" v-if="requestErrorMessage && startRequest">
            <p>{{ requestErrorMessage }}</p>
        </div>
        <div class="gp-card" v-else-if="!requestErrorMessage && startRequest">
            <div class="gp-card-avatar">
                <img :src="cardInfo.avatar_url" :alt="cardInfo.name" class="gp-card-avatar-img">
            </div>
            <div class="gp-card-user-info">
                <async-title level="2" class="gp-card-user-info-title">{{ cardInfo.name }}</async-title>
                <p>{{ cardInfo.bio }}</p>
                <ul class="gp-card-user-info-tag-list">
                    <li class="gp-card-user-info-tag-list-item">
                        {{ cardInfo.followers}}
                        <strong>Followers</strong>
                    </li>
                    <li class="gp-card-user-info-tag-list-item">
                        {{ cardInfo.following}}
                        <strong>following</strong>
                    </li>
                    <li class="gp-card-user-info-tag-list-item">
                        {{ cardInfo.public_repos}}
                        <strong>Repos</strong>
                    </li>
                </ul>
                <div class="gp-repo-container">
                    <a v-for="(repo,index) in repoList" :key="repo.href + index" class="gp-repo" :href="repo.href" target="_blank" rel="noopener noreferrer" >
                        {{ repo.text }}
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
@import "./style/app.scss";
</style>
