// Configs
import axios from "axios";
import { endpoints } from "../../api/EndPointes";

class RegisterApi {
  // register API
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

   // get users API
   static getUsersListApi(callBack) {
    axios
      .get(`${endpoints().userAPI}`)
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
