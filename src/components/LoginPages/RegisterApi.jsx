// Configs
import axios from "axios";
import { endpoints } from "../../api/EndPointes";

class RegisterApi {
  static registerPostApi(data, callBack) {
    axios
      .post(`${endpoints().userAPI}`, data)
      .then((response) => {
        let data = response.data;
        callBack(data);
      })
      .catch((err) => {
        callBack(err.response);
        console.log(err);
      });
  }
}

export default RegisterApi;
