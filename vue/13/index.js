const state = Vue.reactive({
    todoList: [
        {
            text: "学习vue.js"
        }
    ],
    todoValue: "",
    editIndex: -1
});
/*
*  添加与编辑
*/
function addTodo() {
    let errorText = '';
    if (!state.todoValue) {
        errorText = '请输入需要待办的事项!'
    }
    if (errorText) {
        return $message.error(errorText)
    } else {
        if (state.editIndex > -1) {
            state.todoList[state.editIndex].text = state.todoValue;
            state.editIndex = -1;
        } else {
            state.todoList.push({ text: state.todoValue })
        }
        setTimeout(() => { state.todoValue = ''; })
    }
}
/*
* 编辑
*/
function editTodo(item, index) {
    state.todoValue = item.text;
    state.editIndex = state.editIndex > -1 && state.editIndex === index ? -1 : state.todoList.findIndex(_ => item.text === _.text);
    if (state.editIndex === -1) {
        state.todoValue = '';
    }
}
/*
*  删除
*/
function deleteTodo(index) {
    if (state.editIndex === index) return $message.error('当前待办事项正处于编辑状态，请先确认编辑或者取消编辑再点击删除!')
    ewConfirm({
        title: "温馨提示",
        content: "确认要删除吗?",
        sure: function (context) {
            if (state.todoList.length) {
                state.todoList.splice(index, 1);
                state.editIndex = -1;
                state.todoValue = '';
            } else {
                return $message.warning("当前并无可删的待办事项");
            }
            Vue.nextTick(() => {
                context.close(500);
            });
        },
        showCancel: true
    })
}
function seeDetail(text) {
    return $message.info({
        closeTime: 1000,
        content: text
    });
}
const App = {
    setup() {
        return {
            state,
            addTodo,
            editTodo,
            deleteTodo,
            seeDetail
        }
    }
}
Vue.createApp(App).mount('#app');