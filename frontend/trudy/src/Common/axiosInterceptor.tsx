import axios from "axios";
import * as authAction from "./authAction";

export const axiosToken = axios.create()
export const axiosRefresh = axios.create()
const accessToken = "Bearer " + localStorage.getItem("token")
const refreshToken = localStorage.getItem("refreshToken")


axiosToken.interceptors.request.use(function (config) {
    console.log('intercept 성공')
    config.headers.common["Authorization"] = accessToken;
    // config.headers.Authorization
    return config;
  });

//   config.headers.common["refreshToken"] = refreshToken;

// axiosRefresh.interceptors.request.use(function (config) {
//     authAction.refreshTokenHandler
//     return config;
//   });

export default axiosToken