// @flow
//导出创建动画组件
export default function generatePrefix(){
	// Checking specifically for 'window.document' is for pseudo-browser server-side
	// environments that define 'window' as the global context.
	// E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
	
	if(typeof window === 'undefined' || typeof window.document === 'undefined'){
		return '';
	}
	//浏览器前缀
	const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	//获取style标签
	const style = window.document.documentElement.style;
	//动画属性
	if('transform' in style){
		return '';
	}
	
	for(let i = 0,len = prefixes.length; i < len;i++){
		if(prefixes[i] + 'transform' in style){
			return prefixes[i];
		}
	}
	return '';
}