import axios from "axios";
import snackbar from "../components/Snackbar";

axios.defaults.timeout = 10 * 1000;
axios.defaults.baseURL = "http://192.168.1.27:8090/";

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    const data = response.data;
    switch (data.statusCode) {
      case 3018:
        snackbar.error(data.msg);
        break;
      default:
        break;
    }
    return response;
  },
  (error) => {
    console.log(error.message);
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes("timeout")) {
      snackbar.error("请求超时，请稍后再试");
      return Promise.reject(error);
    } else if (error.message.includes("500")) {
      snackbar.error("服务器异常，请联系管理员");
    } else {
      snackbar.error("未知错误，请联系管理员");
    }
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param {*} url
 * @param {*} params
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param {*} url
 * @param {*} data
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param {*} url
 * @param {*} data
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param {*} url
 * @param {*} data
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装del请求
 * @param {*} url
 * @param {*} params
 */
export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
