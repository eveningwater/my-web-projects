const $ = v => document.querySelector(v);
const choicesTextarea = $("#choicesTextarea");
const tags = $("#tags");

choicesTextarea.addEventListener('keyup',e => {
    const value = e.target.value;
    const isComma = value.indexOf(',') > -1;
    const splitSymbol = isComma ? ',' : '';
    createTags(value,splitSymbol);
    if(e.keyCode === 13){
        setTimeout(() => {
            e.target.value = '';
        },100)
        randomTag();
    }
});
function createTags(value,splitSymbol){
    if(!value || !value.length)return;
    const words = value.split(splitSymbol).map(v => v.trim()).filter(v => v);
    tags.innerHTML = '';
    words.forEach(word => {
        const tag = document.createElement('span');
        tag.classList.add('tag');
        tag.innerText = word;
        tags.appendChild(tag);
    })
}
function randomTag(){
    const time = 50;
    let timer = null;
    let randomHighLight = () => {
        const randomTagElement = pickerRandomTag();
        highLightTag(randomTagElement);
        timer = setTimeout(randomHighLight,100);
        setTimeout(() => {
            unHighLightTag(randomTagElement);
        },100);
    }
    randomHighLight();
    setTimeout(() => {
        clearTimeout(timer);
        setTimeout(() => {
            const randomTagElement = pickerRandomTag();
            highLightTag(randomTagElement);
        },100);
    },time * 100);
}
function pickerRandomTag(){
    const tagElements = document.querySelectorAll('#tags .tag');
    return tagElements[Math.floor(Math.random() * tagElements.length)];
}
function highLightTag(el){
    el && el.classList.add('highlight');
}
function unHighLightTag(el){
    el && el.classList.remove('highlight');
}