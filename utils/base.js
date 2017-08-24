import { Config } from "config.js";
import { Token } from "token.js";

class Base{

  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  request(params, noRefetch) {
    var url = this.baseRequestUrl + params.url;
    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type':'application/json',
        'token': wx.getStorageSync('token')
      },
      method: params.type || "GET",
      dataType: '',
      success: (res) => {
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == "2"){
          params.sCallback && params.sCallback(res.data);
        }
        else{
          if(code == '401'){
            if (!noRefetch){
              this._refetch(params);
            }
          }
          if (noRefetch){
            params.eCallback && params.eCallback(res.data);
          }
        }
      },
      fail: (err) =>  {
        console.log(err);
      },
      complete: (res) => {}
    })
  }

  _refetch(params){
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(params,true);
    });
  }

  // 获取元素上的绑定的值
  getDataSet(event,key){
    return event.currentTarget.dataset[key];
  }

}

export { Base };