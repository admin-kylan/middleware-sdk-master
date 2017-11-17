const formItems = [{
    label: "用户名",
    cname: "Input",
    prop: "username",
    rule: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }]
  },
  {
    label: "简介",
    cname: "Input",
    prop: "profile",
    rule: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }]
  }, {
    label: "性别",
    cname: "Radio",
    prop: "sex",
    radios: [{
      label: "男",
      value: "male"
    }, {
      label: "女",
      value: "female"
    }],
    rule: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }]
  }, {
    label: "爱好",
    cname: "Checkbox",
    prop: "hobbies",
    checkboxs: [{
      value: "basketball",
      label: "篮球"
    }, {
      value: "football",
      label: "足球"
    }],
    rule: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }]
  }, {
    label: "省份",
    cname: "Select",
    prop: "provience",
    placeholder: "请选择省份",
    options: [{
      label: "福建",
      value: "fujian"
    }, {
      label: "江苏",
      value: "jiangsu"
    }],
    rule: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }]
  }, {
    label: "有效期",
    cname: "Daterange",
    prop: "avilableDate",
    placeholder: "请选择有效期",
    rule: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }]
  }, {
    label: "文件",
    cname: "Files",
    prop: "files",
    tip: "上传文件不能超过3M"
  }
];


module.exports = formItems;
