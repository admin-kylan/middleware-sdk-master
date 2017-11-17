/**.
* @author  Administrator 
* @date   2017/10/23 9:07
*/
<!--编写模板 -->
<template>
    <div>
        <div class="_search_header_input">
            <template v-if="search !== null">

                    <!-- 遍历查询对象 -->
                    <template v-for="(data, index) in column">
                        <!-- input -->
                        <template v-if="data[constant.searchColumnType] === constant.searchTypeText">

                            <el-input v-model="headerSearchModel[data[constant.searchColumnKey]]"
                                      :name="data[constant.searchColumnKey]"
                                      :placeholder="data[constant.searchColumnPlaceholder]"></el-input>

                        </template>

                        <!-- radio -->
                        <template v-else-if="data[constant.searchColumnType] === constant.searchTypeRadio">

                            <template v-for="item in data[constant.searchColumnOptions]">
                                <el-radio class="radio"
                                          v-model="headerSearchModel[data[constant.searchColumnKey]]"
                                          :label="item[constant.searchColumnOptionsLabel]">
                                    {{item[constant.searchColumnOptionsText]}}
                                </el-radio>
                            </template>

                        </template>

                        <!-- select -->
                        <template v-else-if="data[constant.searchColumnType] === constant.searchTypeSelect">

                            <el-select v-model="headerSearchModel[data[constant.searchColumnKey]]"
                                       :placeholder="data[constant.searchColumnPlaceholder]">
                                <el-option
                                        v-for="item in data[constant.searchColumnOptions]"
                                        :key="item[constant.searchColumnOptionsValue]"
                                        :label="item[constant.searchColumnOptionsLabel]"
                                        :value="item[constant.searchColumnOptionsValue]">
                                </el-option>
                            </el-select>

                        </template>

                        <!-- time -->
                        <template v-if="data[constant.searchColumnType] === constant.searchTypeTime">
                            <template v-for="(item, index) in data['inputs']">
                                <el-date-picker
                                        v-model="headerSearchModel[item[constant.searchColumnKey]]"
                                        type="date"
                                        :placeholder="item[constant.searchColumnPlaceholder]">
                                </el-date-picker>
                                <template v-if="index === 0">-</template>
                            </template>
                        </template>
                    </template>

                    <!-- 按钮的集合 基础查询和高级查询 -->
                    <div class="_search_header_input_buttons">
                        <!-- 查询按钮 -->
                        <template v-if="search.length !== 0">
                            <div class="_search_header_input_button_search">
                                <el-button v-bind="search[constant.searchAttr]" :class="search[constant.searchClass]"
                                           @click="handleSearchResult">
                                    {{search[constant.searchText]}}
                                </el-button>
                            </div>
                        </template>

                        <!-- 添加一个高级查询按钮 -->
                        <template v-if="complexSearch !== null">
                            <div class="_search_header_input_button_complex_search">
                                <el-button v-bind="complexSearch[constant.complexAttr]"
                                           :class="complexSearch[constant.complexClass]"
                                           @click="handleComplexSearchResult">
                                    {{complexSearch[constant.complexText]}}
                                </el-button>
                            </div>
                        </template>
                    </div>
                </template>


            <!-- 高级按钮点击，触发弹出框 -->
            <TableSearchComplex :complexDialogVisible="complexDialogVisible"
                                :complexDialog="complexDialog"></TableSearchComplex>
        </div>

    </div>
</template>

