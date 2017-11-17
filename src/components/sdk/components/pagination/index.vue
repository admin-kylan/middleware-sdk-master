/**.
* @author  Administrator 
* @date   2017/9/22 8:56
*/
<!--编写模板 -->
<template>
    <div>
        <router-link to="/">去往首页</router-link>
        这是表格分页页
        <h1>这里是引用第一个模板</h1>
        <!-- 这里是引用第一个模板 -->
        <ElProdaTable :adaptDate="dataOpt"></ElProdaTable>

      <!--  <hr>
        <h1>这里是引用第二个模板</h1>
        <ElProdaTable :adaptDate="dataOpt2"></ElProdaTable>-->
    </div>

</template>

<!--编写脚本 -->
<script>

    import t from './test.vue'

    export default {
        data(){
            return {
                dataOpt: {},
                dataOpt2: {},
                show: false
            }
        },
        components: {
            t
        },
        created(){
            let self = this;
            //表格数据要以配置的形式展示
            let obj = {
                templateType: '2',//模板类型 分为1和2 两个，默认为第一个
                url: 'http://127.0.0.1:3000/find',
                column: [
                    {
                        label: '选择',
                        type: 'selection',
                        width: '100',

                    },
                    {
                        label: '序号',
                        type: 'index',
                        width: '100',
                    },

                    {
                        label: '姓名',
                        prop: 'name',
                        sortable: true,
                        formatter: function (row, column, cellValue) {
                            return cellValue;
                        }
                    },
                    {
                        label: '年龄',
                        prop: 'age',
                        formatter(){
                            return "dddd"
                        }

                    },
                    {
                        label: '地址',
                        prop: 'address',
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                    },
                ],
                //table 的参数
                table: {
                    // height: 350,
                    data: [{
                        date: '2016-05-02000',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }],
//                    selectionChange(a){
//                        //  console.log(a)
//                    },
//                    select(b){
//                        console.log(b)
//                    }
                },
                //配置一组回调函数组
                callback: {
//                    launch(search){//url 处理，第一个参数为初级查询，第二个为高级查询，如果此项不配置，则默认以 &a=1&b=2形式 可选
//                        console.log(search)
//                        return "fuck";
//                    },
//                    complexLaunch(search){
//                        console.log(search)
//                        return "fuck"
//                    },
//                    success(data, type){ //第一个参数表示数据，第二个参数表示需要返回的字段描述对象
//                        console.log(data)
//                        console.log(type)
//                    },
                    error(data){
                        console.log(data)
                    },
                },
                //简单的查询
                search: {
                    class: 'aaddd', //class 按钮的class
                    attr: {
                        type: 'primary',
                        icon: "search"
                    }, //按钮的属性集合
                    text: '', //按钮的text 可以是文字，可以是icon 图标(<i></i>) 也可以为空 默认值为添加
                    column: [{
                        type: 'text', //查询项的类型
                        key: 'name', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                        placeholder: "请输入名称", // 需要输入
                        born: "", // 初始值
                    },
//                        {
//                            type: 'radio', //查询项的类型
//                            key: 'age', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
//                            options: [{ //label radio 的name text 为radio 的text
//                                label: '1',
//                                text: '2',
//                            }, {
//                                label: '2',
//                                text: '3',
//                            }], // 属性的值,必须为数组，不同属性值为不同的radio
//                            born: "", // 初始值
//                        }, {
//                            type: 'select', //查询项的类型
//                            key: 'bb', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
//                            options: [{
//                                label: '1',
//                                value: '2',
//                            }, {
//                                label: '2',
//                                value: '3',
//                            }],
//                            born: "", // 初始值
//                            placeholder: "请输入名称", // 需要输入
//                        },
                        {
                            type:'time', //时间类型
                            key: 'beginDate,endDate', //时间的model,可以多个，以 ‘，’隔开 建议两个
                            placeholder: "请输入名称", // 需要输入 如果type 为time,则逗号隔开的
                            born: "", // 初始值 如果type 为time,则逗号隔开的
                        }
                    ]
                },
                //高级查询
                complexSearch: {
                    class: 'aa', //class 按钮的class
                    attr: {
                        type: 'primary',
                    }, //按钮的属性集合
                    text: '高级查询', //按钮的text 可以是文字，可以是icon 图标(<i></i>) 也可以为空 默认值为添加
                    dialog: {
                        title: '高级查询',
                        column: [{
                            type: 'text', //查询项的类型
                            key: 'name', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                            placeholder: "请输入名称", // 需要输入
                            born: "", // 初始值
                            text: "名称" // 暂时不需要
                        },
//                            {
//                            type: 'radio', //查询项的类型
//                            key: 'age', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
//                            options: [{ //label radio 的name text 为radio 的text
//                                label: '1',
//                                text: '2',
//                            }, {
//                                label: '2',
//                                text: '3',
//                            }], // 属性的值,必须为数组，不同属性值为不同的radio
//                            text: "名称", // 暂时不需要
//                            born: "", // 初始值
//                        }, {
//                            type: 'select', //查询项的类型
//                            key: 'bb', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
//                            options: [{
//                                label: '1',
//                                value: '2',
//                            }, {
//                                label: '2',
//                                value: '3',
//                            }],
//                            text: "名称", // 暂时不需要
//                            born: "2", // 初始值
//                            placeholder: "请输入名称", // 需要输入
//                        },
                            {
                                text: "时间", // form item 名字
                                type:'time', //时间类型
                                key: 'beginDate,endDate', //时间的model,可以多个，以 ‘，’隔开 建议两个
                                placeholder: "请输入名称,ddd", // 需要输入 如果type 为time,则逗号隔开的
                                born: "", // 初始值 如果type 为time,则逗号隔开的
                            }
                        ],
                        full(){

                        },
                        close(){

                        }
                    },

                },
                editColumn: {
                    label: '操作', //表格栏名称
                    template: [{
                        attr: { //按钮的属性
                            size: 'small', //按钮的大小，根据element-ui 大小设置
                        },
                        text: '编辑', //按钮的名字
                        click(index, row){ //this.reLoader() 重新加载表格 从第一页
                            self.$router.push({path: '/pagination/edit' + "/" + row._id});
                        }
                    }, {
                        attr: {
                            size: 'small',
                            type: 'danger',
                        },
                        text: '删除',
                        click(index, row){
                            let that = this;
                            self.$http.get('http://127.0.0.1:3000/delete?id=' + row._id)
                                .then(response => {

                                    that.reLoader()
                                })
                        }
                    }]
                },
                buttons: [{
                    class: 'aa',
                    attr: {
                        type: 'primary'
                    },
                    //text: '<i class="el-icon-plus">添加</i>',
                    text: '添加',
                    click(){
                        //console.log(12345)
                    }
                },
                    {
                        class: 'aa',
                        attr: {
                            type: 'primary',
                            icon: 'edit'
                        },
                        text: '',
                        click(a){
                            console.log(a)
                        }
                    }
                ],
                pagination:{ //分页的基础配置
                    pageSize: 7, //默认每页10条数据
                    selectPageSize: true, //是否添加选择分页大小
                    pageSizes:[ 10, 20, 30, 40], //如果设置了此项，则页面大小的优先级大于 pageSize配置的值
                    jumper: true //页码跳转 false 不显示，true 显示
                }
            }

            this.dataOpt = obj;


            let obj2 = {
                templateType: '2',
                url: 'http://127.0.0.1:3000/find',
                column: [
                    {
                        label: '选择',
                        type: 'selection',
                        width: '100',

                    },
                    {
                        label: '序号',
                        type: 'index',
                        width: '100'

                    },

                    {
                        label: '姓名',
                        prop: 'name',
                        formatter: function (row, column, cellValue) {
                            return cellValue;
                        }
                    },
                    {
                        label: '年龄',
                        prop: 'age',
                        formatter(){
                            return "dddd"
                        }

                    },
                    {
                        label: '地址',
                        prop: 'address',
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                    },
                ],
                //table 的参数
                table: {
                    // height: 350,
                    data: [{
                        date: '2016-05-02000',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }],
//                    selectionChange(a){
//                        //  console.log(a)
//                    },
//                    select(b){
//                        console.log(b)
//                    }
                },
                //配置一组回调函数组
                callback: {
//                    launch(search){//url 处理，第一个参数为初级查询，第二个为高级查询，如果此项不配置，则默认以 &a=1&b=2形式 可选
//                        console.log(search)
//                        return "fuck";
//                    },
//                    complexLaunch(search){
//                        return "fuck"
//                    },
//                    success(data, type){ //第一个参数表示数据，第二个参数表示需要返回的字段描述对象
//                        console.log(data)
//                        console.log(type)
//                    },
                    error(data){
                        console.log(data)
                    },
                    selection(val){
                        console.log(val)
                        console.log("编辑被点击")
                    }
                },
                //简单的查询
                search: {
                    class: 'aaddd', //class 按钮的class
                    attr: {
                        type: 'primary',
                        icon: "search"
                    }, //按钮的属性集合
                    text: '', //按钮的text 可以是文字，可以是icon 图标(<i></i>) 也可以为空 默认值为添加
                    column: [{
                        type: 'text', //查询项的类型
                        key: 'name', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                        placeholder: "请输入名称", // 需要输入
                        born: "", // 初始值
                    },
//                        {
//                            type: 'radio', //查询项的类型
//                            key: 'age', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
//                            options: [{ //label radio 的name text 为radio 的text
//                                label: '1',
//                                text: '2',
//                            }, {
//                                label: '2',
//                                text: '3',
//                            }], // 属性的值,必须为数组，不同属性值为不同的radio
//                            born: "", // 初始值
//                        }, {
//                            type: 'select', //查询项的类型
//                            key: 'bb', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
//                            options: [{
//                                label: '1',
//                                value: '2',
//                            }, {
//                                label: '2',
//                                value: '3',
//                            }],
//                            born: "", // 初始值
//                            placeholder: "请输入名称", // 需要输入
//                        }
                    ]
                },
                //高级查询
                complexSearch: {
                    class: 'aa', //class 按钮的class
                    attr: {
                        type: 'primary',
                    }, //按钮的属性集合
                    text: '高级查询', //按钮的text 可以是文字，可以是icon 图标(<i></i>) 也可以为空 默认值为添加
                    dialog: {
                        title: '高级查询',
                        column: [{
                            type: 'text', //查询项的类型
                            key: 'name', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                            placeholder: "请输入名称", // 需要输入
                            born: "", // 初始值
                            text: "名称" // 暂时不需要
                        },
//                            {
//                            type: 'radio', //查询项的类型
//                            key: 'age', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
//                            options: [{ //label radio 的name text 为radio 的text
//                                label: '1',
//                                text: '2',
//                            }, {
//                                label: '2',
//                                text: '3',
//                            }], // 属性的值,必须为数组，不同属性值为不同的radio
//                            text: "名称", // 暂时不需要
//                            born: "", // 初始值
//                        }, {
//                            type: 'select', //查询项的类型
//                            key: 'bb', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
//                            options: [{
//                                label: '1',
//                                value: '2',
//                            }, {
//                                label: '2',
//                                value: '3',
//                            }],
//                            text: "名称", // 暂时不需要
//                            born: "2", // 初始值
//                            placeholder: "请输入名称", // 需要输入
//                        }
                        ],
                        full(){

                        },
                        close(){

                        }
                    },

                },
                editColumn: {
                    label: '操作', //表格栏名称
                    template: [{
                        attr: { //按钮的属性
                            size: 'small', //按钮的大小，根据element-ui 大小设置
                        },
                        text: '编辑', //按钮的名字
                        click(index, row){ //this.reLoader() 重新加载表格 从第一页
                            self.$router.push({path: '/pagination/edit' + "/" + row._id});
                        }
                    }, {
                        attr: {
                            size: 'small',
                            type: 'danger',
                        },
                        text: '删除',
                        click(index, row){
                            let that = this;
                            self.$http.get('http://127.0.0.1:3000/delete?id=' + row._id)
                                .then(response => {

                                    that.reLoader()
                                })
                        }
                    }]
                },
                buttons: [{
                    class: 'aa',
                    attr: {
                        type: 'primary'
                    },
                    //text: '<i class="el-icon-plus">添加</i>',
                    text: '添加',
                    click(){
                        console.log(12345)
                    }
                },
                    {
                        class: 'aa',
                        attr: {
                            type: 'primary',
                            icon: 'edit'
                        },
                        text: '',
                        click(){
                            console.log(12345)
                        }
                    }
                ]
            }
            this.dataOpt2 = obj2;
        },

        methods: {}
    }

</script>


<!--编写样式 -->
