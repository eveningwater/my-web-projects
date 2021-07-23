const $ = (v,el = document)  => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);
const numGroup = $("#num-group");
const counter = $("#counter");
const final = $("#final");
const replay = $("#replay");
function createNum(n){
    let groupHTML = "";
    for(let i = n - 1;i > 0;i--){
        groupHTML += `<span>${ i }</span>`;
    }
    numGroup.innerHTML = groupHTML;
    runAnimation();
}
function runAnimation(){
    const numArr = $$("span",numGroup);
    const nextToLast = numArr.length - 1;
    numArr[0].classList.add("in");
    numArr.forEach((num,index) => {
        num.addEventListener("animationend",e => {
            const {animationName} = e;
            if(animationName === "goIn" && index !== nextToLast){
                num.classList.remove("in");
                num.classList.add("out");
            }else if(animationName === "goOut" && num.nextElementSibling){
                num.nextElementSibling.classList.add("in");
            }else{
                counter.classList.add("hide");
                final.classList.add("show");
            }
        })
    })
}
function resetAnimation(){
    counter.classList.remove("hide");
    final.classList.remove("show");
    const numArr = $$("span",numGroup);
    if(numArr){
        numArr.forEach(num => num.classList.value = '');
        numArr[0].classList.add("in");
    }
}
window.onload = () => {
    createNum(10);
    replay.addEventListener("click",() => {
        resetAnimation();
        runAnimation();
    });
}