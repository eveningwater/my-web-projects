const $ = (v,el = document) => el.querySelector(v);
const $$ = (v,el = document) => el.querySelectorAll(v);

const form = $("#form");
const todoList = $("#todo-list");
const input = $(".input",form);

const todoData = localStorage.getItem("todoData");
if(todoData){
    const _todoData = JSON.parse(todoData) || [];
    _todoData.forEach(todo => addTodo(todo));
}
form.addEventListener("submit",e => {
    e.preventDefault();
    addTodo();
});
function addTodo(todo){
    let inputValue = input.value;
    if(todo){
        inputValue = todo.text;
    }
    if(inputValue){
        const liItem = document.createElement("li");
        liItem.innerText = inputValue;
        if(todo && todo.complete){
            liItem.classList.add("complete");
        }
        liItem.addEventListener("click",() => {
            liItem.classList.toggle("complete");
            updateList();
        });
        liItem.addEventListener("contextmenu",(e) => {
            e.preventDefault();
            liItem.remove();
            updateList();
        });
        todoList.appendChild(liItem);
        input.value = "";
        updateList();
    }
}
function updateList(){
    const listItem = $$("li",todoList);
    const saveTodoData = [];
    listItem.forEach(item => {
        saveTodoData.push({
            text:item.innerText,
            complete:item.classList.contains("complete")
        })
    });
    localStorage.setItem("todoData",JSON.stringify(saveTodoData));
}