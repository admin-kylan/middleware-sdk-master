]/**.
* @author  Administrator 
* @date   2017/9/30 14:21
*/
<!--编写模板 -->
<template>
    <div>
        <template v-if="templateType === '1'">
            <div class="_table_proda_1">

                <div class="_table_header">

                    <!-- 表头 按钮页 -->
                    <div class="_table_header_button">
                        <tableButton :buttons="buttons"></tableButton>
                    </div>

                    <div class="_table_header_input">
                        <!-- 表头 查询页 -->
                        <tableSearch :search="search" :complexSearch="complexSearch"></tableSearch>
                    </div>
                </div>

                <div class="_table_body">
                    <!-- 表格中间 -->
                    <tableBody :column="column" :edit="edit" :table="table" :url="url" :callback="callback"></tableBody>
                </div>


                <div class="_table_footer">
                    <div class="_table_footer_page">
                        <!-- 分页 -->
                        <tablePage :pagination="pagination"></tablePage>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="templateType === '2'">
            <div class="_table_proda_2">

                <div class="_table_header">
                    <!-- 表头 查询页 -->
                    <tableSearch class="_table_header_input" :search="search"
                                 :complexSearch="complexSearch"></tableSearch>
                </div>

                <div class="_table_body">
                    <!-- 表格中间 -->
                    <tableBody :column="column" :edit="edit" :table="table" :url="url" :callback="callback"></tableBody>
                </div>

                <div class="_table_footer">
                    <!-- 分页 -->
                    <div class="_table_footer_page">
                        <tablePage :pagination="pagination"></tablePage>
                    </div>
                    <!--  按钮页 -->
                    <div class="_table_footer_button">
                        <tableButton :buttons="buttons"></tableButton>
                    </div>
                </div>

            </div>
        </template>
    </div>
</template>

<!--编写脚本 -->
<script>

    //导入的组建
    import tableSearch from '../src/table-search.vue'
    import tableButton from '../src/table-button.vue'
    import tableBody from '../src/table-body.vue'
    import tablePage from '../src/table-page.vue'

    import TableFilter from '../src/table-filter'
    import TableEvent from '../src/table-event'
    import Constant from '../util/constant'
    import Mutual from '../service/mutual'
    import Vue from 'vue'

    export default {
        data(){
            return {
                templateType: '',
                search: [],
                constant: Constant,
                edit: {},
                buttons: [],
                complexSearch: {},
                url: '',
                callback: {},
                parentVue: new Vue(),//必须这个名字 否则会出问题,
                pagination: {}
            }
        },

        components: {
            tableSearch,
            tableBody,
            tablePage,
            tableButton
        },
        created(){
            //去除所有的全局事件
            TableEvent(this)
            //判断输入的参数是否合法
            let tableFilter = new TableFilter(this.adaptDate)
            if (null === tableFilter)
                return false;
            //全局性的存储这个配置，用于回调作用
            this.$root.eventHub.tableFilter = tableFilter;
            //-----
            this.templateType = tableFilter.templateType;
            this.search = tableFilter.search;
            this.column = tableFilter.column;
            this.edit = tableFilter.edit;
            this.buttons = tableFilter.buttons;
            this.complexSearch = tableFilter.complexSearch;
            this.table = tableFilter.table;
            this.url = tableFilter.url;
            this.callback = tableFilter.callback;
            this.pagination = tableFilter.pagination
        },
        methods: {},

    }

</script>


<!--编写样式 -->
<style scoped>
    /* 整个组件的class */
    /*type 类型为1 的样式*/
    ._table_proda_1 {
        min-width: 1100px;
        width: 100%;
    }

    /* 表头class*/
    ._table_proda_1 ._table_header {
        width: 100%;
        float: left;
        margin-bottom: 6px;
    }

    /*按钮组*/
    ._table_proda_1 ._table_header ._table_header_button {
       /* width: 50%;*/
        float: left;
    }

    /*查询区*/
    ._table_proda_1 ._table_header ._table_header_input {
     /*   width: 50%;*/
        float: right;
    }

    ._table_proda_1 ._table_footer ._table_footer_page {
        margin-right: 100px;
    }

    /* 整个组件的class */
    /*type 类型为2 的样式*/
    ._table_proda_2 {
        min-width: 1100px;
        width: 100%;
    }

    /* 表头class*/
    ._table_proda_2 ._table_header {
        width: 100%;
        float: left;
        margin-bottom: 6px;
    }

    /* 表头 查询区*/
    ._table_proda_2 ._table_header ._table_header_input {
       /* width: 50%;*/
        float: right;
    }

    /*表的脚部*/
    ._table_proda_2 ._table_footer {
        width: 100%;
        float: left;
        margin-top: 3px;
    }

    /*表的脚部 分页*/
    ._table_proda_2 ._table_footer ._table_footer_page {
       /* width: 50%;*/
        float: left;
    }

    /*表的脚部 按钮区*/
    ._table_proda_2 ._table_footer ._table_footer_button {
      /*  width: 50%;*/
        float: right;
    }

    ._table_proda_2 ._table_footer ._table_footer_page div {
        float: left;
    }

    ._table_proda_2 ._table_footer ._table_footer_button div {
        float: right;
        margin-right: 50px;
    }
</style>