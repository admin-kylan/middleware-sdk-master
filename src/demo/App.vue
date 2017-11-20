<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'middleware-sdk',
        mounted(){

        }
    }
</script>

<style>
    @import './assets/css/style.css'; /* 全局自定义的css样式*/
    @import './assets/css/extra.css'; /* 全局自定义的css样式*/
    /* CSS */
    #app{
        width: 100%;
        height: 100%;
    }

</style>
