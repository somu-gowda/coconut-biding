import axios from "axios";
import { endpoints } from "../../../api/EndPointes";

class WalletAPI {
  // wallet get API
  static getApi(name, callBack) {
    axios
      .get(`${endpoints().walletAPI}/${name}/wallets`)
      .then((response) => {
        callBack(response.data);
      })
      .catch((err) => {
        callBack(err);
      });
  }

  // wallet post API
  static postApi(data, callBack) {
    axios
      .post(`${endpoints().walletAPI}/wallets`, data)
      .then((response) => {
        callBack(response.data);
      })
      .catch((err) => {
        callBack(err);
      });
  }
}

export default WalletAPI;
