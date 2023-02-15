import axios from "axios";
import * as authAction from "./authAction";

// export const axiosToken = axios.create()
// export const axiosRefresh = axios.create()
// const accessToken = "Bearer " + localStorage.getItem("token")
// const refreshToken = localStorage.getItem("refreshToken")

// axiosToken.interceptors.request.use(function (config) {
//     console.log('intercept 성공')
//     config.headers.common["Authorization"] = accessToken;
//     // config.headers.Authorization
//     return config;
//   });

// //   config.headers.common["refreshToken"] = refreshToken;

// // axiosRefresh.interceptors.request.use(function (config) {
// //     authAction.refreshTokenHandler
// //     return config;
// //   });

// export default axiosToken

const TOKEN = localStorage.getItem("ACCESS_TOKEN");
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: "bearer " + TOKEN,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 401) {
      const accessToken = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const { data } = await axios({
          method: "post",
          url: `/api/reissuance`,
          data: { accessToken, refreshToken },
        });
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        originalRequest.headers = {
          "Content-Type": "application/json",
          Authorization: "bearer " + newAccessToken,
        };
        localStorage.setItem("token", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        return await axios(originalRequest);
      } catch (err: any) {
        new Error(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
