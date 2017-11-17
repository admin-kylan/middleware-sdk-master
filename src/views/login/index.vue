/**
* @author  Administrator 
* @date   2017/11/6 11:31
*/
<!--编写模板 -->
<template>
    <div class="login_body">
        <!--这里是登录页-->
        <el-button type="primary" @click="login">主要按钮</el-button>
        <!--  <el-button>默认按钮</el-button>-->


    </div>

</template>

<!--编写脚本 -->
<script>


    export default {
        data(){
            return {

                loginForm: {
                    username: 'admin',
                    password: '1111111'
                },
            }
        },
        props: {},
        components: {},
        created(){

        },
        methods: {
            login(){
                this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                    this.$router.push({path: '/'})
                    console.log("登录成功")
                }).catch(() => {
                    this.loading = false
                })
            }
        }
    }

</script>


<!--编写样式 -->
