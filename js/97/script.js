const $ = (v,el = document) => el.querySelector(v);
const boxContainer = $("#boxes");
const btn = $("#magic-btn");
btn.addEventListener("click",() => boxContainer.classList.toggle("big"));
function createBox(){
    for(let i = 0;i < 4;i++){
        for(let j = 0;j < 4;j++){
            const box = document.createElement("div");
            box.classList.add("box");
            box.style.backgroundPosition = `${ -j * 15 }vw ${ -i * 15 }vh`;
            boxContainer.appendChild(box);
        }
    }
}
createBox();