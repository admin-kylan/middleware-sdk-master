/**
* @author Kylan
* @date   2017/10/2
*/
<template>
    <div class="_table_body">
        <!-- 表格中间 -->
        <el-table
                ref="_table_body"
                :data="table.data"
                style="width: 100%"
                :height="table.height"
                :max-height="table['max-height']"
                :stripe="table['stripe']"
                :border="table['border']"
                :fit="table['fit']"
                :show-header="table['show-header']"
                :highlight-current-row="table['highlight-current-row']"
                :current-row-key="table['current-row-key']"
                :row-class-name="table['row-class-name']"
                :row-style="table['row-style']"
                :row-key="table['row-key']"
                :empty-text="table['empty-text']"
                :default-expand-all="table['default-expand-all']"
                :expand-row-keys="table['expand-row-keys']"
                :default-sort="table['default-sort']"
                :tooltip-effect="table['tooltip-effect']"
                :show-summary="table['show-summary']"
                :sum-text="table['sum-text']"
                :summary-method="table['summary-method']"
                @selection-change="table.selectChangeChildren"
                @select="table.select"
                @select-all="table.selectAll"
                @cell-mouse-enter="table.cellMouseEnter"
                @cell-mouse-leave="table.cellMouseLeave"
                @cell-click="table.cellClick"
                @cell-dblclick="table.cellDblclick"
                @row-click="table.rowClick"
                @row-contextmenu="table.rowContextmenu"
                @row-dblclick="table.rowDblclick"
                @header-click="table.headerClick"
                @sort-change="table.sortChange"
                @filter-change="table.filterChange"
                @current-change="table.currentChange"
                @header-dragend="table.headerDragend"
                @expand="table.expand"
        >

            <template v-for="(item, index) in column">
                <el-table-column
                        :type="item.type"
                        :column-key="item['column-key']"
                        :label="item.label"
                        :prop="item.prop"
                        :width="item.width"
                        :min-width="item['min-width']"
                        :fixed="item.fixed"
                        :render-header="item['render-header']"
                        :sortable="item.sortable"
                        :sort-method="item['sort-method']"
                        :resizable="item.resizable"
                        :formatter="item.formatter"
                        :show-overflow-tooltip="item['show-overflow-tooltip']"
                        :align="item['align']"
                        :header-align="item['header-align']"
                        :class-name="item['class-name']"
                        :label-class-name="item['label-class-name']"
                        :selectable="item['selectable']"
                        :reserve-selection="item['reserve-selection']"
                        :filters="item['filters']"
                        :filter-placement="item['filter-placement']"
                        :filter-multiple="item['filter-multiple']"
                        :filter-method="item['filter-method']"
                        :filtered-value="item['filtered-value']"
                >

                </el-table-column>

            </template>
            <!-- 编辑 -->
            <template v-if="edit[constant.editLabel] !== undefined">

                <el-table-column
                        :label="edit[constant.editLabel]">
                    <template scope="scope">
                        <template v-for="(data, index) in edit[constant.editTemplate]">
                            <el-button v-bind="data[constant.editTemplateAttr]"
                                       @click='handleEdit(scope.$index, scope.row, data[constant.editClick])'>
                                {{data[constant.editText]}}
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </template>
        </el-table>

    </div>
</template>

