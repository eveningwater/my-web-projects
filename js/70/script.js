const container = document.querySelector('.faq-container');
const questions = [
    {
        title:"Why shouldn't we trust atoms?",
        text:"They make up everything."
    },
    {
        title:"What do you call someone with no body and no nose?",
        text:"Nobody knows."
    },
    {
        title:"What's the object-oriented way to become wealthy?",
        text:"Inheritance."
    },
    {
        title:"How many tickles does it take to tickle an octopus?",
        text:"Ten-tickles!"
    },
    {
        title:"What is: 1 + 1?",
        text:"Depends on who are you asking."
    }
];
function createTemplate(){
    let template = "";
    questions.forEach(que => {
        template += `
            <div class="faq">
                <h3 class="faq-title">${ que.title }</h3>
                <p class="faq-text">${ que.text }</p>
                <i class="faq-icon"></i>
            </div>
        `;
    });
    container.innerHTML = template;
    const faqs = document.querySelectorAll('.faq-container > .faq');
    container.addEventListener('click',e => {
        if(e.target.className.indexOf('faq-icon') > -1){
            faqs[[].indexOf.call(faqs,e.target.parentElement)].classList.toggle('active');
        }
    });
}
window.onload = () => { createTemplate();}