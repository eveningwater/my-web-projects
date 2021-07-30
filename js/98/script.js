const $ = (v,el = document) => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);
const codeContainer = $("#code-container");
const propObj = {
    placeholder:0,
    min:0,
    max:9,
    required:true,
    type:"number"
}
function createInputNumber(n){
    for(let i = 0;i < n;i++){
        const item = document.createElement("input");
        Object.keys(propObj).forEach(prop => item.setAttribute(prop,propObj[prop]))
        item.classList.add("code");
        codeContainer.appendChild(item);
    }
    onFocusHandler($$(".code",codeContainer));
}
function onFocusHandler(nodeList){
    onFocus(nodeList[0]);
    nodeList.forEach((node,index) => {
        node.addEventListener("keydown",e => {
            // console.log(e.key);
            if(e.key >= 0 && e.key <= 9){
                nodeList[index].value = "";
                setTimeout(() => onFocus(nodeList[index + 1]),0);
            }else{
                setTimeout(() => onFocus(nodeList[index - 1]),0);
            }
        })
    });
}
function onFocus(node){
    if(!node)return;
    const { nodeName } = node;
    return nodeName && nodeName.toLowerCase() === "input" && node.focus();
}
window.onload = () =>  createInputNumber(10);