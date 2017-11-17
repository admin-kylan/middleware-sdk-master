/**.
* @author  Administrator 
* @date   2017/10/19 15:20
*/
<!--编写模板 -->
<template>
    <div>
        这是编辑页
        {{id}}
        {{data}}
        <el-form ref="form" :model="data" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="data.age"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="data.address"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="data.sex"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit">立即更新</el-button>
        <el-button type="text" @click="onBack">返回</el-button>
    </div>

</template>

<!--编写脚本 -->
<script>

    export default {
        data(){
            return {
                id: "",
                data: {}
            }
        },
        components: {},
        created(){
            this.id = this.$route.params.id

        },
        methods: {
            onSubmit(){
                this.$http.post('http://127.0.0.1:3000/save', JSON.stringify(this.data))
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(response => {
                        //console.log("4545")
                    })
            },
            onBack(){
                this.$router.go(-1);
            }
        }
    }

</script>


<!--编写样式 -->
