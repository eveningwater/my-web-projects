const root = document.querySelector('#app');
const createUUID = () => (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + new Date().getTime() + '-' + Math.random().toString().substr(2, 5);

//input组件 
const TodoInput = (props) => (
    <input type="text" className="ew-input" value={props.todo_value} placeholder="请输入需要待办的事项" onChange={props.handleChange} onKeyDown={props.handleKeyDown} />
);
// 添加与编辑组件
const AddEditButton = (props) => (
    <button className="ew-btn ew-btn-primary ml-15" type="button" onClick={props.onToDo}>确认{props.editUUid !== -1 ? '编辑' : '添加'}</button>
);
// todoList列表组件
const Lists = (props) => (
    <div className="todo-list">
        {
            props.todoList.map(
                (todo, index) =>
                    (
                        <div className="todo-list-item" key={todo.uuid} order={(index + 1) + '.'}>
                            <p onClick={props.seeDetail.bind(this, todo)}>{todo.text}</p>
                            <div className="ml-15 ew-btn-group">
                                <button class="ew-btn ew-btn-primary" type="button" onClick={props.handleEdit.bind(this, todo, index)}>
                                    {props.editUUid !== -1 && props.editUUid === todo.uuid ? '取消' : ''}编辑
                                </button>
                                <button class="ew-btn ew-btn-danger ml-15" type="button" onClick={props.handleDelete.bind(this, todo, index)}>删除</button>
                            </div>
                        </div>
                    )
            )
        }
    </div>
);
// 应用组件
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_value: "",
            todoList: [],
            editUUid: -1
        }
        this.handleToDo = this.onHandleToDo.bind(this);
        this.handleChange = this.onHandleChange.bind(this);
        this.handleEdit = this.onHandleEdit.bind(this);
        this.handleDelete = this.onHandleDelete.bind(this);
        this.seeDetail = this.onSeeDetail.bind(this);
        this.handleKeyDown = this.onHandleKeyDown.bind(this);
    }
    componentDidMount() {
        this.onRequestTodoList()
    }
    onRequestTodoList() {
        let todoList = [];
        todoList.push({
            uuid: createUUID(),
            text: "Now you can learn react.js by writing the todo-list application!"
        })
        this.setState(state => ({
            todoList: todoList
        }))
    }
    onHandleKeyDown(event) {
        if (event.keyCode === 13) {
            this.onHandleToDo();
        } else {
            return null;
        }
    }
    onHandleToDo() {
        const { todo_value, editUUid, todoList } = this.state;
        if (!todo_value) return $message.error("请输入需要待办的事项!");
        let newState = {};
        // 等于-1表示是添加否则是编辑
        if (editUUid === -1) {
            let newTodoList = [];
            newTodoList.push({
                text: todo_value,
                uuid: createUUID()
            });
            newState['todoList'] = todoList.concat(newTodoList);
            newState['todo_value'] = '';
        } else {
            let idx = todoList.findIndex(_ => _.uuid === editUUid);
            if (idx > -1) {
                todoList[idx].text = todo_value;
            }
            newState['todoList'] = todoList;
            newState['todo_value'] = '';
            newState['editUUid'] = -1;
        }
        this.setState(newState);
    }
    onHandleEdit(item) {
        const { editUUid } = this.state;
        let newState = {};
        if (editUUid === -1 || editUUid !== item.uuid) {
            newState['todo_value'] = item.text;
            newState['editUUid'] = item.uuid;
        } else {
            newState['todo_value'] = "";
            newState['editUUid'] = -1;
        }
        debugger;
        this.setState(newState);
    }
    onHandleDelete(item) {
        const { todoList } = this.state;
        ewConfirm({
            title: "温馨提示",
            content: "确定要删除该待办事项吗?",
            showCancel: true,
            sure: (context) => {
                context.close();
                const idx = todoList.findIndex(_ => _.uuid === item.uuid);
                if (idx > -1) {
                    todoList.splice(idx, 1);
                    this.setState({
                        todoList: todoList
                    })
                }
            }
        })
    }
    onSeeDetail(item) {
        return $message.info("待办事项详情:" + item.text);
    }
    onHandleChange(event) {
        this.setState(() => ({
            todo_value: event.target.value
        }))
    }
    render() {
        return (
            <section className={this.props.className}>
                <div className="handle-container">
                    <TodoInput handleChange={this.handleChange} todo_value={this.state.todo_value} handleKeyDown={this.handleKeyDown} />
                    <AddEditButton onToDo={this.handleToDo} editUUid={this.state.editUUid} />
                </div>
                <Lists
                    handleEdit={this.handleEdit}
                    todoList={this.state.todoList}
                    handleDelete={this.handleDelete}
                    seeDetail={this.seeDetail}
                    editUUid={this.state.editUUid}
                />
            </section>
        )
    }
}
ReactDOM.render(<App className="flex-center" />, root);