<!--编写脚本 -->
<script>

    import Constant from './../util/constant'
    import TableSearchComplex from './table-search-complex.vue'

    export default {
        data(){
            return {
                headerSearchModel: {},//头部搜索 v-model 的值
                constant: Constant,
                searchColumn: null,
                complexDialogVisible: false,
                complexDialog: {},
                parentVue: this.$parent.parentVue,
                column: [],
            }
        },
        props: {
            search: {},
            complexSearch: {}
        },
        components: {
            TableSearchComplex
        },
        created(){
            //初始化store 状态管理
            //基础查询
            this.$store.commit('INIT_SEARCH_MODEL')
            //高级查询
            this.$store.commit('INIT_COMPLEX_SEARCH_MODEL')
            //初始化查询类型
            this.$store.commit('INIT_SEARCH_TYPE', Constant.searchGetCollectionType)

            //初始化查询条数据
            this.initSearchData();

            //初始化高级查询
            this.initComplexSearchData();


        },
        methods: {
            initSearchData(){
                if (this.search === null) {
                    return;
                }
                this.searchColumn = this.search[Constant.searchColumn];
                if (!this.searchColumn) {
                    this.searchColumn = []
                }
                //设置头部查询input model 赋值 key
                for (let i = 0; i < this.searchColumn.length; i++) {
                    let column = this.searchColumn[i];
                    //type = 'time' searchTypeTime
                    if(column[Constant.searchColumnType] === Constant.searchTypeTime){
                        let obj = {},
                            inputs = [];
                        let keyArray = column[Constant.searchColumnKey].split(',');
                        let bornArray = column[Constant.searchColumnBorn].split(',');
                        let placeholderArray = column[Constant.searchColumnPlaceholder].split(',');
                        for(let i = 0; i < keyArray.length; i++){
                            //设置model值
                            this.$set(this.headerSearchModel, keyArray[i], bornArray[i])
                            obj[this.constant.searchColumnKey] = keyArray[i];
                            obj[this.constant.searchColumnPlaceholder] = placeholderArray[i];
                            inputs.push(obj);
                            obj = {};
                        }
                        obj['inputs'] = inputs
                        obj[this.constant.searchColumnType] = Constant.searchTypeTime;
                        this.column.push(obj)
                    }
                    if(column[Constant.searchColumnType] === Constant.searchTypeText ||
                        column[Constant.searchColumnType] === Constant.searchTypeRadio ||
                        column[Constant.searchColumnType] === Constant.searchTypeSelect){
                        this.column.push(column)
                        //设置表格头部查询框
                        this.$set(this.headerSearchModel, column[Constant.searchColumnKey], column[Constant.searchColumnBorn])
                    }


                }
              /*  //查询按钮
                if (!this.search[this.constant.searchText]) {
                    this.search[this.constant.searchText] = this.constant.textNameSearch
                }*/
            },
            //搜索
            handleSearchResult(){
                //保存基础查询的数据
                this.$store.commit('ASSIGNMENT_SEARCH_MODEL', JSON.parse(JSON.stringify(this.headerSearchModel)));
                this.$store.commit('ASSIGNMENT_SEARCH_TYPE', this.constant.searchGetCollectionType);
                //触发查询事件
                this.reLoader(1);
            },
            //高级查询初始化
            initComplexSearchData(){
                if (!this.complexSearch) {
                    return;
                }
             /*   if (!this.complexSearch[this.constant.complexText]) {
                    this.complexSearch[this.constant.complexText] = '高级查询'
                }*/
            },
            //高级查询点击事件
            handleComplexSearchResult(){
                // 判断是否存在对话框 complexDialog
                this.complexDialog = this.complexSearch[Constant.complexDialog]
                if (!this.complexDialog) {
                    this.complexDialog = {};
                }
                this.complexDialogVisible = true;

            },
            //重新加载
            reLoader(val){
                this.$parent.parentVue.$emit(Constant.emitListenerReLoaderChangePage, val)
            },
        }
    }

</script>


<!--编写样式 -->
<style>
    /* CSS */
    ._search_header_input .el-input {
        width: 180px;
    }

    /*按钮集合*/
    ._search_header_input_buttons {
        float: right;
        margin-right: 50px;
        margin-left: 20px;
    }

    /* 基础查询*/
    ._search_header_input ._search_header_input_button_search {
        float: left;
    }

    /* 高级查询*/
    ._search_header_input ._search_header_input_button_complex_search {
        float: left;
        margin-left: 15px;
    }

</style>