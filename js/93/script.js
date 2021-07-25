const container = document.querySelector("#container");
const squares = 500;
const colors = ["#2396ef","#2396ef","#4097ef","#fff","#9744ee",
'#ff4500','#ff8c00','#ffd700','#90ee90','#00ced1','#1e90ff','#c71585','rgba(255, 69, 0, 0.68)',
'rgba(255, 120, 0, 1)','rgba(51, 100, 98, 1)','rgba(120, 40, 94, 0.5)','hsla(209, 100%, 56%, 0.73)','#c7158577'];
for(let i = 0;i < squares;i++){
    const square = document.createElement("div");
    square.classList.add("square");
    // square.addEventListener("mouseenter",() => setColor(square));
    // square.addEventListener("mouseleave",() => removeColor(square));
    // Pay attention to the difference between mouseenter, mouseleave and mouseover, mouseout
    square.addEventListener("mouseover",() => setColor(square));
    // Why need to use setTimeout?
    // Original demo needn't to use setTimeout,here is the url:https://50projects50days.com/projects/hoverboard/
    // It's the problem about the gradient color?
    square.addEventListener("mouseout",() => setTimeout(() => removeColor(square),600));
    container.appendChild(square);
}
function setColor(element){
    element.style.background = `linear-gradient(135deg, ${ randomColor() } 10%, ${ randomColor() } 100%)`;
    element.style.boxShadow = `0 0 2px ${ randomColor() },0 0 10px ${ randomColor() }`;
}
function removeColor(element){
    element.style.background = `linear-gradient(135deg, #1d064e 10%, #10031a 100%)`;
    element.style.boxShadow = `0 0 2px #736a85`;
}
function randomColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}