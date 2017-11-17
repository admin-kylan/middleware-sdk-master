/**.
* @author  Administrator 
* @date   2017/9/21 14:42
*/
<!--编写模板 -->
<template>
    <div>
        这是登录页
        <el-button type="primary" @click="login">登录</el-button>
        <router-link to="/">去往首页</router-link>
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
        methods: {
            login(){
                console.log(115)
            }
        }
    }

</script>


<!--编写样式 -->
