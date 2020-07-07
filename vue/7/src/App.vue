<template>
    <div id="app">
        <!-- 组件 -->
        <TodoList/>
    </div>
</template>

<script>
    //导入组件
    import TodoList from './components/todoList'
    export default {
        name: 'app', //名称
        components: {
            TodoList //注册组件
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
