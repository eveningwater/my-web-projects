//定义空对象接收内容
//定义style
let styleBuffer = '';
let fullTextStorage = {};

//导出写字组件,参数元素本身,字体,样式
export default function writeChar(el,char,style){
	//抓住文本。我们在存储中缓存它，所以我们不必每次迭代都从DOM读取。
	let fullText = fullTextStorage[el.id];
	//如果没有文本判断
	if(!fullText){
		fullText = fullTextStorage[el.id] = el.innerHTML;
	}
	//但是我们每次迭代都会向DOM写入，这可能相当慢。
	fullText = handleChar(fullText,char);
	el.innerHTML = fullTextStorage[el.id] = fullText;
	//缓冲区写入<样式>元素，所以我们不需要画那么多。
	styleBuffer += char;
	//没个样式后面都有;结束,所以判断字符是否等于;来设定css样式
	if(char == ';'){
		style.textContent += styleBuffer;
		styleBuffer = '';
	}
}

//普通字符写法函数
export function writeSimpleChar(el,char){
	el.innerHTML += char;
}

//定义一个状态用于判断编辑器是否打开
let openCommont = false;
//正则表达式
const commonRegx = /(\/\*(?:[^](?!\/\*))*\*)$/;
const keyRegx = /([a-zA-Z- ^\n]*)$/;
const valueRegx = /([^:]*)$/;
const selectorRegx = /(.*)$/;
const pxRegx = /\dp/;
const pxRegx2 = /p$/;

//导出写字函数
export function handleChar(fullText,char){
	//根据/来判断每一段内容的开始和结束
	if(openCommont && char !== '/'){
		//在/后结束，所以我们不会在里面高亮显示。
		fullText += char;
	}else if(char === '/' && openCommont === false){
		openCommont = true;
		fullText += char;
	}else if(char === '/' && fullText.slice(-1) === '*' && openCommont === true){
		openCommont = false;
		//不幸的是，我们不能只开一个跨度和关闭它，因为浏览器会帮忙
		//为我们修复它，我们将得到一个字符跨度和一个空的结束标记。
		fullText  = fullText.replace(commonRegx,'<span class="commont">$1/</span>');
	}else if(char === ':'){
		fullText = fullText.replace(keyRegx,'<span class="key">$1</span>:')
	}else if(char === ';'){
		fullText = fullText.replace(valueRegx,'<span class="value">$1</span>;')
	}else if(char === '{'){
		fullText = fullText.replace(selectorRegx,'<span class="selector">$1</span>{')
	}else if(char === 'x' && pxRegx.test(fullText.slice(-2))){
		fullText = fullText.replace(pxRegx2,'<span class="value px">px</span>')
	}else{
	 	fullText += char;	
	}	
	//返回填充的内容
	return fullText;
}

