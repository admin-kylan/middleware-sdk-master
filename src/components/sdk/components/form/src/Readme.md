# 介绍

这是一个表单组件`Form`,表单组件由多个表单域组成（`FormItem`）,表单域下是表单控件(`FormControl`)。表单控件可以是输入框控件、单选控件、多选控件、下拉控件、时间控件、文件控件。

## 使用

```javascript
  <Form form = 'form' formItems = 'formItems' layout = "layout" action = "action" rules = "rules" v-on:handleSuccess= "success" v-on:handleError = "error" />
```

组件`Form`接收三个参数，表单数据绑定对象`form`、表单域数组对象`formItems`、表单域布局对象`layout`、表单提交地址`action`，表单验证对象`rules`,请求服务成功回调`success`，请求服务异常回调`error`。 eg:

```json
const formItems = [
  {
    label: "用户名",
    cname: "Input",
    prop: "username"
  }, {
    label: "性别",
    cname: "Radio",
    prop: "sex",
    radios: [
      {
        label: "男",
        value: "male"
      }, {
        label: "女",
        value: "female"
      }
    ]
  }, {
    label: "爱好",
    cname: "Checkbox",
    prop: "hobbies",
    checkboxs: [
      {
        value: "basketball",
        label: "篮球"
      }, {
        value: "football",
        label: "足球"
      }
    ]
  }, {
    label: "省份",
    cname: "Select",
    prop: "provience",
    placeholder: "请选择省份",
    options: [
      {
        label: "福建",
        value: "fujian"
      }, {
        label: "江苏",
        value: "jiangsu"
      }
    ]
  }, {
    label: "有效期",
    cname: "Daterange",
    prop: "avilableDate",
    placeholder: "请选择有效期"
  }, {
    label: "文件",
    cname: "Files",
    prop: "files",
    tip: "上传文件不能超过3M"
  }
]

const form = {
  username: "张三",
  sex: "",
  hobbies: [],
  provience: "",
  avilableDate: [
    new Date(), new Date()
  ],
  files: [
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }, {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }
  ]
}

const rules = {
  username: [
    {
      required: true,
      message: '请输入活动名称',
      trigger: 'blur'
    }, {
      min: 3,
      max: 5,
      message: '长度在 3 到 5 个字符',
      trigger: 'blur'
    }
  ],
  sex: [
    {
      required: true,
      message: "请选择性别",
      trigger: "change"
    }
  ],
  provience: [
    {
      required: true,
      message: '请选择省份',
      trigger: 'change'
    }
  ],
  hobbies: [
    {
      type: 'array',
      required: true,
      message: '请至少选择一个兴趣爱好',
      trigger: 'change'
    }
  ],
  avilableDate: [
    {
      type: "array",
      required: true,
      message: '请选择有效期',
      trigger: 'change',
      fields: {
        0: {
          type: "date",
          required: true,
          message: "请选择有效期"
        },
        1: {
          type: "date",
          required: true,
          message: "请选择有效期"
        }
      }
    }
  ],
  files: [
    {
      type: 'array',
      required: true,
      message: '请选择上传的文件',
      trigger: 'change'
    }
  ]
}

const layout = [
  {
    username:8,
    sex:8,
  },
  {
    hobbies:12,
    provience:12
  },
  {
    avilableDate:12,
    files:12
  }
]
```

## formItems属性

formItems是配置表单控件对象，formItems提供了输入框控件、下拉款控件、单选控件、多选控件、文件控件、时间控件。

属性|说明 |类型|可选值
----|----|-----|
lael|表单域名称|String| -
cname|表单域控件|String| Input、Radio、CheckBox、Select、Files、Daterange
props|表单域字段名和表单控件name属性值|String|-
radios|应用于cname为Radio|Array|[{label:"",value""}]
checkboxs|应用于cname为Checkbox|Array|[{label:"",value""}]
options|应用于cname为Select|Array|[{label:"",value""}]
placeholder|组件原生属性placeholder|String|-
tip|应用于cname为Files，用于文件说明|String|-

## form属性

form是表单组件的数据绑定对象，key与formItem中的表单域控件字段prop相对映射，value值为key所映射的那个表单域控件的默认值。这边对表单域控件默认值类型做一个说明。

表单域|类型|可选值
----|----|-----|
Input|String| -
Radio|String| -
Checkbox|Array|[a,b]
Select|String|-
Files|Array|[file1,file2]
Daterange|Array|[Date1,Date2]

## rules属性

rules校验表单域控件对象，key值为需要为哪个表单域验证。与formItem中的prop值相映射，下表简单给一些常用校验规则，详细规则可以参考


属性|说明|类型|可选值
----|----|-----|-----|
type|表单域数据类型|String|string、number、array
required|是否必须|boolean|true、false
message|错误提示消息|string|-
trigger|何时触发验证|string|change、blur
max|仅对type为String有效,字符串最大长度|number|-
min|仅对type为string有效，字符串最小长度|number|-


## layout属性

layout表单域布局对象，布局采用的24分栏布局方式。每个元素定义了一行显示几个组件，并且每个组件占多少栏。

```json
const layout = [
  {
    username:8,
    sex:8,
  },
  {
    hobbies:12,
    provience:12
  },
  {
    avilableDate:12,
    files:12
  }
]
```
