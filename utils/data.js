//栈后进后出，JavaScript模拟实现一个栈数据结构
class Stack {
    constructor(){
        this._stack = {};
        this.length = 0;
    }
    push(value){
        this._stack[this.length] = value;
        this.length++;
    }
    pop(){
        if(this.length === 0){
            return;
        }
        this.length--;
        let res = this._stack[this.length];
        delete this._stack[this.length];
        return res;
    }
    peek(){
        return this._stack[this.length - 1];
    }
    size(){
        return this.length;
    }
}
// const s = new Stack();
// s.push("a");
// s.pop();
// s.push("b");
// console.log(s.peek(),s.size());
// console.log(s);
