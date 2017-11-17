# 介绍

数据核查需要两个步骤， 第一,分析数据，返回数据状态；第二，拉取数据，渲染页面

## 1.使用

```javascript
    import ReceiveQueue from './receive_queue_listener.js' //路径为
    let receiveQueue = new ReceiveQueue(json, fetchCodeUrl, fetchResultUrl);
                receiveQueue.fetchResult(code).then(function (response) {
                    //do something code
                }).catch(function (response) {
                    //do something code
                })
```
## 2.解析
var receiveQueue = new ReceiveQueue()，
传递三个参数，第一个参数为json格式，key:value;
第二个参数为分析数据的url；
第三个参数为拉取数据的url。
拉取数据只要receiveQueue.fetchResult(code) 其中code 为指定服务编号，并以promise 格式返回获取数据,
如果code 在30秒后无返回，则会以报错的形式返回


            