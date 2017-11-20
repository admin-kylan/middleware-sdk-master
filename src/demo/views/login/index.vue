/**
* @author  Administrator
* @date   2017/11/6 11:31
*/
<!--编写模板 -->
<template>

    <div class="login_body">

        <!--这里是登录页-->
        <!--<el-button type="primary" @click="login">主要按钮</el-button>-->
        <!--&lt;!&ndash;  <el-button>默认按钮</el-button>&ndash;&gt;-->
        <div class="logo_max">
            <i class="icon_login_logo"></i>
        </div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login_info">

            <el-form-item class="div_input" prop="username">
                <i class="icon_login"></i>
                <el-input   placeholder="账号" v-model="ruleForm.username"></el-input>
            </el-form-item>


            <el-form-item  class="div_input" prop="password">
                <i class="icon_password"></i>
                <el-input type="password" placeholder="密码" v-model="ruleForm.password" ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button class="login_btn_submit" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <a class="register" href="javascript:;"></a>
            </el-form-item>
        </el-form>

        <ElProdaForm :data="data"></ElProdaForm>
    </div>


</template>

<!--编写脚本 -->
<script>

    export default {
        data(){
            return {
                data: {},
                loginStatus: true,
                ruleForm: {
                    username: 'admin',
                    password: '1111111',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },

            }
        },
        props: {},
        components: {},
        created(){
            this.data = {
                form: {
                    attr: {//表格的attr

                    },
                    method: { //表格的method

                    }
                },
                items: [
                    [{
                        type: "input",
                        class: "aa",
                        item: {
                            prop: 'username',
                            label: '用户名'
                        }
                    }],
                    [{
                        type: "input",
                        class: "aa",
                        item: {
                            prop: 'username',
                            label: '用户名'
                        }
                    }]
                ]
            }
        },
        methods: {
            submitForm(formName) {
                if(this.loginStatus === true){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.loginStatus = false; // 不得重复登录
                            this.$store.dispatch('LoginByUsername', this.ruleForm).then(() => {
                                this.$router.push({path: '/'})
                                this.loginStatus = true; //可登陆
                            }).catch(() => {
                                this.loginStatus = true; //可登陆
                                this.$message({
                                    message: '登录密码错误',
                                    type: 'warning'
                                });
                            })
                        } else {
                            return false;
                        }
                    });
                }else{
                    console.log(454)
                }

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }

</script>


<!--编写样式 -->
<style>
    .login_info .el-form-item__content{
        margin-left: 0!important;
    }
    .login_btn_submit{
        background: #127fde;
        width: 100%;
        color: #FFF;

    }
</style>