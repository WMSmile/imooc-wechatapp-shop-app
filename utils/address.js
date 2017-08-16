
import { Config } from "config.js";
import { Base } from "base.js";

class Address extends Base{
  constructor(){
    super();
  }

  setAddressInfo(res){
    var province = res.provinceName || res.province;
    var city = res.cityName || res.city;
    var country = res.countyName || res.country;
    var detail = res.detailInfo || res.detail;
    var totalDatail = city + country + detail;
    if (!this.isCenterCity(province)){
      totalDatail = province + totalDatail;
    }
    return totalDatail;
  }
  getAddress(callback) {
    var param = {
      url:"address",
      sCallback:(res) => {
        if(res){
          res.totalDetail = this.setAddressInfo(res);
          callback && callback(res);
        }
      }
    };
    this.request(param);
  }
  // 是否为直辖市
  isCenterCity(name){
    var centerCitys = ['北京市','天津市','上海市','重庆市'],
      flag = centerCitys.indexOf(name) >= 0;
    return flag;
  }
  /*更新保存地址*/
  submitAddress(data,callback){
    data = this._setUpAddress(data);
    var param = {
      url: 'address',
      type: 'post',
      data: data,
      sCallback: function(res){
        callback && callback(true,res);
      }, eCallback: function (res){
        callback && callback(false, res);
      }
    };
    this.request(param);
  }
  /*保存地址*/
  _setUpAddress(res, callback) {
    var formData = {
      name: res.userName,
      province: res.provinceName,
      city: res.cityName,
      country: res.countyName,
      mobile: res.telNumber,
      detail: res.detailInfo
    };
    return formData;
  }
}
export { Address };