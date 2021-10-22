<template>
    <div class="mwp-middle-page">
        <div class="mwp-middle-logo">
            <img src="https://eveningwater.com/my-web-projects/home/logo.svg" alt="the logo" class="mwp-middle-img">
            我的个人项目
        </div>
        <div class="mwp-middle-content">
            <p class="mwp-middle-title">即将离开我的个人项目，请注意账号财产安全</p>
            <div class="mwp-middle-link-container">
                <div class="mwp-middle-link-content">
                    <p class="mwp-middle-link-text">{{ link }}</p>
                </div>
            </div>
        </div>
        <div class="mwp-middle-footer">
            <button type="button" class="mwp-middle-btn" @click="continueToViewHandler">继续访问</button>
        </div>
    </div>
</template>
<script>
    export default {
        name:"LocateConfirm",
        props:{
            link:{
                type:String,
                default:""
            }
        },
        data(){
            return {

            }
        },
        methods:{
            continueToViewHandler(){
                location.href = this.link;
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .mwp-middle-page 
        position absolute
        left 50%
        top 50%
        transform translate(-50%,-50%)
        width 85%
        max-width 600px
        background linear-gradient(135deg,#f2f3f4 10%,#fff 90%)
        box-shadow 1px 2px 12px rgba(255,255,255,.3)
        padding 30px 40px 0
        border 1px solid #dedfde
        box-sizing border-box
        border-radius 8px
        .mwp-middle-footer
            display flex
            justify-content flex-end
            align-items center
            min-height 40px
            padding 20px 0
            .mwp-middle-btn
                background linear-gradient(135deg,#007fff 10%,#4096ef 90%)
                border-radius 5px
                padding 12px 20px
                color #fff
                transition all .4s ease-in-out
                cursor pointer
                border none
                letter-spacing 2px
                &:focus-visible
                    outline none
                &:hover
                    background linear-gradient(135deg,#517fe7 10%,#2396ef 90%)
                    color #fff
        .mwp-middle-content
            font-family "幼圆"
            position relative
            .mwp-middle-title
                margin 0
                font-size 18px
                line-height 24px
            .mwp-middle-link-container
                padding 16px 0 22px
                border-bottom 1px solid #deddfe
                font-size 14px
                color #8d8e8f
                .mwp-middle-link-content
                    max-height 40px
                    word-break break-all
                    line-height 22px
                    overflow hidden
                    .mwp-middle-link-text
                        margin 0
        .mwp-middle-logo
            position absolute
            top -40px
            left 0
            color #535455
            display flex
            align-items center
            .mwp-middle-img
                object-fit cover
                width 20px
                height 20px
                margin-right 5px
</style>