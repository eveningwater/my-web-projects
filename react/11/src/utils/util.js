export const throttle = (fn, time = 1000) => {
    let done = false;
    return (...args) => {
        if (!done) {
            fn.call(this, ...args);
            done = true;
        }
        setTimeout(() => {
            done = false;
        }, time)
    }
}
export function setBoxShow(box, triggerBottom) {
    const top = box.getBoundingClientRect().top;
    if (triggerBottom >= top) {
        box.classList.add("show");
    } else {
        box.classList.remove("show");
    }
}