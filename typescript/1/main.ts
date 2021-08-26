import { EventEmitter } from 'eventemitter3';
import "./style.less";
// 1.剩余时间数据接口
export interface RemainTimeData {
  days:number;//天
  hours:number;//小时
  minutes:number;//分钟
  seconds:number; //秒
  count:number; //毫秒
}
// 2.倒计时状态
export enum CountDownStatus {
   running,
   paused,
   stopped
}
// 3.倒计时事件名
export enum CountDownEventName{
   START = "start",
   STOP="stop",
   RUNNING="running"
}
// 4.事件属性名接口
export interface CountDownEventParam {
  [CountDownEventName.START]:[];
  [CountDownEventName.RUNNING]:[RemainTimeData];
  [CountDownEventName.STOP]:[]
}
// 5.补0操作
export const fillZero = v => `0${ v }`.slice(-2);

export class CountDown extends EventEmitter<CountDownEventParam> {
    private static COUNT:number = 1 * 1000;//毫秒
    private static SECOND:number = 1 * CountDown.COUNT;//秒
    private static MINUTE:number = 60 * CountDown.SECOND;//分
    private static HOUR:number = 60 * CountDown.MINUTE;//小时
    private static DAY:number = 24 * CountDown.HOUR;//天

    private remainTime:number = 0;//剩余时间
    private step:number = 1000;//每隔多少秒轮询，时间步长
    private endTime:number;//结束时间
    private status:CountDownStatus = CountDownStatus.stopped; //状态

    constructor(endTime:number,step:number = 1000){
      super();
      // 初始化结束时间与步长
      this.endTime = endTime;
      this.step = step;
      this.start();
    }
    // 开始
    public start(){
      // 发送事件
       this.emit(CountDownEventName.START);
      //  改变状态
       this.status = CountDownStatus.running;
       this.countDown();
    }
    // 结束
    public stop(){
      // 发送事件
      this.emit(CountDownEventName.STOP);
      this.status = CountDownStatus.stopped;
    }
    // countdown逻辑,倒计时逻辑
    private countDown(){
        // 判断如果当前状态不是running，则直接返回
        if(this.status !== CountDownStatus.running)return;
        // 计算剩余时间,等于结束时间减去当前时间，防止为负数，和0一起取最大值
        this.remainTime = Math.max(this.endTime - Date.now(),0);
        // 发送事件
        this.emit(CountDownEventName.RUNNING,this.parseRemainTime(this.remainTime));
        // 判断如果剩余时间大于0，则递归执行，否则停止执行
        if(this.remainTime > 0){
          setTimeout(() => this.countDown(),this.step);
        }else{
          this.stop();
        }
    }
    // 剩余时间逻辑
    private parseRemainTime(remainTime:number):RemainTimeData{
      // 缓存剩余时间
        let time = remainTime;
        // 计算天数
        let days = Math.floor(time / CountDown.DAY);
        time = time % CountDown.DAY;
        // 计算小时
        let hours = Math.floor(time / CountDown.HOUR);
        time = time % CountDown.HOUR;
        // 计算分钟
        let minutes = Math.floor(time / CountDown.MINUTE);
        time = time % CountDown.MINUTE;
        // 计算秒
        let seconds = Math.floor(time / CountDown.SECOND);
        time = time % CountDown.SECOND;
        // 计算毫秒
        let count = Math.floor(time / CountDown.COUNT);
        return {
          days,
          hours,
          minutes,
          seconds,
          count
        }
    }
}

const countDown = new CountDown(Date.now() + 60 * 60 * 1000);
let countDownElement = document.querySelector("#count-down");
countDown.on(CountDownEventName.RUNNING,remainTimeData => {
   const { days,hours,minutes,seconds } = remainTimeData;
   countDownElement.innerHTML = [days,hours,minutes,seconds].map(fillZero).join(":");
})