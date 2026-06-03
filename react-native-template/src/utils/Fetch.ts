import { Toast } from '@ant-design/react-native';
import Loading from '@/components/Loading';

const baseUrl = 'http://localhost:8092';
let loadingCount = 0; // 统计需要loading的请求，还没返回的数量

/**
 * method: http请求方法
 * url: http请求路径
 * body: http请求体
 * isJson: 是否json请求
 * isError：是否显示默认错误信息
 * isLoading：是否显示默认loading
 */
function Fetch(method: string, url = '', body: any = {}, isJson = true, isError = false, isLoading = false) {
  const newUrl = baseUrl + url;
  const headers = {
    'content-type': isJson ? 'application/json' : 'application/x-www-form-urlencoded;charset=utf-8',
  };
  if (method === 'GET') {
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }
  return new Promise((resolve, reject) => {
    if (isLoading) {
      loadingCount++;
      loadingCount === 1 && Loading.show(); // loading需要加loadingCount === 1
    }
    console.log('Api', newUrl);
    fetch(newUrl, {
      method,
      headers,
      body,
      credentials: 'same-origin', // 要不要携带 cookie 默认不携带 omit、same-origin 或者 include
      mode: 'cors',
    })
      .then((response) => {
        return response.json(); // 返回解析后的 JSON 数据
      })
      .then((res) => {
        const { code, data, message } = res;
        resolve(data)
      })
      .catch((err) => {
        const message = err.message || err.errMsg;
        showError(message);
        reject(message);
      })
      .finally(() => {
        if (isLoading) {
          loadingCount--;
          loadingCount === 0 && Loading.hide();
        }
      });
  });
}

function showError(message = '服务异常，请稍后重试') {
  Toast.fail(message);
}

export default {
  get(...arg: any) {
    return Fetch('GET', ...arg);
  },
  post(...arg: any) {
    return Fetch('POST', ...arg);
  },
};
