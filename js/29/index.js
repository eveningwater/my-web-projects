let _toString =  Object.prototype.toString;
let util = {
    isStr: (value) => { return typeof value === 'string' },
    isObject:(value) => { return typeof value === 'object' && !!value },
    isDeepObject:(value) => { return  _toString.call(value).slice(8,-1).toLowerCase().exit('object')}
}
String.prototype.exit = function (value) {
    return this.indexOf(value) > -1;
}
function toJSONData(options) {
    if (util.isStr(options)) {
        this.init(this.query(options),{},'test.json');
    }else if(util.isDeepObject(options)){
        this.init(this.query(options.el),options.keyNames,options.fileName);
    }
}
toJSONData.prototype.query = function (value) {
    return document.querySelector(value);
}
toJSONData.prototype.queryAll = function (value) {
    return document.querySelectorAll(value);
}
toJSONData.prototype.init = function (element,keyNames,fileName) {
    if(!element)return;
    let resultData = [];
    let rows = element.rows;
    let j = rows[0].cells[0].localName.exit('th') ? 1 : 0;
    for (let rowsLen = rows.length; j < rowsLen; j++) {
        let defaultKey = {};
        for (let k = 0, cellsLen = rows[j].cells.length; k < cellsLen; k++) {
            if(keyNames.length){
                for(let l = 0,keysLen = keyNames.length;l < keysLen;l++){
                   defaultKey[keyNames[l]] = rows[j].cells[l].textContent;
                }
            }else{
                defaultKey[k] = rows[j].cells[k].textContent;
            }
        }
        resultData.push(defaultKey);
    }
    return this.excelData(resultData,fileName);
}
toJSONData.prototype.excelData = function (data, fileName) {
    const a = document.createElement('a');
    a.download = fileName;
    a.style.display = 'none';
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)]));
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}