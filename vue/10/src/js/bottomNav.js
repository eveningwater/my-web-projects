export default {
    name: 'bottom',
    data() {
        return {
            demourl: [{
                url: 'http://eveningwater.com/',
                title: '个人网站'
            },
            {
                url: 'https://github.com/eveningwater',
                title: 'github'
            }
            ],
            paused: false, //暂停
            playing: false, //播放图标动画
            autoPlaying: false, //播放音频
            audio: ''
        }
    },
    mounted() {

    },
    methods: {
        // 创建音频
        createAudio() {
            this.audio = new Audio();
            this.audio.loop = 'loop';
            this.audio.autoplay = 'autoplay';
            this.audio.src = "https://www.eveningwater.com/project/newReact-music-player/audio/%E9%BB%84%E5%9B%BD%E4%BF%8A%20-%20%E7%9C%9F%E7%88%B1%E4%BD%A0%E7%9A%84%E4%BA%91.mp3";
        },
        // 播放音乐
        playMusic() {
            this.playing = true;
            this.autoPlaying = true;
            // 创建audio标签
            if (!this.audio) {
                this.createAudio();
            } else {
                this.audio.load();
            }
        },
        // 跳过动画
        skipAnimationFun(e) {
            e.preventDefault();
            this.$emit('on-skip');
        },
        // 暂停动画
        pauseFun(e) {
            e.preventDefault();
            this.paused = !this.paused;
            this.$emit('on-pause', this.paused);
        },
        // 暂停音乐
        musicPause() {
            this.playing = !this.playing;
            if (!this.playing) {
                this.audio.pause();
            } else {
                this.audio.play();
            }
        }
    }
}