# 介绍

这是一个http请求工具类,是基于`axios`库进行二次封装。想了解`axios`的详细使用，可以查看[中文手册](https://www.kancloud.cn/yunye/axios/234845)

# 方法

提供的方法有:

```javascript
  HttpUtil.get(url[, config])
  HttpUtil.delete(url[, config])
  HttpUtil.head(url[, config])
  HttpUtil.post(url[, data[, config]])
  HttpUtil.put(url[, data[, config]])
  HttpUtil.patch(url[, data[, config]])
```

## 示例

get请求

```javascript
  HttpUtil.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

post请求

```javascript
HttpUtil.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```

多个并发请求
```javascript
function getUserAccount() {
  return HttpUtil.get('/user/12345');
}

function getUserPermissions() {
  return HttpUtil.get('/user/12345/permissions');
}

HttpUtil.all([getUserAccount(), getUserPermissions()])
  .then(HttpUtil.spread(function (acct, perms) {
    // 两个请求现在都执行完成,acc
   // act是第一个返回请求结果，perms是第二个返回请求结果
  }));
```

如果是单页面应用。在如下场景需要对结果集，做一个统一的处理。如：后台不可预知的系统报错、用户访问权限不足、```TOKEN```过期等。一般的处理方式是：跳转系统错误页、跳转提示权限不足页面等多种处理方式。

`HttpUtil`提供了两个个响应结果的拦截器，拦截器必须返回`true`或`false`，返回`true`时`then`函数或`catch`函数接收得到`res`对象或`error`对象，返回`false`时相反。`handleSuccess`拦截器处理请求成功。`handleError`拦截器处理请求失败（服务器报错，走的是这个）。

```javascript
  HttpUtil.handleSuccess = (response){
    if(response.data.code == 'xxxx'){
      //比如：权限不足，跳转权限不足页面
      ....//路由的代码
      return false;
    }else{
      return true;
    }
  }

  HttpUtil.handleError = (error) = >{
    //一般系统后台异常，处理方法跳转错误页面
    ...//路由错误页面
    return false;
  }

```

## 对象说明

response返回结果

```javascript
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为请求提供的配置信息
  config: {}
}
```

config请求配置,这边只列举常用的，详情列表参考[axios中文手册](https://www.kancloud.cn/yunye/axios/234845)

```javascript
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

}
```
# http组件
