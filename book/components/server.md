# 简介
HttpServer是一个建立在本地客户端的一个服务器，主要用于户监听服务端返回的推送消息。

# 使用手册

## 1.引入`httpserver`库

```javaScript
    var HttpServer = require('httpserver');
```

## 2.调用```init```函数初始化HttpServer，该函数返回一个服务实例。

```javaScript
  var server = HttpServer.init();
```

## 3.调用监听函数```waitting```,该函数有两个参数，```listenUrl```监听发送方的请求地址与```cb```当接收到数据时的回调。

```javaScript
  server.waitting("http://ip:port/xxx",function(data){
    console.log(data);
  });
```

## ```server```实例提供两个属性一个服务端口，一个是本地主机名

```javaScript
  console.log(server.port);
  console.log(server.hostName);
```
