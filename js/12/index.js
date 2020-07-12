
/**
 *  页面功能
 */
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
HTMLElement.prototype.hasClass = function (className) {
    return new RegExp(" " + className + " ").test(' ' + this.className + ' ');
}
/**
 * 下拉逻辑
 */
function selectHandle(selectContainer) {
    let selectFlag = false;
    let showSelect = function (el, bool) {
        if (bool) {
            if (el.lastElementChild.hasClass('select-down')) {
                el.lastElementChild.classList.replace('select-down', 'select-up');
            } else {
                el.lastElementChild.classList.add('select-up');
            }
            el.nextElementSibling.style.display = "block";
        } else {
            if (el.lastElementChild.hasClass('select-up')) {
                el.lastElementChild.classList.replace('select-up', 'select-down');
            } else {
                el.lastElementChild.classList.add('select-down');
            }
            el.nextElementSibling.style.display = "none";
        }
    }
    selectContainer.firstElementChild.onclick = function () {
        selectFlag = !selectFlag;
        showSelect(this, selectFlag);
    };
    let isBlur = false;
    let selectOptionArr = [].slice.call(selectContainer.lastElementChild.children);
    selectOptionArr.forEach((item, index) => {
        item.onclick = function () {
            selectFlag = false;
            isBlur = true;
            let select_content = this.innerHTML;
            this.parentElement.previousElementSibling.firstElementChild.innerHTML = select_content;
            selectOptionArr.map((opt) => {
                opt.classList.remove('select-this');
            });
            this.classList.add('select-this');
            showSelect(this.parentElement.previousElementSibling, false);
        }
    });
    selectContainer.firstElementChild.firstElementChild.onblur = function () {
        setTimeout(() => {
            if (!isBlur) {
                selectFlag = false;
                showSelect(this.parentElement, false);
            } else {
                isBlur = false;
            }
        }, 200)
    };
}
selectHandle($('.select-hard'));
$("#setting-btn").addEventListener('click',() => {
    $("#setting").classList.toggle('hide');
});