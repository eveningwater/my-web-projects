const $ = selector => document.querySelector(selector);
const buttonContainer = $('#buttons');
const sounds = ["applause","boo","gasp","tada","victory","wrong"];
const create = element => document.createElement(element);
const body = document.body;
sounds.forEach(sound => {
    const btn = create('button');
    btn.textContent = sound;
    btn.type = "button";
    const audio = create('audio');
    audio.src = "./audio/" + sound + '.mp3';
    audio.id = sound;
    btn.addEventListener('click',() => {
        stopSounds();
        $('#' + sound).play();
    });
    buttonContainer.appendChild(btn);
    buttonContainer.insertAdjacentElement('beforebegin',audio);
});
function stopSounds(){
    sounds.forEach(sound => {
        $('#' + sound).pause();
        $('#' + sound).currentTime = 0;
    })
}