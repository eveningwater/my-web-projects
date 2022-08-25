export const LOGO_IMAGE_URL = "https://www.eveningwater.com/my-web-projects/website/images/logo.png";
export const iconMap = {
    'menu': 'bars',
    'close': 'times'
}
export type IconKey = keyof typeof iconMap;
export const navList = [
    {
        href:"https://www.eveningwater.com/",
        text:"个人网页"
    },
    {
        href:"https://www.eveningwater.com/docs/",
        text:"个人文档"
    },
    {
        href:"https://www.eveningwater.com/my-web-projects/home/",
        text:"个人项目集合"
    },
    {
        href:"",
        text:"个人简历",
        children:[
            {
                href:"https://www.eveningwater.com/my-web-projects/react/3/",
                text:"react版本"
            },
            {
                href:"https://www.eveningwater.com/vue-resume/vue3.2/",
                text:"vue3.2版本"
            },
            {
                href:"https://www.eveningwater.com/vue-resume/vue3.0/",
                text:"vue3.0版本"
            },
            {
                href:"https://www.eveningwater.com/vue-resume/new/",
                text:"vue2.x-vue-cli3.x版本"
            },
            {
                href:"https://www.eveningwater.com/vue-resume/old/",
                text:"vue2.x-vue-cli2.x版本"
            },
        ]
    }
];

export type NavListType = typeof navList;