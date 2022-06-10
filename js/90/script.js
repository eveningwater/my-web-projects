let m = marked.marked;
function on(element, type, handler, useCapture = false) {
    if (element && type && handler) {
        element.addEventListener(type, handler, useCapture);
    }
};
function off(element, type, handler, useCapture = false) {
    if (element && type && handler) {
        element.removeEventListener(type, handler, useCapture);
    }
};
function getData() {
    try {
        return JSON.parse(localStorage.getItem("notes"));
    } catch (error) {
        return [];
    }
}
function setUUID() {
    return Math.floor(Math.random() * 10000) + '-' + Date.now().toString().slice(0, 4) + '-' + Math.floor(Math.random() * 10000);
}
function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
const $ = (v, el = document) => el.querySelector(v);
const $$ = (v, el = document) => el.querySelectorAll(v);
const add = $("#add");
const container = $("#note-container");
const notes = getData() || [];
if (Array.isArray(notes) && notes.length) {
    notes.forEach(note => addNewNote(note,false));
}
function addNewNote(note,focusStatus) {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note");
    noteItem.innerHTML = `<div class="tool">
    <button type="button" class="edit">
        <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete">
        <i class="fas fa-trash-alt"></i>
    </button>
    </div>
    <div class="main main-content">${m(note.text)}</div>
    <textarea class="textarea main" data-focus="${ focusStatus }"></textarea>`;
    container.appendChild(noteItem);
    addNoteHandler(noteItem, note.id,focusStatus);
}
function addNoteHandler(note, dataId,focusStatus) {
    const textarea = $('.textarea', note);
    const main = $('.main-content', note);
    if(focusStatus){
        if(textarea.classList.contains("hidden")){
            textarea.classList.remove("hidden");
        }
        textarea.focus();
    }else{
        if(!textarea.classList.contains("hidden")){
            textarea.classList.add("hidden");
        }
    }
    const index = notes.findIndex(_ => _.id === dataId);
    on(textarea, "blur", e => {
        notes[index].text = textarea.value;
        main.innerHTML = m(notes[index].text);
        if(!textarea.classList.contains("hidden")){
            textarea.classList.add("hidden");
        }
        textarea.setAttribute("data-focus","false");
        setData("notes", notes);
    });
    on($(".edit", note), "click", e => {
        const isFocus = textarea.getAttribute("data-focus");
        if (isFocus === "false") {
            textarea.setAttribute("data-focus","true");
            if(textarea.classList.contains("hidden")){
                textarea.classList.remove("hidden");
            }
            if(!focusStatus){
                textarea.value = notes[index].text;
            }
            const text = textarea.value.trim();
            // console.log(text);
            if (textarea.setSelectionRange) {
                textarea.focus();
                textarea.setSelectionRange(text.length, text.length);
            }else if (textarea.createTextRange) {
                const range = textarea.createTextRange();
                range.collapse(true);
                range.moveEnd('character', text.length);
                range.moveStart('character', text.length);
                range.select();
            }
        } else {
            textarea.setAttribute("data-focus","false");
            notes[index].text = textarea.value;
            main.innerHTML = m(notes[index].text);
            setData("notes", notes);
        }
    });
    on($(".delete", note), "click", e => {
        notes.splice(index, 1);
        note.remove();
        setData("notes", notes);
    });
}
window.onload = () => {
    on(add, "click", () => {
        const id = setUUID();
        const noteObject = {
            id,
            text: ""
        };
        notes.push(noteObject);
        setData("notes", notes);
        addNewNote(noteObject,true);
    });
}