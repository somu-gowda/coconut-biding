// Configs
import axios from "axios";
import { endpoints } from "../../../api/EndPointes";

class ProductsBiding {
  static postApi(data, callBack) {
    axios
      .post(`${endpoints().bidAPI}`, data)
      .then((response) => {
        callBack(response.data);
      })
      .catch((err) => {
        callBack(err.response);
        console.log(err);
      });
  }


  static getBidById(id, callBack) {
    axios
      .get(`${endpoints().bidAPI}?productId=${id}`)
      .then((response) => {
        callBack(response.data);
      })
      .catch((err) => {
        callBack(err.response);
        console.log(err);
      });
  }

}

export default ProductsBiding;
