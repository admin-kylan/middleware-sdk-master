/**.
* @author  Administrator
* @date   2017/9/30 14:15
*/
<template>
    <div >
        <!-- 表头 -->
        <div class="_table_search_header">
            <template v-if="search !== null">
                <el-row  :gutter="20">
                    <template v-if="null !== searchColumn">
                        <template v-for="(data, index) in searchColumn">
                            <!-- input -->
                            <template v-if="data[constant.searchColumnType] === constant.searchTypeText">
                                <el-col :span="8" >
                                    <el-input v-model="headerSearchModel[data[constant.searchColumnKey]]"
                                              :name="data[constant.searchColumnKey]"
                                              :placeholder="data[constant.searchColumnPlaceholder]"></el-input>
                                </el-col>
                            </template>

                            <!-- radio -->
                            <template v-else-if="data[constant.searchColumnType] === constant.searchTypeRadio">
                                <el-col :span="8" class="_table_search_header_radio">
                                    <template v-for="item in data[constant.complexDialogColumnOptions]">
                                        <el-radio class="radio"
                                                  v-model="headerSearchModel[data[constant.searchColumnKey]]"
                                                  :label="item[constant.searchColumnOptionsLabel]">
                                            {{item[constant.searchColumnOptionsText]}}
                                        </el-radio>
                                    </template>
                                </el-col>
                            </template>

                            <!-- select -->
                            <template v-else-if="data[constant.searchColumnType] === constant.searchTypeSelect">
                                <el-col :span="8">
                                    <el-select v-model="headerSearchModel[data[constant.searchColumnKey]]"
                                               :placeholder="data[constant.searchColumnPlaceholder]">
                                        <el-option
                                                v-for="item in data[constant.searchColumnOptions]"
                                                :key="item[constant.searchColumnOptionsValue]"
                                                :label="item[constant.searchColumnOptionsLabel]"
                                                :value="item[constant.searchColumnOptionsValue]">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </template>
                        </template>
                    </template>
                    <!-- 查询 -->
                    <template v-if="search.length !== 0">
                        <el-col :span="4" >
                            <el-button v-bind="search[constant.searchAttr]" :class="search[constant.searchClass]"
                                       @click="handleSearchResult">
                                {{search[constant.searchText]}}
                            </el-button>
                            <!--<el-button type="primary" icon="search" @click="handleSearchResult">搜索</el-button>-->
                        </el-col>
                        <el-col :span="4" >
                            <el-button v-bind="search[constant.searchReset][constant.searchResetAttr]"
                                       :class="search[constant.searchReset][constant.searchResetClass]"
                                       @click="handleSearchResetResult">
                                {{search[constant.searchReset][constant.searchResetText]}}
                            </el-button>
                            <!--<el-button type="primary" icon="search" @click="handleSearchResult">搜索</el-button>-->
                        </el-col>
                    </template>
                    <!-- 添加一个添加按钮 -->
                    <template v-if="add !== null">
                        <el-col :span="4">
                            <el-button v-bind="add[constant.addAttr]" :class="add[constant.addClass]"
                                       @click="handleAddResult">
                                {{add[constant.addText]}}
                            </el-button>
                        </el-col>
                    </template>

                    <!-- 添加一个高级查询按钮 -->
                    <template v-if="complexSearch !== null">
                        <el-col :span="4">
                            <el-button v-bind="complexSearch[constant.complexAttr]"
                                       :class="complexSearch[constant.complexClass]"
                                       @click="handleComplexSearchResult">
                                {{complexSearch[constant.complexText]}}
                            </el-button>
                        </el-col>
                    </template>

                    <!-- 添加一个对列表select 操作的按钮-->
                    <template v-if="selectButtonVisible === true">
                        <el-col :span="4">
                            <el-button @click="handleSelectResult">编辑</el-button>
                        </el-col>
                    </template>
                </el-row>
            </template>
        </div>

        <!--&lt;!&ndash; 新增按钮点击，触发弹出框 &ndash;&gt;-->
        <!--<TableDialog :dialogVisible="dialogVisible" :dialog="dialog"></TableDialog>-->


        <!-- 高级按钮点击，触发弹出框 -->
        <TableSearchComplex :complexDialogVisible="complexDialogVisible"
                            :complexDialog="complexDialog"></TableSearchComplex>
    </div>
</template>

