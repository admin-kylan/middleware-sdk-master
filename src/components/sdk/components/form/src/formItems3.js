const formItems = [{
    label: "服务功能",
    cname: "Checkbox",
    prop: "fuwugongneng",
    checkboxs: [{
      value: "查询",
      label: "查询"
    }, {
      value: "比对",
      label: "比对"
    }, {
      value: "交换",
      label: "交换"
    }, {
      value: "订阅",
      label: "订阅"
    }, {
      value: "分析",
      label: "分析"
    },{
      value: "操作",
      label: "操作"
    }]
  },
  {
    label: "服务方ID",
    cname: "Input",
    prop: "id"
  },
  {
    label: "服务方名称",
    cname: "Input",
    prop: "fuwufangmingcheng"
  },
  {
    label: "业务条线",
    cname: "Select",
    prop: "tiaoxian",
    placeholder: "请选择业务条线",
    options: [
      {
        label: "条线1",
        value: "tiaoxian1"
      }, {
        label: "条线2",
        value: "tiaoxian2"
      }
    ]
  },
  {
    label: "服务方提供应用",
    cname: "Input",
    prop: "app"
  },
  {
    label: "描述",
    cname: "Input",
    prop: "description",
    type:"textarea"
  }
];


module.exports = formItems;
