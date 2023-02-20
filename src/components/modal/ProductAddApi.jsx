// Configs
import axios from "axios";
import { endpoints } from "../../api/EndPointes";

class AddProducts {
  // product post API
  static postApi(data, callBack) {
    axios
      .post(`${endpoints().productAPI}`, data)
      .then((response) => {
        callBack(response.data);
      })
      .catch((err) => {
        callBack(err.response);
        console.log(err);
      });
  }

  // product get API
  static getApi(callBack) {
    axios
      .get(`${endpoints().productAPI}`)
      .then((response) => {
        callBack(response.data);
      })
      .catch((err) => {
        callBack(err.response);
        console.log(err);
      });
  }
}

export default AddProducts;
