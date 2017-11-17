/**
* @author Kylan
* @date   2017/10/2
*/
<template>
    <div >
        <!--<template v-if="pageService.totalPage > 1">-->
            <el-row type="flex" class="row-bg" justify="end">
                <el-row>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="pageService.pageSize"
                            :current-page.sync="pageService.currentPage"
                            :layout="layout"
                            :page-sizes="pageSizes"
                            :total="pageService.totalSize">
                    </el-pagination>
                </el-row>
            </el-row>
        <!--</template>-->

    </div>
</template>

<script>

    import Constant from './../util/constant'

    export default {
        data(){
            return {
                constant: Constant,
                pageService: {
                    currentPage: 1,
                    totalSize: 0,
                    totalPage: 1,
                    pageSize: 10
                },
                layout: 'total, prev, pager, next',
                pageSizes: []
            }
        },
        props: {
            pagination: {}
        },
        created(){
            //vue 做中间件传导
            //点击页码后返回数据
            this.$parent.parentVue.$on(Constant.emitListenerReceiveName, (data) => {
                if(data){
                    //回调
                    this.pageService.currentPage = data[this.constant.responseCurrentPage]
                    this.pageService.totalSize = data[this.constant.responseTotalSize]
                    this.pageService.totalPage = data[this.constant.responseTotalPage]
                    this.pageService.pageSize = data[this.constant.responsePageSize]
                }
            })


            // 页面大小
            let paginationPageSize = this.pagination[Constant.paginationPageSize];
            if(typeof paginationPageSize === 'number'){
                this.pageService.pageSize = paginationPageSize
            }
            if(typeof paginationPageSize === 'string' && !isNaN(parseInt(paginationPageSize))){
                this.pageService.pageSize = paginationPageSize
            }

            //判断是否选择页码大小
            let paginationSelectPageSize = this.pagination[Constant.paginationSelectPageSize];
            if(paginationSelectPageSize === true){
                this.layout = 'total, sizes, prev, pager, next';
                let pageSizes = this.pagination[Constant.paginationPageSizes];
                if(pageSizes instanceof Array === false){
                    this.pageSizes = [10,20,30,40,50];
                }else{
                    this.pageSizes = pageSizes
                }
                //有配置页面大小值，优先值大于单独配置页面大小
                if(this.pageSizes[0] && this.pageSizes[0] >= 1){
                    this.pageService.pageSize = this.pageSizes[0]
                }
            }
            //判断是否需要跳转操作
            let paginationJumper = this.pagination[Constant.paginationJumper];
            if(paginationJumper === true){
                this.layout += ', jumper';
            }

            //加载表格数据
            //this.$parent.parentVue.$emit(Constant.emitListenerSearchName, 1);
            this.reLoader(1);
            //执行翻页的唯一事件方法，通过事件触发
            this.$parent.parentVue.$on(Constant.emitListenerReLoaderChangePage, (val) =>{
                this.reLoader(val)
            })
        },
        methods: {
            //页面条数改变
            handleSizeChange(val){
                this.pageService.pageSize = val
                this.reLoader(1)
            },
            //当前页的刷新
            handleReloadCurrentChange(val){
                //改变当前页数去执行查询事件
                let currentPage = this.pageService.currentPage;
                if(typeof val === 'number'){
                    if(1 === currentPage){
                        this.handleCurrentChange(1)
                    }else{
                        this.pageService.currentPage = val;
                    }
                }else{
                    this.handleCurrentChange(currentPage)
                }

            },
            //当前页改变
            handleCurrentChange(val){
                //页码改变会触发事件
                this.$parent.parentVue.$emit(Constant.emitListenerSearchName, val, this.pageService.pageSize)
            },
            reLoader(val){
                if(typeof val === "number"){
                    this.handleReloadCurrentChange(val)
                }else{
                    this.handleReloadCurrentChange()
                }
            }
        },
    }
</script>

<style>
    /* CSS */
    ._footer_page_2{
        float: left;
    }

</style>
