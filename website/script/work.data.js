
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
