/**.
* @author  Administrator 
* @date   2017/10/10 9:31
*/
<!--编写模板 -->
<template>
    <div>
        <!-- 新增按钮点击，触发弹出框 -->
        <el-dialog :title="complexDialog[constant.complexDialogTitle]" :visible.sync="dialogShow"
                   :before-close="handleClose"
                   size="tiny"
                   :show-close=false
        >

            <!-- 插入一个表单 v-model="searchModel[date[constant.complexDialogColumnKey]]"-->
            <el-form ref="form" label-width="80px">
                <template v-for="data in column">
                    <!-- input -->
                    <template v-if="data[constant.complexDialogColumnType] === constant.searchTypeText">
                        <el-form-item :label="data[constant.complexDialogColumnText]">
                            <el-input v-model="searchModel[data[constant.complexDialogColumnKey]]"></el-input>
                        </el-form-item>
                    </template>

                    <!-- radio -->
                    <template v-else-if="data[constant.complexDialogColumnType] === constant.searchTypeRadio">
                        <el-form-item :label="data[constant.complexDialogColumnText]">
                            <template v-for="item in data[constant.complexDialogColumnOptions]">
                                <el-radio class="radio" v-model="searchModel[data[constant.complexDialogColumnKey]]"
                                          :label="item[constant.complexDialogColumnOptionsLabel]">
                                    {{item[constant.complexDialogColumnOptionsText]}}
                                </el-radio>
                            </template>
                        </el-form-item>
                    </template>

                    <!-- select -->
                    <template v-else-if="data[constant.complexDialogColumnType] === constant.searchTypeSelect">
                        <el-form-item :label="data[constant.complexDialogColumnText]">
                            <el-select v-model="searchModel[data[constant.complexDialogColumnKey]]"
                                       :placeholder="data[constant.complexDialogColumnPlaceholder]">
                                <el-option
                                        v-for="item in data[constant.complexDialogColumnOptions]"
                                        :key="item[constant.complexDialogColumnOptionsValue]"
                                        :label="item[constant.complexDialogColumnOptionsLabel]"
                                        :value="item[constant.complexDialogColumnOptionsValue]">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>

                    <!-- time -->
                    <template v-if="data[constant.complexDialogColumnType] === constant.searchTypeTime">
                        <el-form-item :label="data[constant.complexDialogColumnText]" >
                            <template v-for="(item, index) in data['inputs']">
                                <el-date-picker
                                        v-model="searchModel[item[constant.complexDialogColumnKey]]"
                                        type="date"
                                        :placeholder="item[constant.complexDialogColumnPlaceholder]">
                                </el-date-picker>
                                <template v-if="index === 0">-</template>
                            </template>
                        </el-form-item>
                    </template>

                </template>
                <!-- {{searchModel}}-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="text" @click="handleResetResult">重 置</el-button>
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
                searchColumn: [],
                searchModel: {},// v-model 的值,
                dialogShow: false,
                column: []
            }
        },
        props: {
            complexDialogVisible: Boolean,
            complexDialog: {}
        },
        watch: {
            complexDialogVisible(val){
                this.dialogShow = val
                //complexDialogVisible 为true 时候，处理complexDialog
                if (val === true) {
                    if (!this.complexDialog[this.constant.complexDialogTitle]) {
                        this.complexDialog[this.constant.complexDialogTitle] = '高级查询'
                    }
                    if (!this.complexDialog[this.constant.complexDialogColumn]) {
                        this.complexDialog[this.constant.complexDialogColumn] = []
                    }
                    this.searchColumn = this.complexDialog[this.constant.complexDialogColumn]

                    // this.searchColumn = this.$store.getters.getComplexSearchModelKeyValue;
                }
            },
            searchColumn(){
                this.setSearchModel();
            }
        },
        components: {},
        created(){
            //console.log(this.complexDialog)
            //初始化查询模型 set key value
           // this.setSearchModel();
        },
        methods: {
            setSearchModel(){
                for (let i = 0; i < this.searchColumn.length; i++) {
                    let column = this.searchColumn[i];
                    //type = 'time' searchTypeTime
                    if (column[Constant.complexDialogColumnType] === Constant.searchTypeTime) {
                        let obj = {},
                            inputs = [];
                        let keyArray = column[Constant.complexDialogColumnKey].split(',');
                        let bornArray = column[Constant.complexDialogColumnBorn].split(',');
                        let placeholderArray = column[Constant.complexDialogColumnPlaceholder].split(',');
                        for (let i = 0; i < keyArray.length; i++) {
                            //设置model值
                            this.$set(this.searchModel, keyArray[i], bornArray[i])
                            obj[this.constant.complexDialogColumnKey] = keyArray[i];
                            obj[this.constant.complexDialogColumnPlaceholder] = placeholderArray[i];
                            inputs.push(obj);
                            obj = {};
                        }
                        obj[this.constant.complexDialogColumnText] = column[this.constant.complexDialogColumnText];
                        obj['inputs'] = inputs
                        obj[this.constant.complexDialogColumnType] = Constant.searchTypeTime;
                        this.column.push(obj)
                    }
                    if (column[Constant.complexDialogColumnType] === Constant.searchTypeText ||
                        column[Constant.complexDialogColumnType] === Constant.searchTypeRadio ||
                        column[Constant.complexDialogColumnType] === Constant.searchTypeSelect) {
                        this.column.push(column)
                        //设置表格头部查询框
                        this.$set(this.searchModel, column[Constant.complexDialogColumnKey], column[Constant.complexDialogColumnBorn])
                    }

                    /* //设置表格头部查询框
                     this.$set(this.searchModel, this.searchColumn[i][Constant.complexDialogColumnKey],
                     this.searchColumn[i][Constant.complexDialogColumnBorn])*/
                }
            },
            // 点击右上角x 触发事件
            handleClose(){
            },
            //重置按钮事件
            handleResetResult(){
                //高级查询 初始化为空
                this.$store.commit('INIT_COMPLEX_SEARCH_MODEL')
                // 模型为空 必须遍历执行去空
                for (let o in this.searchModel) {
                    this.searchModel[o] = ""
                }

            },
            //点击对话框取消触发事件
            handleCancelResult(){

                this.$parent.complexDialogVisible = false
            },
            //点击对话框确定触发事件
            handleFullResult(){
                //保存基础查询的数据
                this.$store.commit('ASSIGNMENT_COMPLEX_SEARCH_MODEL', JSON.parse(JSON.stringify(this.searchModel)));
                //查询属于高级查询
                this.$store.commit('ASSIGNMENT_SEARCH_TYPE', this.constant.complexSearchGetCollectionType);
                //  console.log(this.searchModel)
                //查询，重新加载页码
                this.$parent.parentVue.$emit(Constant.emitListenerReLoaderChangePage, 1);
                //关闭对话框
                this.$parent.complexDialogVisible = false
            },
            //外部调用关闭对话框的方法
            closeDialog(){
                this.$parent.complexDialogVisible = false
            }
        }
    }

</script>


<!--编写样式 -->
