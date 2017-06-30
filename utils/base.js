import { Config } from "../utils/config.js";

class Base{

  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  request(params) {
    var url = this.baseRequestUrl + params.url
    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type':'application/json',
        'token': wx.getStorageSync('token')
      },
      method: params.type || "GET",
      dataType: '',
      success: function(res) {
        params.sCallback && params.sCallback(res.data);
      },
      fail: function(err) {
        console.log(err);
      },
      complete: function(res) {},
    })
  }

  // 获取元素上的绑定的值
  getDataSet(event,key){
    return event.currentTarget.dataset[key];
  }

}

export { Base };