<script>

    import Constant from './../util/constant'
    import ElBadge from "../../../../../node_modules/element-ui/packages/badge/src/main";
    import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
    import Mutual from './../service/mutual'

    export default {
        components: {
            ElButton,
            ElBadge
        },
        data(){
            return {
                constant: Constant,
                selectEvent: false
            }
        },
        props: {
            column: Array,
            edit: {},
            table: {},
            url: String,
            callback: {},
        },
        created(){
            //初始化表格事件参数
            this.handleInitTableEvent();
            //判断url 是否存在 不存在则应用table.data的数组值
            //选择框的操作
           // this.initSelectionOptions();
            //vue 做中间件传导
            this.$parent.parentVue.$on(this.constant.emitListenerReceiveName, (data) => {
                if(data){
                    //回调 list 为数组，要么解析后必须为数组
                    let list = data[this.constant.responseList];
                    if (typeof list === 'string') {
                        list = JSON.parse(list)
                    }
                    if(list instanceof Array){
                        for(let i = 0; i < list.length; i++){
                            let obj = list[i];
                            obj['_table_body_td_index'] = (i + 1) + parseInt((data[this.constant.responseCurrentPage] - 1) * data[this.constant.responsePageSize])
                        }
                        this.table.data = list;
                    }

                }

            })
            //初始化执行
            new Mutual(this);
            //加载表格数据
            //this.$parent.parentVue.$emit(Constant.emitListenerSearchName, 1);
            //初始化被选中的select
            this.$store.commit('INIT_SELECT_MODEL_ARRAY')
            //初始化table
            this.initTableData()

            //selection 被选中事件被监听
            this.handleSelectResult();
        },
        methods: {
            initTableData(){
                for(let i = 0; i < this.column.length; i++){
                    let column = this.column[i];
                    if(column[this.constant.searchColumnType] === 'index'){
                        column[this.constant.searchColumnType] = '_table_body_td_index'
                        column['prop'] = '_table_body_td_index'
                        continue;
                    }
                }
            },
            //selection 被选中事件被监听
            handleSelectResult(){

            },
            //编辑框的操作
            handleEdit(index, row, back){
                let obj = {}
                obj.reLoader = this.reLoader;
                back.call(obj, index, row);
            },
            //初始化表格事件参数
            handleInitTableEvent(){
                let that = this;
                if (undefined === this.table.select) {
                    this.table.select = (value) =>{
                    }
                }

                if (undefined === this.table.selectAll) {
                    this.table.selectAll = function () {
                    }
                }

                if (undefined === this.table.selectionChange) {
                    this.table.selectChangeChildren =  (value) => {
                        this.$store.commit('ASSIGNMENT_SELECT_MODEL_ARRAY', JSON.parse(JSON.stringify(value)))
                    }
                }
                else{
                    //方法一
                    function selectChangeChildren(value) {
                        that.table.selectionChange.call(this, value)
                        //另外保存一份到store
                        that.$store.commit('ASSIGNMENT_SELECT_MODEL_ARRAY', JSON.parse(JSON.stringify(value)))
                    }
                    (function () {
                        let Super = function(){};
                        Super.prototype = that.table.selectionChange.prototype;
                        selectChangeChildren.prototype = new Super();
                    })();
                    this.table.selectChangeChildren = selectChangeChildren;
                }


                if (undefined === this.table.cellMouseEnter) {
                    this.table.cellMouseEnter = function () {
                    }
                }
                if (undefined === this.table.cellMouseLeave) {
                    this.table.cellMouseLeave = function () {
                    }
                }
                if (undefined === this.table.cellClick) {
                    this.table.cellClick = function () {
                    }
                }
                if (undefined === this.table.cellDblclick) {
                    this.table.cellDblclick = function () {
                    }
                }
                if (undefined === this.table.rowClick) {
                    this.table.rowClick = function () {
                    }
                }
                if (undefined === this.table.rowContextmenu) {
                    this.table.rowContextmenu = function () {
                    }
                }
                if (undefined === this.table.rowDblclick) {
                    this.table.rowDblclick = function () {
                    }
                }
                if (undefined === this.table.headerClick) {
                    this.table.headerClick = function () {
                    }
                }
                if (undefined === this.table.sortChange) {
                    this.table.sortChange = function () {
                    }
                }
                if (undefined === this.table.filterChange) {
                    this.table.filterChange = function () {
                    }
                }
                if (undefined === this.table.currentChange) {
                    this.table.currentChange = function () {
                    }
                }
                if (undefined === this.table.headerDragend) {
                    this.table.headerDragend = function () {
                    }
                }
                if (undefined === this.table.expand) {
                    this.table.expand = function () {
                    }
                }
            },
            reLoader(val){
                this.$parent.parentVue.$emit(Constant.emitListenerReLoaderChangePage, val)
            }
        }
    }
</script>

<style scoped>
    /* CSS */
    ._table_body{
      /*  width: 1904px;
        min-width: 1000px;*/
    }
</style>
