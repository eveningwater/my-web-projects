const $ = (v,el = document) => el.querySelector(v);
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
const getStyle = (el,prop) => window.getComputedStyle(el).getPropertyValue(prop);
const range = $("#range");
const label = $("#label");
range.addEventListener("input",e => {
    // string to the number
    const value = +e.target.value;
    const label = e.target.nextElementSibling;

    const range_width = getStyle(e.target,"width");//XXpx
    const label_width = getStyle(label,"width");//XXpx

    // Due to contain px,slice the width
    const num_width = +range_width.slice(0,range_width.length - 2);
    const num_label_width = +label_width.slice(0,label_width.length - 2);

    const min = +e.target.min;
    const max = +e.target.max;

    const left = value * (num_width / max) - num_label_width / 2 + scale(value,min,max,10,-10);

    label.style.left = `${left}px`;
    label.innerHTML = value;
});