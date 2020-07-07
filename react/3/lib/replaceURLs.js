//定义url正则表达式
const urlRegx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w\-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w!\/]*))?)/g;
//导出创建链接组件
export default function createAnchors(message){
	// Don't break <img src="http:..." /> or mailtos or other anchors
	//参数
	return regxReplace(message,urlRegx,function(match){
		// console.log(message)
		//url与正则匹配,并返回匹配后的url
		if(/(src=|href=|mailto:)/.test(message.slice(message.indexOf(match) - 7).slice(0, 7))){
			return match;
		}
		let href = match;
		//匹配http + url
		if (match.slice(0, 4) !== 'http'){
			href = 'http://' + href;
		} 
		//返回url
//		return '<a href="' + href + '" target="_blank">' + match.replace('www.', '') + '</a>';
		return `<a href="${ href }" target="_blank">${ match.replace('www.','')}</a>`
	})
}
//简单的正则替代匹配函数
export function regxReplace(message, regx, replace){
	const match = message.match(regx);
	if(match && match.length){
		for(let i = 0,len = match.length; i < len;i++){
			//replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式），假如没有找到，则不会进行任何替换操作
			message = message.replace(match[i],(typeof replace === 'function' ? replace(match[i]) : replace ))
		}
	}
	return message;
}