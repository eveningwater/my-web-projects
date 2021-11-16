<script lang="tsx">
    import { defineComponent } from "@vue/runtime-core";
    import { PropType, toRefs } from "vue";
    import { IMAGE_URL } from "../utils/api";
    import { MovieDataType } from "../utils/data.interface";
    import Title from "./Title.vue";
    export default defineComponent({
        props:{
            item:{
                type:Object as PropType<object & Partial<MovieDataType>>,
                default:() => ({
                    poster_path:"",
                    title:"",
                    vote_average:0,
                    overview:""
                })
            }
        },
        setup(props){
            const { item } = toRefs(props);
            const { poster_path,title,vote_average,overview } = item.value as unknown as MovieDataType;
            const setVoteColor = (val:number) => {
                if(val >= 8){
                    return { color:"#4ce21f"};
                }else if(val >= 5) {
                    return { color:"#eba015"};
                }else{
                    return { color:"#ec3d3d"};
                }
            }
            return () => (
                <li class="ma-movie-item">
                    <img src={ IMAGE_URL + poster_path } alt="图片加载中" class="ma-movie-item-cover"/>
                    <div class="ma-movie-item-info">
                        <Title level="3" class="ma-movie-item-info-name">{title}</Title>
                        <span class="ma-movie-item-info-score" style={setVoteColor(vote_average)}>{vote_average}</span>
                    </div>
                    <div class="ma-movie-item-overview">
                        <Title level="3" class="ma-movie-item-overview-name">{title}</Title>
                        <p class = "ma-movie-item-overview-content">{overview}</p>
                    </div>
                </li>
            )
        }
    })
</script>
<style lang="scss" scoped>
    @import "../style/variable.scss";
    $selector:$baseSelector + "movie-item";
    $boxShadowColor:#3d89d4;
    $voteBgColor-1:#49301c;
    $voteBgColor-2:#4b413a;
    $BgColor-1:#fa7e19;
    $BgColor-2:#ad4d08;
    $overviewBgColor-1:#f1f1f0;
    $overviewBgColor-2:#e6e6e6;
    .#{$selector} {
         @include m(null,1,rem);
         box-shadow: 1px 2px 13px $boxShadowColor;
         @extend .overflow-hidden;
         cursor: pointer;
         border-radius: 15px;
         position: relative;
         width: calc(25% - 2rem);
         background: linear-gradient(135deg,$BgColor-1 10%,$BgColor-2 90%);
         .#{$selector}-cover {
             display: block;
             width: percentage(1);
         }
         .#{$selector}-info-name {
            font-size: 1rem;
            @extend .text-overflow;
         }
         .#{$selector}-info {
             color:$color;
             @include flex-space;
             @include p(null,1,rem);
             .#{$selector}-info-score {
                 padding: .3rem .4rem;
                 border-radius: 4px;
                 font: {
                     weight:700;
                 };
                 background: linear-gradient(135deg,$voteBgColor-1 90%,$voteBgColor-2 10%);
             }
         }
         $overviewSelector:$selector + "-overview";
         &:hover .#{$overviewSelector} {
            transform: translateY(percentage(0.25));
         }
         .#{$overviewSelector}{
             position: absolute;
             right: 0;
             top: 0;
             bottom: 0;
             left: 0;
             transform: translateY(percentage(1));
             max-height: percentage(1);
             padding: 1.5rem;
             background: linear-gradient(135deg,$overviewBgColor-1 10%,$overviewBgColor-2 90%);
             transition:transform .4s cubic-bezier(0.165, 0.84, 0.44, 1);
             .#{$overviewSelector}-name{
                 text-align: center;
                 color:$fontColor;
                 margin: .5rem 0;
             }
             .#{$overviewSelector}-content {
                 word-break: break-all;
                 line-height: 1.5;
                 @include m(null,8,px);
                 color:$fontContentColor;
             }
         }
    }
    @media screen and (max-width: 765px) {
        .#{$selector} {
            width: calc(50% - 2rem);
        }
    }
    @media screen and (max-width: 350px) {
        .#{$selector} {
            width: calc(100% - 2rem);
        }
    }
</style>