<template>
  <!--待处理事项 -->
  <div class="todolist">
    <input type="text" placeholder="请输入要待办的事项" v-model="newItem" class="public" id="createTodo" @keydown.enter="createToDo">
    <ul class="list">
      <!-- 没有事项返回 -->
      <li :class="[nocontent,isTure ? 'visible' : 'hidden']">
        <p>当前没有待办理的事项</p>
      </li>
      <!-- 有事项 -->
      <li v-for="(item,index) in todoList" :key="index" class="public">
        <i class="delete" @click="deleteList(index)" ref="delete"></i>
        <span :title="item.value">{{item.value.length >= 15 ? item.value.replace(item.value.substr(15),'...') : item.value}}</span>
      </li>
    </ul>
    <div class="total">当前已完成的事项有:<span>{{ complete }}</span>个,未完成的事项有:<span>{{ uncomplete }}</span>个.</div>
  </div>
</template>

<script>
  export default {
    name: 'todolist',
    data() {
      return {
        prevcontent: '',
        todoList: [],
        newItem: '',
        isTure: ''
      }
    },
    computed: {
      nocontent: function() {
        //当长度为0时显示没有待办处理事项,否则不显示
        if (this.todoList.length == 0) {
          return this.isTure = true;
        } else {
          return this.isTure = false;
        }
      },
      complete: function() {
        //过滤器计算已完成事项的长度
        return this.todoList.filter(item => item.iscomplete).length;
      },
      uncomplete: function() {
        //过滤器计算未完成事项的长度
        return this.todoList.filter(item => !item.iscomplete).length;
      }
    },
    methods: {
      createToDo: function() {
        // 判断当没有输入内容时直接返回
        if (this.newItem == '') {
          return;
        } else {
          // 当有输入内容时,将值添加到定义的数据中,然后在清空内容
          // 先对数据内容做一个限制
          this.todoList.push({
            value:this.newItem,
            iscomplete: false
          });
          // 保存上次的数据

          // 然后清空数据内容
          this.newItem = '';
        }
      },
      deleteList: function(index) {
        //值取反,表示未选中,也就是事项未完成状态
        this.todoList[index].iscomplete = !this.todoList[index].iscomplete;
        //判断当前事项完成状态,从而添加选中样式
        if (this.todoList[index].iscomplete) {
          this.$refs.delete[index].classList.add('checked');
        } else {
          this.$refs.delete[index].classList.remove('checked');
        }
      }
    },
    mounted: function() {
      this.$nextTick(function() {
       
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../styles/todolist.less';
  .public,
  .visible {
    .setInput;
    width: 500px;
    height: 45px;
  }
  
  #createTodo {
    margin-top: 60px;
  }
</style>
