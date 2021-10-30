<script lang="tsx">
    import { PropType,Fragment,defineComponent,ref } from "vue";
    const typeArr = ["button","submit","reset"];
    const AUDIO_URL = "https://eveningwater.com/my-web-projects/js/67/audio/";
    export default defineComponent({
        props:{
            nativeType:{
                type:String as PropType<string>,
                default:"button",
                validator:(value:string) => {
                    return typeArr.indexOf(value) > -1;
                }
            },
            content:String as PropType<string>,
            source:String as PropType<string>,
            className:String as PropType<string>
        },
        setup(props,{ slots }){
            const { nativeType,content,source,className } = props;
            const renderChildren = () => slots.default ? slots.default() : content;
            const audioRef = ref(null);
            const onPlayHandler = () => {
                const allAudio = document.querySelectorAll(".sb-audio");
                allAudio.forEach((item) => {
                     (item as HTMLAudioElement).currentTime = 0;
                     (item as HTMLAudioElement).pause();
                });
                (audioRef.value as unknown as HTMLAudioElement).play();
            }
            return () => (
                <Fragment>
                    <button type={ nativeType as "button" } class={className} onClick={ onPlayHandler.bind(this)}>{ renderChildren() }</button>
                    <audio class="sb-audio" src={AUDIO_URL + source + '.mp3'} ref={audioRef}></audio>
                </Fragment>
            )
        }
    })
</script>
<style lang="less">
    @import "../style/variable.less";
    .@{baseSelector}audio {
        display: extract(@display,length(@display));
    }
    .@{baseSelector}button {
        display: extract(@display,@full + 3);
        padding: range(14px,20px,10);
        font-size: unit(sqrt(196),px);
        color:@color;
        cursor: extract(@cursor,@full);
        min-width: unit(ceil(7.1),rem);
        letter-spacing: unit(@full + @full,px);
        margin: range(15px,15px,10);
        border-radius: unit(round(7.8),px);
        border:extract(@display,length(@display));
        background: linear-gradient(@rotate,@btnBgColor-1 percentage(@zero-point-1),@btnBgColor-2 percentage(@zero-point-9));
        &:focus-visible {
            outline:extract(@display,length(@display));
        }
        &:hover {
            opacity: sin(1);
        }
    }
</style>