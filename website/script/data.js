var indexData = {
    "en":{
        "who":"I am eveningWater",
        "description":"Hi,I am eveningWater,Web developer from chengdu,Sichuan,China.I am passionate about development,interaction and design.I really love what I do.",
        "btn":[
            {
                "id":"about",
                "content":"About"
            },
            {
                "id":"work",
                "content":"Work"
            },
            {
                "id":"contact",
                "content":"Contact"
            }
        ]
    },
    "zh":{
        "who":"我是夕水",
        "description":"哈喽，我是夕水，一名来自中国四川成都的web开发工程师。我对开发、交互以及设计充满热情。我真的很喜欢我的工作。",
        "btn":[
            {
                "id":"about",
                "content":"关于"
            },
            {
                "id":"work",
                "content":"工作"
            },
            {
                "id":"contact",
                "content":"联系"
            }
        ]
    }
}
var contactData = {
    "en":{
        "backBtnText":"Back to home",
        "title":"Contact",
        "description":"If you have any questions, you can leave me a message at any time.",
        "sendBtnText":"Send Message",
        "name":"Enter your Name",
        "email":"Enter your Email",
        "message":"Enter your message"
    },
    "zh":{
        "backBtnText":"回到首页",
        "title":"联系",
        "description":"如有任何疑问，可以随时给我留言。",
        "sendBtnText":`发送信息`,
        "name":"输入你的姓名",
        "email":"输入你的邮箱",
        "message":"输入你的留言"
    }
}
var aboutData = {
    "en":{
        "backBtnText":"Back to home",
        "title":"About",
        "description":"Hi,I am eveningWater,Web developer from chengdu,Sichuan,China.",
        "content":`I always think of myself as a flower, but I am nothing. When you feel that you are just a flower, ask yourself if you have a beautiful fragrance?
        I always think of myself as a lamp, but I am nothing. When you feel like you are a lamp, ask yourself if it shines a light?`
    },
    "zh":{
        "backBtnText":"回到首页",
        "title":"关于",
        "description":"哈喽，我是夕水，一名来自中国四川成都的web开发工程师。",
        "content":`总把自己当作一朵花，其实自己什么也不是。当你觉得自己就是一朵花时，问问自己有开出美丽的芬芳吗？总把自己当作一盏灯，其实自己什么也不是。当你觉得自己就是一盏灯时，问问自己有没有照出一席光明？`
    }
}
var footerData = {
    "en":"Copyright 2021.eveningWater All rights reserved.",
    "zh":"Copyright 2021.eveningWater 版权所有。"
}
var workData = {
    "en":{
        "backBtnText":"Back to home",
        "title":"Work",
        "description":"This is a selection of my web development work. I've been involve in many different types of project.",
        "content":""
    },
    "zh":{
        "backBtnText":"回到首页",
        "title":"工作",
        "description":"这是我的web开发工作的精选。我参与了许多不同类型的项目。",
        "content":""
    }
}
async function loadContent(lang){
    const res = await $.get("./website/markdowns/work." + lang +".md");
    workData[lang].content = res;
}
["en","zh"].forEach(item => loadContent(item));
