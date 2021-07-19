const text = document.querySelector("#text");
const speed = document.querySelector("#speed input");
const string = "我爱程序，程序使我快乐!";
let idx = 0;
let time = 300 / speed.value;
writeText();
function writeText(){
    text.innerHTML = string.slice(0,idx);
    idx++;
    if(idx > string.length){
        idx = 1;
    }
    setTimeout(writeText,time);
}
speed.addEventListener("input",e => time = 300 / e.target.value);