// const token = "103040c9bc900bafb74e5b8de76c2e9d6b3d54";
const search = window.location.search;
const cookie = document.cookie;
const token = search.slice(search.indexOf('=') + 1) || cookie.slice(cookie.indexOf('=') + 1);
// console.log(token);
let defaultParams = { "project": "ChuangyiWeima", "module": "Functions", "method":"SubmitSurveyDatas1","token": token };
import data from './pageData';
export default {
    name: "page",
    data() {
        return {
            currentParam: data,//数据
            sex: "",//性别
            age: "",//年龄
            profession: "",//职业
            income: "",//收入
            useMicrocode: "",//是否使用过微码
            problem: [],//微码存在问题
            satisfaction:"",//满意程度
            otherFunction:"",//其它功能
            pageWidth:0,//当前页面宽度
        }
    },
    computed:{
        getWidth(){
            return this.pageWidth < 700 ? "100%" : "300px";
        }
    },
    mounted(){
        this.pageWidth = window.innerWidth;
        window.onresize = () => {
            this.pageWidth = window.innerWidth;
        }
    },
    methods: {
        /**
         * @description: 选择性别
         * @param {type} 
         * @return: 
         */
        selectSex(item) {
            // 获取选中索引
            let selectIndex = item.allAnswers.findIndex(item => item.answerText === this.sex);
            item.selectedIndex = [selectIndex];
            // console.log(item);
        },
        /**
         * @description: 选择年龄
         * @param {type} 
         * @return: 
         */
        selectAge(item) {
            // 获取选中索引
            let selectIndex = item.allAnswers.findIndex(item => item.answerText === this.age);
            item.selectedIndex = [selectIndex];
            // console.log(item);
        },
        /**
         * @description: 选择职业
         * @param {type} 
         * @return: 
         */
        selectProfession(item) {
            // 获取选中索引
            let selectIndex = item.allAnswers.findIndex(item => item.answerText === this.profession);
            item.selectedIndex = [selectIndex];
            // console.log(item);
        },
        /**
         * @description: 选择收入
         * @param {type} 
         * @return: 
         */
        selectIncome(item) {
            // 获取选中索引
            let selectIndex = item.allAnswers.findIndex(item => item.answerText === this.income);
            item.selectedIndex = [selectIndex];
            // console.log(item);
        },
        /**
         * @description: 选择是否使用过微码
         * @param {type} 
         * @return: 
         */
        selectUseMicrocode(item) {
            let selectIndex = item.allAnswers.findIndex(item => item.answerText === this.useMicrocode);
            item.selectedIndex = [selectIndex];
            if (selectIndex === 1) item.questionType = 3;
            // console.log(item);
        },
        /**
         * @description: 选择问题
         * @param {type} 
         * @return: 
         */
        selectProblem(item) {
            // 获取选中索引
            let selectIndexArr = item.allAnswers.reduce((res,item,index) => {
                 this.problem.map(pro => {
                     if(pro === item.answerText){
                         res.push(index);
                     }
                 });
                 return res;
            },[]);
            item.selectedIndex = [...selectIndexArr];
            // console.log(item);
        },
        /**
         * @description:选择用户满意度 
         * @param {type} 
         * @return: 
         */
        selectSatisfaction(item){
            let selectIndex = item.allAnswers.findIndex(item => item.answerText === this.satisfaction);
            item.selectedIndex = [selectIndex];
            // console.log(item);
        },
        /**
         * @description:选择是否新增功能
         * @param {type} 
         * @return: 
         */
        selectOtherFunction(item){
            let selectIndex = item.allAnswers.findIndex(item => item.answerText === this.otherFunction);
            item.selectedIndex = [selectIndex];
            if(selectIndex === 1)item.questionType = 3;
            // console.log(item);
        },
        /**
         * @description: 提交
         * @param {type} 
         * @return: 
         */
        submitAll() {
            // console.log(this.$data);
            let allData = Object.create(null);
            for (let k in this.$data) {
                if (k.indexOf('currentParam') === -1 && k.indexOf('pageWidth') === -1) {
                    allData[k] = this.$data[k];
                }
            }
            // 验证选择
            this.validateData(allData, (msg) => {
                // 如果返回的是布尔值，并且为true,则验证成功，如果返回的是字符串则验证不成功
                if (typeof msg === 'boolean' && msg) {
                    // console.log('datas',this.currentParam);
                    this.request(this.$api,'post',{...defaultParams,datas:JSON.stringify(this.currentParam) },(res) => {
                        // console.log(res);
                        if(res.Status === 1){
                            this.$message.success("感谢您的参与，奖励金额" + res.Data + "元已发放到您的钱包，请注意查看您的钱包余额,如未更新,请联系我们管理员，敬请期待下一次的活动！");
                        }else{
                            this.$message.error(res.Message);
                        }
                        this.resetParams();
                    });
                } else if (typeof msg === 'string') {
                    return this.showConfirm(msg);
                }
            })
        },
        /**
         * @description: 验证选择
         * @param {type} 
         * @return: 
         */
        validateData(data, callback) {
            for (let k in data) {
                if(k.indexOf('problem') === -1 && !data[k]){
                    callback(k);
                    return;
                }
            }
            callback(true);
        },
        /**
         * @description: 显示弹框提示
         * @param {type} 
         * @return: 
         */
        showConfirm(msg) {
            let confirmText = "";
            switch (msg) {
                case "sex":
                    confirmText = "性别";
                    break;
                case "age":
                    confirmText = "年龄";
                    break;
                case "profession":
                    confirmText = "职业";
                    break;
                case "income":
                    confirmText = "月收入";
                    break;
                case "useMicrocode":
                    confirmText = "是否使用过微码";
                    break;
                // case "problem":
                //     confirmText = "微码问题";
                //     break;
                case "satisfaction":
                    confirmText = "满意程度";
                    break;
                case "otherFunction":
                    confirmText = "是否需要新增其它功能";
                    break;
            }
            return this.$message.error("请选择" + confirmText + '!');
        },
        /**
         * @description: 初始化参数
         * @param {type} 
         * @return: 
         */
        resetParams(){
            for (let k in this.$data) {
                if (k.indexOf('currentParam') === -1 && k.indexOf('pageWidth') === -1) {
                    if(k.indexOf('problem') > -1){
                        this.$set(this.$data,k,[]);
                    }else{
                        this.$set(this.$data,k,"");
                    }
                }
                if(k.indexOf('currentParam') > -1){
                    this.$data[k].map(data => {
                        this.$set(data,'answer',"");
                        this.$set(data,'selectedIndex',[]);
                    });
                }
            }
        }
    }
}