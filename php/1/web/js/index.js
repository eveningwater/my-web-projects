const host = "https://www.eveningwater.com/my-web-projects/php/1/";
// const host ='http://localhost:3000/'
const api = {
    addStudent:host + 'add_student.php',
    editStudent:host + 'edit_student.php',
    deleteStudent:host + 'delete_student.php',
    student:host + 'student.php'
};
/**
 *  ajax封装
 * @param {*} url 
 * @param {*} method 
 * @param {*} params 
 * @param {*} callback 
 */
function request(url, method, params = {}, callback) {
    const xhr = new XMLHttpRequest();
    let api = '';
    if (method.toLowerCase() === 'get') {
        api += url + handleParam(params);
    } else {
        api = url;
    }
    xhr.open(method, api, true);
    // 设置请求头
    if (method.toLowerCase() === 'post') {
        xhr.setRequestHeader('Content-Type', "application/json");
    }
    method.toLowerCase() === 'get' ? xhr.send() : xhr.send(JSON.stringify(params));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = xhr.responseText;
            // 以往我们对请求的数据都是在这里进行操作
            // 现在将它作为一个回调函数来实现更高的复用性
            callback(JSON.parse(data));
        }
    }
}
/**
 * 处理参数
 * @param {*} obj 
 */
function handleParam(obj) {
    if (!Object.keys(obj).length) return '';
    let keys = Object.keys(obj),
        length = keys.length,
        keyStr = "";
    for (let key in obj) {
        keyStr += key + '=' + obj[key];
        if (key === keys[length - 1]) {
            break;
        } else {
            keyStr += '&';
        }
    }
    return keyStr;
}
/**
 * 变量定义部分
 */
let tbody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
let sureBtn = document.getElementById('sureBtn');
let myFormContainer = document.getElementById('myFormContainer');
let studentName = document.getElementById('name');
let studentAge = document.getElementById('age');
let openBtn = document.getElementById('addBtn');
let isEdit = false;
let studentData = [];
let checkDeleteBtn = document.getElementById('deleteBtn');
let deleteIdArr = [];
let allChecked = document.getElementById('allChecked');
/**
 * 显示或隐藏元素
 * @param {*} el 
 * @param {*} bool 
 */
function showOrHide(el, bool) {
    setTimeout(() => {
        el.style.display = bool ? 'block' : 'none';
    }, 100)
}
/**
 * 加载数据
 */
function loadData() {
    request(api.student, 'get', {}, function (res) {
        if (res.code === 200) {
            studentData = res.data;
            // 渲染页面元素
            renderHTML(res.data);
        }
    });
    // 点击添加学生
    openBtn.onclick = function () {
        showOrHide(myFormContainer, true);
        // 是否是编辑学生
        isEdit = false;
    }
    // 点击删除学生
    checkDeleteBtn.onclick = function () {
        if (!deleteIdArr.length) {
            return alert('请先选择要删除的学生!');
        }
        if (confirm('确定要删除选中的学生吗?')) {
            request(api.deleteStudent,'post', deleteIdArr, function (res) {
                if (res.code === 200) {
                    alert(res.msg);
                    loadData();
                    allChecked.checked = false;
                    allChecked.indeterminate = false;
                }
            });
        }
    }
    // 点击确定添加或修改学生
    sureBtn.onclick = function () {
        let name = studentName.value, age = studentAge.value;
        if (!name || !age) return;
        if (!isEdit) {
            request(api.addStudent, 'post', { name: name, age: age }, function (res) {
                if (res.code === 200) {
                    alert(res.msg);
                    clearForm([studentName, studentAge]);
                    loadData();
                    showOrHide(myFormContainer, false);
                }
            });
        } else {
            const id = Number(this.getAttribute('data-id'));
            // 编辑学生
            request(api.editStudent, 'post', { id: id, name: name, age: age }, function (res) {
                if (res.code === 200) {
                    alert(res.msg);
                    clearForm([studentName, studentAge]);
                    showOrHide(myFormContainer, false);
                    loadData();
                }
            });
        }
    };
    // 点击关闭遮罩层
    myFormContainer.onclick = function (e) {
        if (e.target.id === 'myFormContainer') {
            showOrHide(this, false);
            clearForm([studentName, studentAge]);
        }
    }
}
/**
 * 清除表单
 * @param {*} elArr 
 */
function clearForm(elArr) {
    if (Array.isArray(elArr)) {
        elArr.map((el) => {
            el.value = "";
        });
    }
}
/**
 * 渲染HTML
 * @param {*} data 
 */
function renderHTML(data) {
    let html = '';
    data.map((r) => {
        html += `<tr>
                    <td>
                        <input type="checkbox" class="checkStudent"/>
                    </td>
                    <td>${r.id}</td>
                    <td>${r.name}</td>
                    <td>${r.age}</td>
                    <td>
                        <button type="button" class="editBtn">编辑</button>
                        <button type="button" class="deleteBtn">删除</button>
                    </td>
                </tr>`;
    });
    tbody.innerHTML = html;
    let editBtn = document.getElementsByClassName('editBtn');
    let deleteBtn = document.getElementsByClassName('deleteBtn');
    // 点击编辑学生信息
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].onclick = function () {
            showOrHide(myFormContainer, true);
            isEdit = true;
            const id = Number(this.parentElement.parentElement.children[1].textContent);
            studentData.map((data) => {
                if (data.id === id) {
                    sureBtn.setAttribute('data-id', id);
                    for (let key in data) {
                        if (key.indexOf('name') > -1) {
                            editValue(studentName, data[key]);
                        } else if (key.indexOf('age') > -1) {
                            editValue(studentAge, data[key]);
                        }
                    }
                }
            })
        }
    }
    // 点击删除学生
    for (let j = 0; j < deleteBtn.length; j++) {
        deleteBtn[j].onclick = function () {
            const id = Number(this.parentElement.parentElement.children[1].textContent);
            if (confirm('确定要删除该学生吗?')) {
                request(api.deleteStudent, 'post', [id], function (res) {
                    if (res.code === 200) {
                        alert(res.msg);
                        loadData();
                    }
                });
            }
        }
    }
    // 选中
    let checkbox = tbody.getElementsByClassName('checkStudent');
    let count = 0;
    for (let k = 0; k < checkbox.length; k++) {
        checkbox[k].onclick = function () {
            const id = Number(this.parentElement.parentElement.children[1].textContent);
            if (this.checked) {
                deleteIdArr.push(id);
                allChecked.indeterminate = true;
                count++;
            } else {
                count--;
                if (deleteIdArr.length) {
                    const index = deleteIdArr.findIndex((i) => { return i === id });
                    deleteIdArr.splice(index, 1);
                }
            }
            if(count > 0 && count < checkbox.length){
                allChecked.indeterminate = true;
            }else if(count === checkbox.length){
                allChecked.checked = true;
                allChecked.indeterminate = false;
            }else{
                allChecked.checked = false;
                allChecked.indeterminate = false;
            }
        }
    }
    // 全选
    allChecked.onclick = function(){
        if(this.checked){
            studentData.map((s,index) => {
                deleteIdArr.push(s.id);
                checkbox[index].checked = true;
            });
        }else{
            deleteIdArr = [];
            for(let i = 0;i < checkbox.length;i++){
                checkbox[i].checked = false;
            }
        }
    }
}
/**
 * 编辑赋值
 * @param {*} el 
 * @param {*} data 
 */
function editValue(el, data) {
    return el.value = data;
}
window.onload = function () {
    loadData();
}