const container = document.querySelector('#container');
window.addEventListener("keydown",event => {
    createKeyCodeTemplate(event);
});

function createKeyCodeTemplate(e){
    const { key,keyCode,code } = e;
    let template = "";
    [
        {
            title:"event.key",
            content:key === " " ? "Space" : key
        },
        {
            title:"event.keyCode",
            content:keyCode
        },
        {
            title:"event.code",
            content:code
        }
    ].forEach(value => {
        template += `<div class="key"><small>${ value.title }</small>${ value.content }</div>`;
    });
    container.innerHTML = template;
}