import marked from 'marked'
export default {
    props: ['markdown', 'enableHtml'],
    name: 'ResumeEditor',
    computed: {
        result: function () {
            return this.enableHtml ? marked(this.markdown) : this.markdown
        }
    },
    methods: {
        goBottom: function () {
            this.$refs.container.scrollTop = 10000
        }
    }
}