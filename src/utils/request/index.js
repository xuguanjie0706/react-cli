import Axios from "axios";
import authUrls from "../authUrl";

/**
 * Axios 封装!
 * @module $request
 * @param {String} url url地址
 * @param {Object} data 参数
 * @param {String} authUrl 前缀url地址
 * @param {String} gateway 网管
 * @param {Object} params url地址传参
 * @param {String} method  形式
 * @return {Promise}
 * @default method=post
 * @example $request(add,{age:1},"")
 */


const $request = ({ url, data, authUrl, gateway, params, method = "post" }) => {
  if (!url) {
    throw "地址错误";
  }
  return new Promise((resolve, reject) => {
    Axios({
      method,
      url: gateway ? gateway + "/" : "" + url,
      data,
      params: params,
      baseURL: authUrls[authUrl] || authUrls.common,
      timeout: 1000,
    })
      .then((val) => {
        resolve(val);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default $request;
