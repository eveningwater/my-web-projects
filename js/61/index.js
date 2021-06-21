const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector("#close");
const pageContainer = document.querySelector('.page-container');
openBtn.addEventListener('click',() => {
    openBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');
    pageContainer.classList.remove('show-nav');
});
closeBtn.addEventListener('click',() => {
    openBtn.classList.remove('hidden');
    closeBtn.classList.add('hidden');
    pageContainer.classList.add('show-nav');
});