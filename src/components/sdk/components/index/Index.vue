/**.
* @author  Administrator
* @date   2017/9/22 8:54
*/
<!--编写模板 -->
<template>
    <div>
        这是首页
        <router-link to="/login">去往登录页</router-link>
        <router-link to="/pagination">去往表格页</router-link>
        <router-link to="/csv">去往CSV解析页</router-link>
        <router-link to="/serverandhttp">服务</router-link>
        <router-link to="/form">表单</router-link>
        <router-link to="/nedb">nedb</router-link>
        <router-link to="/other">其他</router-link>
    </div>

</template>

<!--编写脚本 -->
<script>

    export default {
        data(){
            return {}
        },
        components: {},
        created(){

        },
        methods: {}
    }

</script>


<!--编写样式 -->
