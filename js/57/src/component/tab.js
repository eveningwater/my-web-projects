import Component from './component';

import '../style/tab.less';
import { hasClass, siblings } from '../util';

export default class Tab extends Component {
    render() {
        const { data: tabList } = this.props.data;
        // console.log("导航", tabList);
        return `<div class="tab-container">
                ${ tabList.map(item => `<div class="tab-item" data-id="${ item.id }">${ item.title }</div>`).join('') }
            </div>`
    }
    addHandler(){
        this.$el.addEventListener('click',event => {
            const target = event.target;
            if(hasClass(target,'tab-item')){
                siblings(target).forEach(item => item.classList.remove('active'));
                target.classList.add('active');
                const id = Number(target.dataset.id);
                const { data } = this.props.data;
                const currentData = data.find(_ => _.id === id);
                console.log('clicked',currentData);
            }
        })
    }
}