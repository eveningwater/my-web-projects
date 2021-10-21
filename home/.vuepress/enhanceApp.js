export default ({ isServer }) => {
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
   }
}