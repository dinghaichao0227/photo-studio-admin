import axios from 'axios';
// import { Message as UIMessage } from 'element-ui';

const instance = axios.create({
  baseURL: '/api',
  // timeout: 2000,
});

//拦截器
// instance.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const res = error.response;
//     console.log(res);

//     // 错误提醒
//     if (res.config.showError) {
//       const relations = {
//         401: '未授权',
//         404: '资源未找到',
//       };
//       const errMsg = relations[res.status] ? relations[res.status] : '网络错误，请稍候尝试';
//       UIMessage.error(errMsg);
//     }
//   }
// );

export default instance;
