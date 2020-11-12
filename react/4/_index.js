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
        {props.todoList.map(
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
// 请求数据
const onRequestTodoList = (setListData) => {
    let todoList = [];
    todoList.push({
        uuid: createUUID(),
        text: "Now you can learn react.js by writing the todo-list application!"
    })
    setListData(todoList);
}
// 值改变时
const handleChange = (event, { setState }) => {
    setState(event.target.value);
}
// 点击确认添加或确认编辑
const handleToDo = ({ state, listData, editUUid, setState, setListData, setEditUUid }) => {
    if (!state) return $message.error("请输入需要待办的事项!");
    // 等于-1表示是添加否则是编辑
    if (editUUid === -1) {
        let newTodoList = [];
        newTodoList.push({
            text: state,
            uuid: createUUID()
        });
        setListData(listData.concat(newTodoList));
        setState("");
    } else {
        let idx = listData.findIndex(_ => _.uuid === editUUid);
        if (idx > -1) {
            listData[idx].text = state;
        }
        setListData(listData);
        setState("");
        setEditUUid(-1);
    }
};
// 当输入值并按下enter键时触发
const handleKeyDown = (event, todoParams) => {
    if (event.keyCode === 13) {
        handleToDo(todoParams);
    } else {
        return null;
    }
}
// 点击编辑
const handleEdit = (item, { editUUid, setEditUUid, setState }) => {
    if (editUUid === -1 || editUUid !== item.uuid) {
        setEditUUid(item.uuid);
        setState(item.text);
    } else {
        setEditUUid(-1)
        setState("");
    }
}
// 点击删除
const handleDelete = (item, { listData, setListData }) => {
    ewConfirm({
        title: "温馨提示",
        content: "确定要删除该待办事项吗?",
        showCancel: true,
        sure: (context) => {
            context.close();
            // copy the listData and splice the item,set the copyable data to listData,the dom can update the listData
            // so why?
            const data = listData.slice();
            const idx = data.findIndex(_ => _.uuid === item.uuid);
            if (idx > -1) data.splice(idx, 1);
            setListData(data);
        }
    })
}
// 点击查看待办事项详情
const seeDetail = (item) => {
    return $message.info("待办事项详情:" + item.text);
}
// 应用组件函数写法
const App = (props) => {
    const [state, setState] = React.useState("");//输入的值
    const [editUUid, setEditUUid] = React.useState(-1);//编辑事项的uuid
    const [listData, setListData] = React.useState([]);//todoList
    // 用作参数来进行传递
    const todoParams = {
        state: state,
        setState: setState,
        editUUid: editUUid,
        setEditUUid: setEditUUid,
        listData: listData,
        setListData: setListData
    }
    React.useEffect(() => {
        onRequestTodoList(setListData);
    }, []);
    return (
        <section className={props.className}>
            <div className="handle-container">
                <TodoInput 
                    handleChange={() => handleChange(event, todoParams)} 
                    todo_value={state} 
                    handleKeyDown={() => handleKeyDown(event, todoParams)} 
                />
                <AddEditButton 
                    onToDo={() => handleToDo(todoParams)} 
                    editUUid={editUUid} 
                />
            </div>
            <Lists
                handleEdit={(item) => handleEdit(item, todoParams)}
                todoList={listData}
                handleDelete={(item) => handleDelete(item, todoParams)}
                seeDetail={(item) => seeDetail(item)}
                editUUid={editUUid}
            />
        </section>
    )
}
ReactDOM.render(<App className="flex-center" />, root);