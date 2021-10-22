import LocateConfirm from "./components/LocateConfirm.vue";
function changeLinkHandler(Vue,el){
    Vue.nextTick().then(() => {
        const allLinks = document.getElementsByTagName("a");
        const allStyles = document.getElementsByTagName("style");
        //handle the parse style text
        const allStyleText = Array.from(allStyles).map(item => item.innerText.replace(/\[data-v-(.*?)\]/g,"")).filter(style => style.indexOf("mwp-") > -1);
        const lastLink = location.href;
        Array.from(allLinks).forEach(item => {
            item.addEventListener("click",e => {
                e.stopPropagation();
                const target = item.getAttribute("target");
                if(target === "_blank"){
                    e.preventDefault();
                    const currentLink = item.getAttribute("href");
                    const vm = new Vue({
                        render:(h) => h(LocateConfirm,{ props:{ link:currentLink,lastLink }})
                    });
                    //Can not use relative url,this will cause locate error....
                    const host = "https://www.eveningwater.com/my-web-projects/home/";
                    const openWindow = window.open(host + "online-template.html?target=" + encodeURIComponent(currentLink),"_blank");
                    // if you are run in local by use yarn home command,you can use the code as follow:
                    // window.open("/local-template.html","_blank");
                    // const openWindow = window.open("/html/template.html","_blank");
                    // openWindow.addEventListener("load",() => {
                    //     const innerDocument = openWindow.frames.document;
                    //     const styleElement = document.createElement("style");
                    //     styleElement.type = "text/css";
                    //     styleElement.textContent = allStyleText[0];
                    //     const app = innerDocument.getElementById("app");
                    //     const head = innerDocument.head;
                    //     head.appendChild(styleElement);
                    //     vm.$mount(app);
                    //     setTimeout(() => {
                    //         const continueBtn = innerDocument.getElementsByClassName("mwp-middle-btn")[0];
                    //         continueBtn.addEventListener("click",() => {
                    //             const continueWindow = window.open(currentLink,"_blank");
                    //             continueWindow.opener = null;
                    //             openWindow.close();
                    //         })
                    //     },0)
                    // });
                    openWindow.opener = null;
                }
            })
        })
    })
}
export default ({ isServer,Vue,router }) => {
   if(!isServer){
        console.log(
            `%c my-web-projects%c 联系QQ：854806732 %c 联系微信：eveningwater %c github:https://github.com/eveningwater/my-web-projects %c `,
            'background:#0ca6dc ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#ff7878 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:#ff7878 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#ff7878 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent'
        );
        console.log("%c ", 
            "padding:50px;border-radius:15px;background:url(https://www.eveningwater.com/static/image/smile.svg)no-repeat center/cover;margin-left:15px;"
        );
        window.addEventListener("load",(e) => {
            const app = document.getElementById("app");
            changeLinkHandler(Vue,app);
            const config = {
                attributes:true,
                subtree:true,
                childList:true
            };
            const callback = () => {
                changeLinkHandler(Vue,app);
            }
            const observer = new MutationObserver(callback);
            observer.observe(app,config);
        })
   }
}