const rules = {
    fuwugongneng:[
      {
        type:"array",
        required: true,
        message: '至少一个',
        trigger: 'change'
      }
    ],
    id:[
      {
        required: true,
        message: '不能为空',
        trigger: 'change'
      }
    ],
    fuwufangmingcheng:[
      {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    ],
    tiaoxian:[
      {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    ],
    app:[
      {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    ],
    description:[
      {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    ]
}

module.exports = rules;
