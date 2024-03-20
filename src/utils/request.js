import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:4523/m1/4152396-0-default",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log("请求设置",config);
    return config;
  },
  (Error) => {
    console.log(Error);
    return Promise.reject(Error);
  }
);
//响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code != 200) {
      if (res.code == 501 || res.code == 502 || res.code == 503) {
        //提示登录失败
      }
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
