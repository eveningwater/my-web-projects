const enArr = [
    {
        label: "en",
        value: "en"
    },
    {
        label: "zh",
        value: "zh"
    }
];
const zhArr = [
    {
        label: "英文",
        value: "en"
    },
    {
        label: "中文",
        value: "zh"
    }
];
function markedTemplate(template) {
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    return marked(template);
}
function runSwiper(container) {
    let swiperOptions = {
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        autoplay:true,
        observer:true,
        observeParents:true,
        initialSlide: 0,
        loop:true,
        speed: 1000
    };
    new Swiper(container, swiperOptions);
}
const app = new Vue({
    data() {
        return {
            currentLangArr: [],
            currentLang: "en",
            indexData: indexData,
            aboutData: aboutData,
            workData: workData,
            contactData: contactData,
            footerData: footerData,
            iconURLList:[
                {
                    href:"https://www.eveningwater.com/my-web-projects/vue/10/",
                    iconName:"fa fa-pinterest"
                },
                {
                    href:"https://github.com/eveningwater",
                    iconName:"fa fa-github"
                },
                {
                    href:"https://eveningwater.github.io/ew-color-picker/",
                    iconName:"fa fa-linkedin"
                }
            ]
        }
    },
    created() {
        this.initLangArr();
    },
    mounted() {
        this.initHandler();
        this.$nextTick(() => {
            runSwiper(this.$refs.slideContainer);
        })
    },
    methods: {
        initHandler() {
            this.$nextTick(() => {
                ["#about_scroll", "#work_scroll", "#contact_scroll"].forEach(selector => $(selector).fadeOut());
                $(".back").click(function () {
                    $(".pages").fadeOut();
                    $("#index").fadeIn();
                    $('#index_left').addClass('animated slideInLeft');
                    $('#index_right').addClass('animated slideInRight');
                });
            });
        },
        initLangArr() {
            this.currentLangArr = [...(this.currentLang === "en" ? enArr : zhArr)];
        },
        changeLang(value) {
            this.currentLang = value;
            this.initLangArr();
        },
        toLocate(value) {
            this.$nextTick(() => {
                $("#index").fadeOut();
                $("#" + value + "_scroll").fadeIn();
                ["Left", "Right"].forEach(dir => $("#" + value + "_" + dir.toLowerCase()).addClass("animated " + "slideIn" + dir));
            });
        },
        renderMarkdown(data) {
            return markedTemplate(data);
        }
    }
}).$mount("#app");
