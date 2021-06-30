const ELContentDate = {
    inheritAttrs: false,
    template: `
        <el-date-picker v-bind="$attrs" @focus="onShowPanel"></el-date-picker>
    `,
    data(){
        return {
            footer:[],
            instance:null
        }
    },
    created(){
        this.footer = this.$slots.footer;
    },
    methods: {
        getChildrenTextContent(children) {
            return children.map(node =>  {
                return node.children ? this.getChildrenTextContent(node.children) : node.text;
            });
        },
        onShowPanel(){
            const defaultSlots = this.$slots.default;
            const keys = defaultSlots.map(node => node.key && node.key.slice(-1) - 0);
            const texts = this.getChildrenTextContent(defaultSlots).flat().filter(_ => _);
            this.$nextTick(() => {
                const panelContent =  document.querySelector('.el-picker-panel__content');
                const getFooter = panelContent.querySelector('.date-picker-footer');
                if(!getFooter){
                    const footerContainer = document.createElement('div');
                    footerContainer.classList.add('date-picker-footer');
                    panelContent.appendChild(footerContainer);
                }
                const tables = panelContent.children;
                const currentTable = [].filter.call(tables,table => table.style.display !== 'none');
                const avail_elements = currentTable[0].querySelectorAll('.available > div');
                Array.from(avail_elements).filter((element,index) => keys.indexOf(index) > -1).forEach((ele,index) => {
                    ele.innerHTML = ele.innerHTML + `<span class="el-date-text">${ texts[index] }</span>`;
                });
                this.createVue();
            })
        },
        createVue(){
            const vm = this;
            new Vue({
                el:".date-picker-footer",
                render(h){
                    return h('div',{ 'class':{ 'date-picker-footer':true } },vm.footer);
                }
            });
        }
    }
}