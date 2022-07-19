export const colors = ["#2396ef","#2396ef","#4097ef","#fff","#9744ee",
'#ff4500','#ff8c00','#ffd700','#90ee90','#00ced1','#1e90ff','#c71585','rgba(255, 69, 0, 0.68)',
'rgba(255, 120, 0, 1)','rgba(51, 100, 98, 1)','rgba(120, 40, 94, 0.5)','hsla(209, 100%, 56%, 0.73)','#c7158577'];
export const defaultColor = {
    bgColor:"linear-gradient(135deg,#e6e6e6 10%,#7a7a7a 90%)",
    boxColor:"#b9fcda"
};
export type DefaultColor = typeof defaultColor;
export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
export const randomColor = {
    bgColor:() => `linear-gradient(135deg,${ getRandomColor()} 10%,${ getRandomColor() } 90%)`,
    boxColor:() => getRandomColor()
}
export type Key = keyof DefaultColor;