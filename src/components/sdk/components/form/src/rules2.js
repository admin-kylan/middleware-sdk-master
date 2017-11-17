const rules = {
    istest:[
      {
        type:"boolean",
        required: true,
        message: '不能为空',
        trigger: 'change'
      }
    ],
    isprivate:[
      {
        type:"boolean",
        required: true,
        message: '不能为空',
        trigger: 'change'
      }
    ],
    contact:[
      {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    ],
    danwei:[
      {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    ],
    phone:[
      {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    ],
    email:[
      {
        required: true,
        message: '不能为空',
        trigger: 'blur'
      }
    ]
}

module.exports = rules;
