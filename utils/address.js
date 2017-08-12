
import { Config } from "../utils/config.js";
import { Base } from "../utils/base.js";

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
  // 是否为直辖市
  isCenterCity(name){
    var centerCitys = ['北京市','天津市','上海市','重庆市'],
      flag = centerCitys.indexOf(name) >= 0;
    return flag;
  }
}
export { Address };