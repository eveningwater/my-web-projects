import Prism from 'prismjs'
export default {
    name: 'Editor',
    props: ['code'],
    computed: {
        highlightedCode: function () {
            //代码高亮
            return Prism.highlight(this.code, Prism.languages.css);
        },
        // 让代码生效
        codeInstyleTag: function () {
            return `<style>${this.code}</style>`
        }
    },
    methods: {
        goBottom() {
            this.$refs.container.scrollTop = 10000;
        },
        updateCode(e) {
            this.$emit('update:code', e.target.textContent);
        }
    }
}