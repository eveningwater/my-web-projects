var animation = {
    container: document.getElementById('bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'data/'+random(1,10)+'.json'
};
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function loadAnimation(option){
    return bodymovin.loadAnimation(option);
}
loadAnimation(animation);