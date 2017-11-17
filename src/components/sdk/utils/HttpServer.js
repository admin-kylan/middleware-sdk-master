// import sys from '../json/system'
var http = require("http");
var URL = require('url');
var os = require('os');
var querystring = require("querystring");

var sys = {listen_port:8019}
var HttpServer = function() {
  debugger;
  var self = this;
  http.createServer(function(req, res) {
      var requesData = [];
      if (self.getHostName() + req.url == self.listenUrlObj[self.getHostName() + req.url]) {
        req.on("data", function(data) {
          requesData.push(data);
        }).on("end", function() {
          var buffer = Buffer.concat(requesData);
          self.cbObj[self.getHostName() + req.url](buffer.toString());
          res.writeHead(200, {
            'Content-Type': 'text/plain;charset=UTF-8'
          });
          res.end("" + new Date());
        });
      }
    // debugger;
    //     var url = URL.parse(req.url, true);
    //     if (url.pathname == self.listenUrl) {
    //       var arg = url.query;
    //       self.cb(arg.data);
    //     }
    //     res.writeHead(200, {
    //       "content-type": "text/plain"
    //     });
    //     res.write("hello nodejs");
    //     res.end();
  }).listen(sys.listen_port);
}

HttpServer.prototype = {
  listenUrlObj:{

  },
  cbObj:{

  },
  waitting: function(listenUrl, cb) {
    this.listenUrlObj[listenUrl] = listenUrl;
    this.cbObj[listenUrl] = cb;
  },
  getIp: function() {
    var ifaces = os.networkInterfaces();
    var IPv4;
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family == 'IPv4' && !details.internal) {
          IPv4 = details.address;
        }
      });
    }
    return IPv4;
  },
  getHostName: function() {
    //获取hostName
    return "http://" + this.getIp() + ":" + sys.listen_port;
  }
}

export default HttpServer;
