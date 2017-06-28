// home.js
import {Home} from "home-model.js";
var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function(){
    this._loadData();
  },
  _loadData: function(){
    home.getBannerData((res)=>{
      this.setData({
        bannerArr: res
      });
    });

    home.getThemeData((res) => {
      this.setData({
        themeArr: res
      });
    });

    home.getProductsData((res) => {
      this.setData({
       productsArr: res
      });
    });
  }

})