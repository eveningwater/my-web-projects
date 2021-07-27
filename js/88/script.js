const $ = v => document.querySelector(v);
const $$ = v => document.querySelectorAll(v);
const langEle = $("#lang");
const settingContainer = $("#setting-container");
const titleEle = $("#title");
const clipboard = $("#clipboard");
const generateBtn = $("#generate-btn");
const result = $("#result");
let currentLang = "en";
const siblings = el => [].filter.call(el.parentElement.children,item => item !== el);
const dataObject ={
    "en":{
        "title":"password generator",
        "lang":["en","zh"],
        "settings":[
            {
                "label":"Password length",
                "type":"number",
                "id":"length"
            },
            {
                "label":"Include uppercase letters",
                "type":"checkbox",
                "id":"uppercase"
            },
            {
                "label":"Include lowercase letters",
                "type":"checkbox",
                "id":"lowercase"
            },
            {
                "label":"Include numbers",
                "type":"checkbox",
                "id":"numbers"
            },
            {
                "label":"Include symbols",
                "type":"checkbox",
                "id":"symbols"
            }
        ],
        "btnContent":"Generate Password",
        "confirmTitle":"Tips",
        "confirmContent":"Password copied to clipboard!"
    },
    "zh":{
        "title":"密码生成器",
        "lang":["英文","中文"],
        "settings":[
            {
                "label":"密码长度",
                "type":"number",
                "id":"length"
            },
            {
                "label":"包含大写字母",
                "type":"checkbox",
                "id":"uppercase"
            },
            {
                "label":"包含小写字母",
                "type":"checkbox",
                "id":"lowercase"
            },
            {
                "label":"包含数字",
                "type":"checkbox",
                "id":"numbers"
            },
            {
                "label":"包含符号",
                "type":"checkbox",
                "id":"symbols"
            }
        ],
        "btnContent":"生成密码",
        "confirmTitle":"温馨提示",
        "confirmContent":"密码已复制到剪贴板上"
    }
};
const randomFunc = {
    upper:getRandomUpper,
    lower:getRandomLower,
    number:getRandomNumber,
    symbol:getRandomSymbol
}
function createSettings(){
    const settings = dataObject[currentLang].settings;
    let settingContainerHTML = "";
    settings.forEach(setting => {
        settingContainerHTML += `
            <div class="setting-item">
                <label>${ setting.label }</label>
                <input type="${ setting.type }" id="${setting.id }">
            </div>
        `;
    });
    settingContainer.innerHTML = settingContainerHTML;
    // console.log(settingContainer.querySelectorAll("input"))
    settingContainer.querySelectorAll("input").forEach(item => {
        if(item.getAttribute('type') === "number"){
            [
                {
                    prop:"value",
                    value:20
                },
                {
                    prop:"min",
                    value:1
                },
                {
                    prop:"max",
                    value:20
                }
            ].forEach(attr => item.setAttribute(attr.prop,attr.value));
        }else{
            item.setAttribute("checked",true);
        }
    })
}
function createLangItem(){
    const langArr = dataObject[currentLang].lang;
    let langHTML = "";
    langArr.forEach(item => langHTML += `<div class="lang-item ${ item === currentLang ? 'lang-item-active' : ''}" data-lang=${ item }>${ item }</div>`);
    langEle.innerHTML = langHTML;
    const langItems = langEle.children;
    langEle.addEventListener("click",e => {
        const { className } = e.target;
        if(className.indexOf("lang-item") > -1){
            const currentDataLang = e.target.getAttribute("data-lang");
            if(currentDataLang === currentLang)return;
            currentLang = currentLang === "en" ? "zh" : "en";
            siblings(e.target).forEach(item => item.classList.remove("lang-item-active"));
            e.target.classList.add("lang-item-active");
            const data = dataObject[currentLang];   
            Array.from(langItems).forEach((item,index) => item.textContent = data.lang[index]);
            titleEle.textContent = data.title;
            generateBtn.textContent = data.btnContent;
            settingContainer.querySelectorAll("label").forEach((item,index) => item.textContent = data.settings[index].label);
        }
    })
}
function getRandomLower(){
    // a ~ z 的code为 97 ~ 122
    // 可根据charCodeAt()方法获取
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper(){
    // A ~ Z 的code为 65 ~ 90
    // 可根据charCodeAt()方法获取
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber(){
    // 0 ~ 9的code为48 ~ 57
    // 可根据charCodeAt()方法获取
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)]; 
}
function generatePassword(upper,lower,number,symbol,length){
    let generatedPassword = "";
    const typeCount = upper + lower + number + symbol;
    const typeFunc = [{ upper},{ lower},{number},{symbol}].filter(v => Object.values(v)[0]);
    if(typeCount === 0){
        return;
    }
    for(let i = 0;i < length;i += typeCount){
        typeFunc.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }
    const finalPassword = generatedPassword.slice(0,length);
    return finalPassword;
}
window.onload = () => {
    createLangItem();
    createSettings();
    generateBtn.addEventListener("click",() => {
        const length = +$("#length").value;
        const upper = $("#uppercase").checked;
        const lower = $("#lowercase").checked;
        const number = $("#numbers").checked;
        const symbol = $("#symbols").checked;

        result.textContent = generatePassword(upper,lower,number,symbol,length);
    });
    clipboard.addEventListener("click",() => {
        const password = result.textContent;
        if(!password){
            return;
        }
        const input = document.createElement("input");
        input.value = password;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        const data = dataObject[currentLang];
        ewConfirm({
            title:data.confirmTitle,
            content:data.confirmContent,
            showCancel:false
        })
    })
}