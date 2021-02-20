/**
 *  全局变量定义部分
 * 
 */
var searchForm = $("#search-form");
var searchFormInputs = searchForm.querySelectorAll('.base-input');
var findBtn = $("#find-btn");
var resetBtn = $("#reset-btn");
var addDataBtn = $("#add-data-btn");
var tableData = $("#tableData");
// uuid
var uuid = null;
// 数据库相关变量
var request,database,dataStore;
var indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;
request = indexedDB.open("personDB",2);
/**
 * 创建一个添加/编辑数据的弹框
 * @param {*} data 
 * @param {*} keyPath 
 */
function createForm(data,keyPath){
    return ewConfirm({
        title:`${ data ? '编辑' : '新增'}人员`,
        content:`
            <form class="base-form" id="handle-form">
                <div class="base-form-item">
                    <label>姓名:</label>
                    <input type="text" class="base-input" value="${ data ? data.name : ''}"/>
                </div>
                <div class="base-form-item">
                    <label>年龄:</label>
                    <input type="text" class="base-input" value="${ data ? data.age : ''}"/>
                </div>
                <div class="base-form-item">
                    <label>电话:</label>
                    <input type="text" class="base-input" value="${ data ? data.tel : ''}"/>
                </div>
                <div class="base-form-item">
                    <label>职业:</label>
                    <input type="text" class="base-input" value="${ data ? data.job : ''}"/>
                </div>
                <div class="base-form-item">
                    <label>爱好:</label>
                    <input type="text" class="base-input" value="${ data ? data.hobby : ''}"/>
                </div>
            </form>
        `,
        showCancel:true,
        sure:function(context){
            let handleInputs = $("#handle-form").querySelectorAll('.base-input');
            // 如果没有传入数据，则为新增数据
            if(!data)keyPath = createUUID();
            let addOrUpdateParam = {
                uuid:keyPath
            }
            let allData = judgeInputs(handleInputs);
            if(allData){
                if(!data){
                    addTableData(Object.assign(addOrUpdateParam,allData),context);
                }else{
                    editTableData(Object.assign(addOrUpdateParam,allData),context);
                }
            }
        }
    })
}
/**
 * 判断输入框的输入内容
 * @param {*} inputs 
 */
function judgeInputs(inputs){
    let name = inputs[0].value, //姓名
        age = filterInt(inputs[1].value), //年龄
        tel = inputs[2].value, //电话
        job = inputs[3].value, //职业
        hobby = inputs[4].value; //爱好
    let errorText = "";
    if(!name || name.length <= 2 || name.length > 20){
        errorText = "请输入姓名，并且姓名字数不得小于2个或者大于20个!";
    }else if(isNaN(age) || age <= 0){
        errorText = "请输入年龄，并且年龄不能为小于0的数，也不能为小数等!"
    }else if(!tel || !/^1[345678]\d{9}$/.test(tel)){
        errorText = "请输入正确格式的电话号码，示例如:18283984473!"
    }else if(!job || job.length <= 2){
        errorText = "请输入职业，并且字数不能小于2!";
    }else if(!hobby || hobby.length <= 2){
        errorText = "请输入爱好，并且字数不能小于2!";
    }else{
        errorText = "";
    }
    if(errorText){
        $message.error(errorText);
        return false;
    }else{
        return {
            name:name,
            age:age,
            tel:tel,
            job:job,
            hobby:hobby
        }
    }
}
/**
 * 打开数据库失败回调函数
 * @param {*} event 
 */
function requestError(event){
    console.log("打开数据库失败!",event);
    $message({
        type:"error",
        content:"打开数据库失败!"
    })
}
/**
 * 打开数据库成功回调函数
 * @param {*} event 
 */
function requestSuccess(event){
    console.log("打开数据库成功!");
    database = request.result;
    EventUtil.addHandler(resetBtn,'click',resetHandler);
    EventUtil.addHandler(findBtn,'click',findHandler);
    EventUtil.addHandler(addDataBtn,'click',addTableDataHandler);
    defaultQuery();
}
/**
 * 当数据库更新时
 * @param {*} event 
 */
