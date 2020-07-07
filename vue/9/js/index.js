let app1 = new Vue({
    el: '#app-1',
    data: {
        form: {
            email: "",
            nick: "",
            pwd: "",
            rePwd: "",
            sex: "",
            tel: "",
            occupation: "",
            introduce: "",
        },
        submitText: ""
    },
    methods: {
        submit: function () {
            let arr = [],
                str = '';
            for (x in app1.$data.form) {
                arr.push(app1.$data.form[x]);
            }
            for (let i = 0, len = arr.length; i < len; i++) {
                if (!arr[i]) {
                    arr[i] = '未填写表单值';
                };
                if (i == len - 1) {
                    str += arr[i] + '。'
                    break;
                }
                str += arr[i] + '，'
            }
            this.submitText = str;
        },
        reset: function () {
            for (x in app1.$data.form) {
                app1.$data.form[x] = '';
            }
            this.submitText = '';
            this.errorArr = [];
        }
    }
});
