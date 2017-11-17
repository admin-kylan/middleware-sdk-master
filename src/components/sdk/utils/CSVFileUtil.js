import CSV from 'comma-separated-values';
import Papa  from 'papaparse';
var CSVFileUtil = {
    parse:function(file,config){
      return new Promise(function(resolve,reject){
        Papa.parse(file, {
            encoding:config.encoding,
            header:config.header,
            complete:function(result){
              var _result = {};
              if(result.data.length == 0)
                return _result;
              if(config.header){
                //如果有表头，获取表头
                var titleArr = Object.keys(result.data[0])
                _result.titleArr = titleArr;
              }
              _result.dataArr = result.data;
              resolve(_result);
            },
            error:function(error){
              reject(error)
            }
        })
      })
    },
    downLoadFile: function(data, options, fileName) {
        var url = this.getUrl(data, options);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      getUrl: function(data, options) {
        const encoded = new CSV(data, options).encode();
        const dataBlob = new Blob([`\ufeff${encoded}`], {
          type: 'text/plain;charset=utf-8'
        });
        return window.URL.createObjectURL(dataBlob);
      }
}
export default CSVFileUtil;
