import data from '../data/html.json'
import {isString} from './util';
export default {
    name:"exam",
    data(){
        return{
            questionList:[]
        }
    },
    created(){
        this.questionList = data;
        this.isString = isString;
    },
    methods:{
        trRow(que){
            return this.groupArray(que,3);
        },
        /**
         *  数组分页算法
         *
         * @param {*} arr 需要分页的数组
         * @param {*} count 数组分页，每一页数组项数
         */
        groupArray(arr,count){
            let result = [];
            let len = arr.length;//12
            let index = Math.ceil(len / count);//4
            for(let i = 0;i < index;i++){
                let curIndex = len - i * count >= index ? count : len - i * count;
                result.push(arr.slice(i * count,i * count + curIndex));
            }
            return result;
        }
    }
}