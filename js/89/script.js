const checkBoxElements = document.querySelectorAll(".switch-container input[type='checkbox']");
checkBoxElements.forEach(item => item.addEventListener("change",e => {
    const index = Array.from(checkBoxElements).indexOf(e.target);
    if(Array.from(checkBoxElements).every(v => v.checked)){
        if(index === 0){
            checkBoxElements[2].checked = false;
        }else if(index === 1){
            checkBoxElements[0].checked = false;
        }else{
            checkBoxElements[1].checked = false;
        }
    }
}));