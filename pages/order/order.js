import { Cart } from "../cart/cart-model.js";
import { Order } from "../order/order-model.js";
import { Address } from "../../utils/address.js";
var cart = new Cart();
var order = new Order();
var address = new Address();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productsArr;
    this.data.account = options.account;
    productsArr = cart.getCartDataFromLocal(true);
    this.setData({
      productsArr: productsArr,
      account: options.account,
      orderStatus: 0
    });
  },
  editAddress: function(event){
    wx.chooseAddress({
      success:(res) => {
        
        var addressInfo = {
          name : res.userName,
          mobile : res.telNumber,
          totalDetail: address.setAddressInfo(res)
        }
        this._bindAddressInfo(addressInfo);
      }
    })
  },
  _bindAddressInfo: function (addressInfo){
    this.setData({
      addressInfo: addressInfo
    });
  }
})