function upgradeNeeded(event) {
    database = event.target.result;
    // 如果数据库中不存在person表，则新建该表
    if(!database.objectStoreNames.contains('person')){
        // 创建表
        dataStore = database.createObjectStore('person',{ keyPath:"uuid" });
    }
}
/**
 * 重置操作
 */
function resetHandler(){
    searchFormInputs.forEach(item => item.value = "");
    defaultQuery();
}
/**
 * 查询数据
 */
function findHandler(){
    let valueArr = [];
    searchFormInputs.forEach(item => {
        if(item.value){
            valueArr.push({
                data:item.value,
                key:item.getAttribute('data-key')
            })
        }
    });
    queryDBData(valueArr,(data) => {
        renderTable(data);
    });
}
/**
 * 添加数据
 */
function addTableDataHandler(){
    return createForm(null,uuid);
}
/**
 * 添加数据成功
 * @param {*} data 
 * @param {*} context 
 */
function addTableData(data,context){
    // console.log(data);
    let request = getObjectStore().add(data);
    request.onsuccess = function(){
        $message.success("添加数据成功!");
        defaultQuery();
        context.close(600);
    }
    request.onerror = function(){
        $message.error("添加数据失败!");
    }
}
/**
 * 删除数据
 * @param {*} uuid 
 * @param {*} context 
 */
function removeTableData(uuid,context){
    let request = getObjectStore().delete(uuid);
    request.onsuccess = function(){
        $message.success("删除数据成功!");
        defaultQuery();
        context.close(600);
    }
    request.onerror = function(){
        $message.error("删除数据失败!");
    }
}
/**
 * 更新数据库数据
 * @param {*} data 
 * @param {*} context 
 */
function editTableData(data,context){
    let request = getObjectStore().put(data);
    request.onsuccess = function(){
        $message.success("更新数据成功!");
        defaultQuery();
        context.close(600);
    }
    request.onerror = function(){
        $message.error("更新数据失败!");
    }
}
/**
 * 查询数据库数据
 * @param {*} data 
 */
function queryDBData(data,callback){
    let request = getObjectStore().getAll();
    request.onsuccess = function(){
        let result = request.result;
        if(data){
            // 实现模糊查询
            result = result.reduce((res,item) => {
                let isSearch = true;
                data.map(_ => {
                    if(item[_.key].toString().indexOf(_.data) === -1)isSearch = false;
                });
                if(isSearch)res.push(item);
                return res;
            },[]);
        }
        callback(result);
    }
    request.onerror = function(){
        console.log('查询数据库中的数据失败!');
    }
}
/**
 * 默认查询数据
 */
function defaultQuery(){
    return queryDBData(null,(data) => {
        if(Array.isArray(data)){
            renderTable(data);
        }
    })
}
/**
 * 渲染表格
 * @param {*} data 
 */
function renderTable(data){
    let content = "";
    data.forEach(item => {
        content += `
            <tr>
                <td>${ item.uuid}</td>
                <td>${ item.name}</td>
                <td>${ item.age}</td>
                <td>${ item.tel}</td>
                <td>${ item.job}</td>
                <td>${ item.hobby}</td>
                <td>
                    <button type="button" class="base-btn base-btn-primary edit-data-btn" data-id=${item.uuid}>编辑</button>
                    <button type="button" class="base-btn base-btn-danger delete-data-btn" data-id=${item.uuid}>删除</button>
                </td>
            </tr>
        `
    });
    tableData.querySelector('tbody').innerHTML = content;
    // 删除
    $$('.delete-data-btn').forEach(item => {
        EventUtil.addHandler(item,'click',function(){
            ewConfirm({
                title:"温馨提示",
                content:"确定要删除该人员吗?",
                showCancel:true,
                sure:function(context){
                    let uuid = item.getAttribute('data-id');
                    removeTableData(uuid,context);
                }
            })
        })
    });
    // 编辑
    $$('.edit-data-btn').forEach(item => {
        EventUtil.addHandler(item,'click',function(){
            let uuid = item.getAttribute('data-id');
            let editData = data.find(_ => _.uuid === uuid);
            createForm(editData,uuid);
        })
    });
}
/**
 * 获取事务对象
 */
function getObjectStore(){
    return database.transaction(['person'],'readwrite').objectStore('person');
}
request.onerror = requestError;
request.onsuccess = requestSuccess;
request.onupgradeneeded = upgradeNeeded;