# 介绍

集成了element-ui组件化开发，表格组件包括功能按钮，查询框，表格数据展示框，分页。所有功能都已配置的形式展示和事件回调。
功能按钮模块自定义添加按钮的数量，按钮的事件自动绑定到该按钮事件上；
查询模块包括基础查询和高级查询，基础查询通过和高级查询支持的模式有输入框，radio,下拉框，并且高级查询通过弹层形式，和基础查询事件不能混合在一起使用；
表格框的所有属性字段，表格字段，事件都继承element-ui的table，需要详细表格配置，可参考element-ui;
分页模块的配置继承element-ui。
目前分为两种模板

## 使用

```html

    <ElProdaTable :adaptDate="adaptDate"></ElProdaTableType1>
 
```


表单接收一个参数，必须为json格式的对象。

                 {
                  templateType: '1',//模板类型 分为1和2 两个，默认为第一个
                url: 'http://127.0.0.1:80/find',//ajax 与后台交互数据
                column: [ //数组形式保存json对象，每个json对象是一个表格的一列，参照element-ui 的 Table-column Attributes 字段
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

                ],
                //table 的参数 参照element-ui 的 Table Attributes 另外添加了Table Events 事件，以驼峰的形式写法
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
                    selectionChange(a){
                        //  console.log(a)
                    },
                    select(b){
                        console.log(b)
                    }
                },
                //配置一组回调函数组
                callback: {
                    launch(search){//url 处理，第一个参数为初级查询，如果此项不配置，则默认以 &a=1&b=2形式 可选
                        console.log(search)
                        return "?a=1&b=2";
                    },
                    complexLaunch(search){ //高级查询查询结果的返回处理 如果此项不配置，则默认以 &a=1&b=2形式 可选
                         return "?a=1&b=2";
                    },
                    success(data, type){ //第一个参数表示数据，第二个参数表示需要返回的字段描述对象
                        console.log(data)
                        console.log(type)
                    },
                    error(data){
                        console.log(data)
                    }
                },
                //简单的查询
                search: {
                    class: 'className', //class 按钮的class
                    attr: {
                        type: 'primary',
                        icon: "search"
                    }, //按钮的属性集合
                    text: '', //按钮的text 可以是文字，
                    column: [{
                        type: 'text', //查询项的类型
                        key: 'name', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                        placeholder: "请输入名称", // 需要输入
                        born: "", // 初始值
                    },
                        {
                            type: 'radio', //查询项的类型
                            key: 'age', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                            options: [{ //label radio 的name text 为radio 的text
                                label: '1',
                                text: '2',
                            }, {
                                label: '2',
                                text: '3',
                            }], // 属性的值,必须为数组，不同属性值为不同的radio
                            born: "", // 初始值
                        }, {
                            type: 'select', //查询项的类型
                            key: 'bb', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                            options: [{
                                label: '1',
                                value: '2',
                            }, {
                                label: '2',
                                value: '3',
                            }],
                            born: "", // 初始值
                            placeholder: "请输入名称", // 需要输入
                        },
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
                    class: 'className', //class 按钮的class
                    attr: {
                        type: 'primary',
                    }, //按钮的属性集合
                    text: '高级查询', //按钮的text 可以是文字，
                    dialog: {
                        title: '高级查询',
                        column: [{
                            type: 'text', //查询项的类型
                            key: 'name', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                            placeholder: "请输入名称", // 需要输入
                            born: "", // 初始值
                            text: "名称" // form item 名字
                        },
                            {
                            type: 'radio', //查询项的类型
                            key: 'age', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                            options: [{ //label radio 的name text 为radio 的text
                                label: '1',
                                text: '2',
                            }, {
                                label: '2',
                                text: '3',
                            }], // 属性的值,必须为数组，不同属性值为不同的radio
                            text: "名称",// form item 名字
                            born: "", // 初始值
                        }, {
                            type: 'select', //查询项的类型
                            key: 'bb', //输入框的name字段 批注--如果一个输入框同时要查询匹配两个或两个以上字段，用“,”隔开
                            options: [{
                                label: '1',
                                value: '2',
                            }, {
                                label: '2',
                                value: '3',
                            }],
                            text: "名称", // form item 名字
                            born: "2", // 初始值
                            placeholder: "请输入名称", // 需要输入
                        },
                         {
                            text: "时间", // form item 名字
                            type:'time', //时间类型
                            key: 'beginDate,endDate', //时间的model,可以多个，以 ‘，’隔开 建议两个
                            placeholder: "请输入名称", // 需要输入 如果type 为time,则逗号隔开的
                            born: "", // 初始值 如果type 为time,则逗号隔开的
                              }
                        ],
                        full(){ //弹层的确定回调事件

                        },
                        close(){//弹层的取消回调事件

                        }
                    },

                },
                editColumn: { //表格右边的操作，最后一栏
                    label: '操作', //表格栏名称
                    template: [{
                        attr: { //按钮的属性
                            size: 'small', //按钮的大小，根据element-ui 大小设置
                        },
                        text: '编辑', //按钮的名字
                        click(index, row){ //this.reLoader() 重新加载表格 从第一页

                        }
                    }, {
                        attr: {
                            size: 'small',
                            type: 'danger',
                        },
                        text: '删除',
                        click(index, row){

                        }
                    }]
                },
                buttons: [{//这里为按钮框，可以自定义添加多个按钮，事件回调的参数为表格选择框被选中的值
                    class: 'className',
                    attr: {
                        type: 'primary'
                    },
                    text: '添加',
                    click(selectModel){

                    }
                },
                    {
                        class: 'className',
                        attr: {
                            type: 'primary',
                            icon: 'edit'
                        },
                        text: '',
                        click(selectModel){

                        }
                    }
                ],
                  pagination:{ //分页的基础配置
                                    pageSize: 7, //默认每页10条数据
                                    selectPageSize: false, //是否添加选择分页大小
                                    pageSizes:[ 10, 20, 30, 40], //如果设置了此项，则页面大小的优先级大于 pageSize配置的值
                                    jumper: true //页码跳转 false 不显示，true 显示
                                }
            }
