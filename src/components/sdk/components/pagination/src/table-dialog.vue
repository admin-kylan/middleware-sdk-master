/**.
* @author  Administrator 
* @date   2017/10/10 9:31
*/
<!--编写模板 -->
<template>
    <div>
        <!-- 新增按钮点击，触发弹出框 -->
        <el-dialog :title="dialog[constant.addDialogTitle]" :visible.sync="dialogShow"
                   :before-close="handleClose">
            <template v-if="typeof dialog[constant.addDialogContent] === 'string' ">
                {{dialog[constant.addDialogContent] }}
            </template>
            <template v-else>
                <component :is="dialog[constant.addDialogContent] "></component>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancelResult">取 消</el-button>
                <el-button type="primary" @click="handleFullResult">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<!--编写脚本 -->
<script>
    import Constant from './../util/constant'
    export default {
        data(){
            return {
                constant: Constant,
                dialogShow: false
            }
        },
        props:{
            dialogVisible: Boolean,
            dialog: {}
        },
        watch: {
            dialogVisible(val){
                this.dialogShow = val
            }
        },
        components: {},
        created(){

        },
        methods: {
            // 点击右上角x 触发事件
            handleClose(){
                if(typeof this.dialog[this.constant.addDialogBeforeClose] === 'function'){
                    this.dialog[this.constant.addDialogBeforeClose].call(this)
                }
                this.$parent.dialogVisible = false
            },
            //点击对话框取消触发事件
            handleCancelResult(){
                if(typeof this.dialog[this.constant.addDialogClose] === 'function'){
                    let result = this.dialog[this.constant.addDialogClose].call(this)
                    if(result === false)
                        return false;
                }
                this.$parent.dialogVisible = false
            },
            //点击对话框确定触发事件
            handleFullResult(){
                if(typeof this.dialog[this.constant.addDialogFull] === 'function'){
                    let result = this.dialog[this.constant.addDialogFull].call(this)
                    if(result === false)
                        return false;
                }
                this.$parent.dialogVisible = false
            },
            //外部调用关闭对话框的方法
            closeDialog(){
                this.$parent.dialogVisible = false
            }
        }
    }

</script>


<!--编写样式 -->
