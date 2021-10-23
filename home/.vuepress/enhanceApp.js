function changeLinkHandler(Vue,app){
    Vue.nextTick().then(() => {
        const allLinks = app.getElementsByTagName("a");
        const host = "https://www.eveningwater.com/my-web-projects/home/";
        Array.from(allLinks).forEach(item => {
            const currentLink = item.getAttribute("href");
            if(item.getAttribute("target") === "_blank" && currentLink.indexOf("online-template") === -1){
                item.setAttribute("href",host + "online-template.html?target=" + encodeURIComponent(currentLink));
            }
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
        window.addEventListener("load",() => {
            const app = router.app.$el;
            changeLinkHandler(Vue,app);
            const config = {
                attributes: true, 
                childList: true, 
                subtree: true 
            };
            const callback = () => {
                changeLinkHandler(Vue,app);
            }
            const observer = new MutationObserver(callback);
            observer.observe(app,config);
        });
   }
}