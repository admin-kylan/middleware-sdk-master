import axios from 'axios';

// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])

var HttpUtil = {
  get:(url,params,config)=>{
    return axios.get(url,params,config)
  },
  delete:(url,config)=>{
    return axios.delete(url,config);
  },
  head:(url,config)=>{
    return axios.head(url,config);
  },
  post:(url,data,config)=>{
    return axios.post(url,data,config);
  },
  put:(url,data,config)=>{
    return axios.put(url,data,config);
  },
  patch:(url,data,config)=>{
    return axios.patch(url,data,config);
  },
  all:(reqArr)=>{
    return axios.all(reqArr);
  },
  spread:axios.spread,
  handleSuccess:null,
  handleError:null
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.error("请求后台接口成功:"+response.toString());
    if(typeof HttpUtil.handleSuccess == 'function'){
      if(HttpUtil.handleSuccess(response)){
        return response;
      }
    }else{
      return response;
    }
  }, function (error) {
    //对响应错误做点什么
    console.error("请求后台接口失败:"+error.toString());
    if(typeof HttpUtil.handleError == 'function'){
      if(HttpUtil.handleError(error)){
          return Promise.reject(error);
      }
    }else{
      return Promise.reject(error);
    }
  });

export default HttpUtil
