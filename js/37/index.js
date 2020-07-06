var content = document.getElementsByClassName("content")[0],
    sec = document.getElementsByTagName("section")[0];
sec.onclick = function (event) {
    var src = event.target;
    if (src.nodeName == "BUTTON") {
        switch (src.textContent) {
            case "←":
                content.textContent = "";
                break;
            case "=":
                content.textContent = eval(content.textContent).toFixed(2);
                break;
            default:
                content.textContent += src.textContent;
                break;
        }
    }
}
document.onkeyup = function (e) {
    if (e.keyCode == 13) {
        content.textContent = eval(content.textContent).toFixed(2);
    } else if (e.keyCode == 8) {
        content.textContent = "";
    }
}