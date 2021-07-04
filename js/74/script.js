const $ = v => document.querySelector(v);
const $$ = v => document.querySelectorAll(v);
const remind = $("#remind");
const percent = $("#percent");
const cups = $$('.select-cup .cup');
const remindText = remind.querySelector('.cup-container');
function reset(){
    remind.style.height = '350px';
    remind.style.visibility = 'visible';
    percent.style.height = '0';
    percent.style.visibility = 'hidden';
}
reset();
function handler(){
    const l = cups.length;
    const unitHei = 350 / l;
    for(let i = 0;i < l;i++){
        cups[i].addEventListener('click',() => {
            if(cups[i].classList.contains('active')){
                if(!cups[i + 1])return;
                const last = cups[i + 1].classList.contains('active');
                for(let j = i + 1;j < l;j++){
                    cups[j].classList.remove('active');
                }
                if(!last){
                    cups[i].classList.remove('active');
                }
            }else{
                for(let j = 0;j <= i;j++){
                    cups[j].classList.add('active');
                }
            }
            const actives = $$('.cup.active');
            if(actives.length === l){
                remind.style.height = '0';
                remind.style.visibility = 'hidden';
                percent.style.height = '350px';
                percent.style.visibility = 'visible';
                percent.textContent = "100%";
                remindText.textContent = "0L";
            }else if(actives.length === 0){
                reset();
                percent.textContent = "12.5%";
                remindText.textContent = "2L";
            }else{
                remind.style.height = unitHei * (l - actives.length) + 'px';
                remind.style.visibility = 'visible';
                percent.style.height = unitHei * actives.length + 'px';
                percent.style.visibility = 'visible';
                percent.textContent = (unitHei * actives.length / 350) * 100 + "%";
                remindText.textContent = (cups[i].textContent.replace(/ml/,"").replace(/\s+/,"") - 0) * (l - actives.length) / 1000 + 'L';
            }
        })
    }
}
handler();