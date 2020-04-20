import $request from "../../utils/request";

/**
 * Axios 封装!
 * @memberof apis
 * @param {String} url url地址
 * @param {Object} data 参数
 * @param {String} authUrl 前缀url地址
 * @return {Promise}
 * @default method=post
 * @example $request(add,{age:1},"")
 */

/** 获取用户信息 */
export const getUser = (data) => {
  return $request({
    url: "getuser",
    data,
  });
};
