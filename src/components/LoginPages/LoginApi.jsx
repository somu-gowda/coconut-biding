// Configs
import axios from "axios";
import { endpoints } from "../../api/EndPointes";

class LoginApi {
  static LoginApi(data, callBack) {
    axios
      .post(`${endpoints().userLogin}`, data)
      .then((response) => {
        callBack(response.data);
      })
      .catch((err) => {
        callBack(err.response);
        console.log(err);
      });
  }
}

export default LoginApi;
