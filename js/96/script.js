const $ = (v,el = document) => el.querySelector(v);
const background = $("#background");
const password = $("#password");
password.addEventListener("input",e => {
    const { value } = e.target;
    const blur = 20 - value.length * 2;
    background.style.filter = `blur(${ blur }px)`;
})