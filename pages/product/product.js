import { Product } from "product-model.js";
import { Cart } from "../cart/cart-model.js";
var product = new Product();
var cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCount: 1,
    currentTabsIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.data.id = id;
    this._loadData();
  },
  _loadData:function(){
    product.getDetailInfo(this.data.id,(data)=>{
      this.setData({
        cartTotalCounts: cart.getCartTotalCounts(),
        product:data
      })
    });
  },

  /*跳转到购物车*/
  onCartTap: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },

  onTabsItemTap: function(event){
    var index = product.getDataSet(event,'index');
    this.setData({
      currentTabsIndex: index
    })
  },
  //选择购买数目
  bindPickerChange: function (e) {
    this.setData({
      productCount: this.data.countsArray[e.detail.value],
    })
  },
  onAddingToCartTap:function(event){
    this.addToCart();
    this.setData({
      cartTotalCounts: cart.getCartTotalCounts()
    })
  },
  addToCart:function(){
    var tempObj = {};
    var keys = ['id','name','main_img_url','price'];
    for(var key in this.data.product){
      if(keys.indexOf(key) >= 0){
        tempObj[key] = this.data.product[key];
      }
    }
    cart.add(tempObj, this.data.productCount)
  }
  
})