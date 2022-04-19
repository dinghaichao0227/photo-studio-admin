import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

// axios.interceptors.response.use(res) {
//   return response;
//   } (error) {


// }
export default instance;
