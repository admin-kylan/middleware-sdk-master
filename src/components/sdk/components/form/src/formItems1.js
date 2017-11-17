const formItems = [{
    label: "服务访问地址",
    cname: "Input",
    prop: "url",
    placeholder: "请输入服务地址",
    rule: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }]
  },
  {
    cname: "Button",
    nativeType: "submit",
    prop: "submit",
    type: "primary"
  },
  {
    cname: "Button",
    nativeType: "reset",
    prop: "reset",
  },
  {
    label: "遵循的服务规范",
    cname: "Input",
    prop: "fuwuguifan"
  },
  {
    label: "遵循的技术规范",
    cname: "Input",
    prop: "jishuguifan"
  }, {
    label: "协议",
    cname: "Radio",
    prop: "protocol",
    radios: [{
      label: "SOAP",
      value: "SOAP"
    }, {
      label: "REST",
      value: "REST"
    }, {
      label: "HSF",
      value: "HSF"
    }]
  },
  {
    label: "共享数据资源",
    cname: "Radio",
    prop: "shujuziyuan",
    radios: [{
      label: "常口人口数据资源",
      value: "常口人口数据资源"
    }]
  }, {
    label: "框架",
    cname: "Select",
    prop: "kuangjia",
    placeholder: "请选择框架",
    options: [{
      label: "Spring",
      value: "Spring"
    }, {
      label: "Struts2",
      value: "Struts2"
    }]
  }
];


module.exports = formItems;