<script>
    import Constant from './../util/constant'
    //  import TableDialog from './table-dialog.vue'
    import TableSearchComplex from './table-search-complex.vue'

    export default {
        name: 'ProdaTableHeader',
        data(){
            return {
                headerSearchModel: {},//头部搜索 v-model 的值
                constant: Constant,
                dialogVisible: false,
                dialog: {},
                searchColumn: null,
                complexDialogVisible: false,
                complexDialog: {},
                selectButtonVisible: false
            }
        },
        props: {
            search: {},
            add: {},
            complexSearch: {}
        },
        components: {
            // TableDialog,
            TableSearchComplex
        },
        created(){
            //console.log(this.constant)

            //初始化store 状态管理
            //基础查询
            this.$store.commit('INIT_SEARCH_MODEL')
            //高级查询
            this.$store.commit('INIT_COMPLEX_SEARCH_MODEL')
            //初始化查询类型
            this.$store.commit('INIT_SEARCH_TYPE',Constant.searchGetCollectionType)

            //初始化查询条数据
            this.initSearchData();

            //初始化添加条数据
            this.initAddData();

            //初始化添加条数据
            this.initComplexSearchData();

            //选择框的操作
            this.initSelectionOptions();
        },

        methods: {
            initSearchData(){
                if (this.search !== null) {
                    this.searchColumn = this.search[Constant.searchColumn];
                    //设置头部查询input
                    this.setHeaderModel();
                }
                //查询按钮
                if(!this.search[this.constant.searchText]){
                    this.search[this.constant.searchText] = '查询'
                }
                let reset = this.search[this.constant.searchReset]
                if(!reset){
                    reset = {};
                    this.search[this.constant.searchReset] = reset;
                }
                //重置
                if(!reset[this.constant.searchResetText]){
                    reset[this.constant.searchResetText] = '重置'
                }
            },
            initAddData(){
                if(!this.add[this.constant.addText]){
                    this.add[this.constant.addText] = '添加'
                }
            },
            initComplexSearchData(){
                if(!this.complexSearch[this.constant.complexText]){
                    this.complexSearch[this.constant.complexText] = '添加'
                }
            },
            initSelectionOptions(){
                //判断是否需要选择框按钮的操作
                this.$root.eventHub.$on([this.constant.emitListenerSelectionButtonName], (status) => {
                    //为true，添加一个队select 的操作按钮, 按钮在查询头部上
                    this.selectButtonVisible = status;
                })
            },
            setHeaderModel(){
                for (let i = 0; i < this.searchColumn.length; i++) {
                    //设置表格头部查询框
                    this.$set(this.headerSearchModel, this.searchColumn[i][Constant.searchColumnKey], this.searchColumn[i][Constant.searchColumnBorn])
                }
            },
            //搜索
            handleSearchResult(){
                //保存基础查询的数据
                this.$store.commit('ASSIGNMENT_SEARCH_MODEL', JSON.parse(JSON.stringify(this.headerSearchModel)));
                this.$store.commit('ASSIGNMENT_SEARCH_TYPE', this.constant.searchGetCollectionType);
                //触发查询事件
                this.reLoader(1)
            },
            //添加, 点击触发弹窗
            handleAddResult(){
                let obj = {}
                obj.reloader = this.reLoader;
                let back = this.add[this.constant.addClick];
                if(back){
                    back.call(obj);
                }else{
                    throw "must config addColumn.click()"
                }
            },
            handleComplexSearchResult(){
                // 判断是否存在对话框 complexDialog
                this.complexDialog = this.complexSearch[Constant.complexDialog]
                if (!this.complexDialog) {
                    this.complexDialog = {};
                }
                this.complexDialogVisible = true;

            },
            handleSelectResult(){
                this.$root.eventHub.$emit(this.constant.emitListenerSelectionName)
            },
            //重新加载
            reLoader(val){
                this.$root.eventHub.$emit(Constant.emitListenerReLoaderChangePage, val)
            },
            // 重置
            handleSearchResetResult(){
                //高级查询 初始化为空
                this.$store.commit('INIT_SEARCH_MODEL')
                // 模型为空 必须遍历执行去空
                for(let o in this.headerSearchModel){
                    this.headerSearchModel[o] = ""
                }
                //执行查询
                this.reLoader()
            }

        }
    }

</script>

<style scoped>
    /* CSS */
    ._table_search_header {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
    }
    ._table_search_header_radio label:first-child{
        padding-left: 50px;
    }
    ._table_search_header_radio label{
        padding-top: 5px;
    }

</style>
