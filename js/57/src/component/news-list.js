import Component from './component';

import '../style/news-list.less';
import { hasClass, siblings } from '../util';

export default class NewsList extends Component {
    render() {
        const newsList = this.props.data;
        // console.log(newsList)
        return `
            <section>
                ${
                    newsList.map(list => `
                        <div class="news-card" data-id="${ list.item_id }">
                            <h3>${list.title}</h3>
                            <img src="${list.image_url}" alt="图片加载中" />
                        </div>
                    `).join("")
                }
            </section>
        `;
    }
    addHandler(){
        const onClickHandler = target => {
            siblings(target).forEach(item => item.classList.remove('active'));
            target.classList.add('active');
            const id = target.getAttribute('data-id');
            // console.log(id);
            const currentData = this.props.data.find(_ => _.item_id === id);
            console.log('clicked',currentData);
        }
        // 事件代理
        this.$el.addEventListener('click',event => {
            const target = event.target;
            const targetName = target.tagName.toLowerCase();
            if(hasClass(target,'news-card') || targetName === 'h3' || targetName === 'img'){
                if(targetName === 'h3' || targetName === 'img') {
                    onClickHandler(target.parentElement);
                }else{
                    onClickHandler(target);
                }
            }
        })
    }
}