const btn = document.querySelector('#btn');
btn.addEventListener('click',function(e){
    const x = e.clientX;
    const y = e.clientY;
    const left = this.offsetLeft;
    const top = this.offsetTop;

    const circleX = x - left;
    const circleY = y - top;
    const span = document.createElement('span');
    span.classList.add('circle');
    span.style.left = circleX + 'px';
    span.style.top = circleY + 'px';
    this.appendChild(span);
    setTimeout(() => span.remove(),1000);
})