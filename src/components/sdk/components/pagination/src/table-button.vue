/**.
* @author  Administrator 
* @date   2017/10/23 9:04
*/
<!--编写模板 -->
<template>
    <div>
        <div class="_button">
            <!-- 添加一个添加按钮 -->
            <template v-for="button in buttons">
                <div class="_button_btn">
                    <el-button class="_button_btn" v-bind="button[constant.buttonsAttr]" :class="button[constant.buttonsClass]"
                               @click="handleClickResult(button[constant.buttonsClick])">
                        {{button[constant.buttonsText]}}
                    </el-button>
                </div>
            </template>

        </div>
    </div>

</template>

<!--编写脚本 -->
<script>

    import Constant from './../util/constant'

    export default {
        data(){
            return {
                constant: Constant,
            }
        },
        props: {
            buttons: Array
        },
        components: {},
        created(){
            //console.log(this.buttons)
        },
        methods: {
            handleClickResult(clickFunc){
                //从store 中获取被选中的值
                if(clickFunc){
                    clickFunc.call(null, this.$store.getters.getSelectModelArray)
                }

            }
        }
    }

</script>


<!--编写样式 -->
<style>
    /*CSS*/
    ._button{
        width: 100%;
        float: left;
    }

    ._button ._button_btn{
        float: left;
        margin-right: 5px;
        min-width: 100px;
    }

</style>