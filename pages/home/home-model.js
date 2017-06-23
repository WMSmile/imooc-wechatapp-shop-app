class Home{

  constructor(){

  }

  getBannerData(id){
    wx.request({
      url: 'http://z.cn/api/v1/banner/' + id,
      method: 'GET',
      success: function(res){
        console.log(res);
        return res;
      }
    })
  }
 
}

export {Home};