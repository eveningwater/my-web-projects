interface $MessageType {
    [prop:string]:Function;
}
interface OptionType {
    [x: string]: any;
    content:string;
    center:boolean;
    type:string;
    closeTime:number;
    showClose:boolean;
}
const $message:$MessageType = {};
const typeMap = {
    success:"success",
    info:"info",
    warning:"warning",
    error:"error"
};
function isFunction<T>(value:T){
    return typeof value === 'function';
}
function isDom(el:HTMLElement | Element) {
    return typeof HTMLElement === 'object' ? el instanceof HTMLElement : el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string' || el instanceof HTMLCollection || el instanceof NodeList;
}
function addMessageStyle() {
    var cssText = `
    .ew-message {
        min-width: 300px;
        border: 1px solid #ebeef5;
        position: fixed;
        left: 50%;
        background-color: #edf2fc;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        padding: 10px 15px;
        overflow: hidden;
        transition: transform .4s;
        border-radius: 4px;
        top: 25px;
        z-index: 10001;
    }
    
    .ew-message .ew-message-close {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        cursor: pointer;
        color: #C0C4CC;
        font-size: 16px;
    }
    .ew-message>.ew-message-close:hover,
    .ew-message>.ew-message-close:active {
        color: #909399;
    }
    .ew-message-info p {
        color: #909399;
        line-height: 1;
        font-size: 14px;
    }
    .ew-message-center {
        justify-content: center;
    }
    .ew-message-success {
        background-color: #e1f3d8;
        border-color: #e1f3d8;
    }
    .ew-message-success p {
        color: #67c23a;
    }
    .ew-message-warning {
        background-color: #fdfce6;
        border-color: #faecd8;
    }
    .ew-message-warning p {
        color: #e6a23c;
    }
    .ew-message-error {
        background-color: #fef0f0;
        border-color: #fde2e2;
    }
    .ew-message-error p {
        color: #f56c6c;
    }`;

    function styleInject(css: string, ref: { insertAt?: any; } | undefined) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;
        if (!css || typeof document === 'undefined') return;
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = "text/css";
        if (insertAt === 'top') {
            if (head.firstChild) {
                head.insertBefore(style, head.firstChild)
            } else {
                head.appendChild(style);
            }
        } else {
            head.appendChild(style);
        }
        if ((style as unknown as CSSImportRule).styleSheet) {
            ((style as unknown as CSSImportRule).styleSheet as unknown as CSSRule).cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }
    styleInject(cssText,undefined);
}
addMessageStyle();
for(let key in typeMap){
    $message[key] = function(option: string){
        let messageOption = {
            content:"默认内容",
            center:false,
            type:key,
            closeTime:600,
            showClose:true
        }
        if(typeof option === 'string'){
            messageOption.content = option;
        }else if(typeof option === 'object' && !!option){
            messageOption = Object.assign(messageOption,option);
        }
       return new (Message as any)(messageOption);
    }
}

export function Message(this: any, option: string | OptionType){
    let messageOption = {
        content:"默认内容",
        center:false,
        type:"info",
        closeTime:600,
        showClose:true
    }
    if(typeof option === 'string'){
        messageOption.content = option;
    }else if(typeof option === 'object' && !!option){
        messageOption = Object.assign(messageOption,option);
    }
    this.render(messageOption);
}
Message.prototype.render = function(messageOption:OptionType){
    if (messageOption.closeTime <= 0 && !messageOption.showClose) messageOption.showClose = true;
    let closeBtn = null;
    if (messageOption.showClose) {
        closeBtn = document.createElement('i');
        closeBtn.classList.add('ew-message-close');
        closeBtn.innerHTML = '&times;';
    }
    document.body.appendChild(this.create(messageOption, closeBtn));
    let messageElement = document.querySelectorAll('.ew-message');
    this.setTop(messageElement);
    if (messageOption.closeTime > 0) {
        this.close(messageOption.el, messageOption.closeTime);
    }
    if (messageOption.closeBtnEl) {
        messageOption.closeBtnEl.onclick = (e: { currentTarget: { parentElement: any; }; }) => {
            this.close(e.currentTarget.parentElement, 0);
        }
    }
}
Message.prototype.setTop = function (messageElement: { setAttribute: (arg0: string, arg1: string) => void; }[]) {
    if(!messageElement || !messageElement.length)return;
    const height = messageElement.length ? (messageElement[0] as HTMLElement).offsetHeight : (messageElement as unknown as HTMLElement).offsetHeight;
    for (let i = 0, len = messageElement.length; i < len; i++) {
        messageElement[i].setAttribute('style', 'top:' + (25 * (i + 1) + height * i) + 'px;');
    }
}
Message.prototype.create = function(messageOption:OptionType,closeBtn: any){
    let element = document.createElement('div');
    element.className = `ew-message ew-message-${messageOption.type}`;
    if (messageOption.center) element.classList.add('ew-message-center');
    const p = document.createElement('p');
    p.innerHTML = messageOption.content;
    element.appendChild(p);
    if (closeBtn) element.appendChild(closeBtn);
    messageOption.el = element;
    messageOption.closeBtnEl = closeBtn;
    return element;
}
Message.prototype.close = function(messageElement:HTMLElement | Element | NodeList, time: number){
    setTimeout(() => {
        if (messageElement && (messageElement as NodeList).length) {
            [].slice.call(messageElement).forEach((item:HTMLElement | Element) => {
                const parent = item.parentElement as HTMLElement | Element;
                if (isDom(item) && isDom(parent) && isFunction(parent.removeChild)) {
                    parent.removeChild(item);
                }
            })
        } else {
            const parent = (messageElement as HTMLElement | Element).parentElement as HTMLElement | Element;
            if (isDom(messageElement as HTMLElement | Element) && isDom(parent) && isFunction(parent.removeChild)) {
                parent.removeChild(messageElement as HTMLElement | Element);
            }
        }
        this.setTop(document.querySelectorAll('.ew-message'));
    }, time * 10);
}
export default $message;