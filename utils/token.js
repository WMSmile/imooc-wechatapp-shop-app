import { Config } from "config.js";

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify';
    this.tokenUrl = Config.restUrl + 'token/user';   
  }
  verify(){
    var token = wx.getStorageSync('token');
    if(!token){
      this.getTokenFromServer();
    }
    else{
      this._verifyTokenFromServer(token);
    }
  }
  getTokenFromServer(callBack){
    wx.login({
      success: (res) => {
        wx.request({
          url: this.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: (res) => {
            wx.setStorageSync('token', res.data.token);
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
  _verifyTokenFromServer(token){
    wx.request({
      url: this.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: (res) => {
        var valid = res.data.isValid;
        if (!valid) {
          this.getTokenFromServer();
        }
      }
    })
  }
}

export { Token };