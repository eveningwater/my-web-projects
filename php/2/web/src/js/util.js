
/*
 * 功能:常用函数
 * 作者:eveningwater
 * 日期:2019/11/23
 */
/**
 * 往上查找组件的父组件
 * @param {*} context 
 * @param {*} componentName 
 * @param {*} componentNames 
 */
export function findComponentUp(context,componentName,componentNames){
	componentNames = typeof componentName === 'string' ? [componentName] : componentName;
	let parent = context.$parent;
	let name = parent.$options.name;
	//如果父组件不是传入的组件名，则循环往上查找,直到找到父组件为传入的组件名为止
	while(parent && (!name || componentName.indexOf(name) === -1)){
		parent = parent.$parent;
		if(parent)name = parent.$options.name;
	}
	return parent;
}
/**
 * 往下查找组件的子组件
 * @param {*} context 
 * @param {*} componentName 
 */
export function findComponentDown(context,componentName){
	const childrens = context.$children;
	let children = null;
	if(childrens.length){
		// 循环遍历数组
// 		for(const child of childrens){
// 			const name = child.$options.name;
// 			if(name === componentName){
// 				children = child;
// 				break;
// 			}else{
// 				children = findComponentDown(child,componentName);
// 				if(children)break;
// 			}
// 		}
		for(let k = 0,len = childrens.length; k < len;k++){
			const name = childrens[k].$options.name;
			if(name === componentName){
				children = childrens[k];
				break;
			}else{
				children = findComponentDown(childrens[k],componentName);
				if(children)break;
			}
		}
	}
	return children
}
/**
 * 查找组件的所有父组件
 * @param {*} context 
 * @param {*} componentName 
 */
export function findComponentsUp(context,componentName){
	let parents = [];
	if(parent){
		const name = parent.$options.name;
		if(name === componentName)parents.push(parent);
		return parents.concat(findComponentsUp(parent,componentName));
	}else{
		return [];
	}
}
/**
 * 查找组件的所有子组件
 * @param {*} context 
 * @param {*} componentName 
 */
export function findComponentsDown(context, componentName) {
	let components = [];
	return context.$children.forEach((child) => {
		if (child.$options.name === componentName) components.push(child);
		let foundChild = findComponentsDown(child, componentName);
		return components.concat(foundChild);
	})
}
/**
 * 查找组件的兄弟组件
 * @param {*} context 
 * @param {*} componentName 
 * @param {*} exceptSelf 
 */
export function findComponentsBrother(context, componentName, exceptSelf = true) {
	// 找到当前组件的父组件的所有子组件
	let childComponents = context.$parent.$children.filter((item) => {
		return item.$options.name === componentName;
	})
	// 所有子组件中包含自身组件的索引
	let selfIndex = childComponents.findIndex((item) => {
		return context._uid === item._uid;
	})
	// 是否删除自身组件
	if (exceptSelf) childComponents.splice(selfIndex, 1);
	return childComponents;
}
/**
 * 判断某项是否存在于数组中
 * @param {*} arr 
 * @param {*} item 
 */
export function oneOf(arr,item){
	for(let i = 0;i < arr.length;i++){
		if(arr[i] === item){
			return true;
		}else{
			return false;
		}
	}
	return false;
}
/**
 * 判断是否是一个字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isString(str){
	return typeof str === 'string';
}