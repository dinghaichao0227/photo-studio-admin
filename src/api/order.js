import axios from 'axios';

// Restful API
// req+行为+资源: 前端

// 列表
export const reqFetchOrders = (params) =>
  axios({
    url: '/api/v1/order',
    method: 'GET',
    params,
  });

// 获取单个资源
export const reqShowOrder = (id) =>
  axios({
    url: `/api/v1/order/${id}`,
    method: 'GET',
  });

// create
export const reqStoreOrder = (data) =>
  axios({
    url: `/api/v1/order`,
    method: 'POST',
    data,
  });

// update
export const reqUpdateOrder = (id, data) =>
  axios({
    url: `/api/v1/order/${id}`,
    method: 'PUT',
    data,
  });

export const reqDestroyOrder = (id) =>
  axios({
    url: `/api/v1/order/${id}`,
    method: 'DELETE',
  });

// update by patch. 更新部分。是 restful api 的标准
// export const reqUpdateOrderStatus = (id, data) =>
// axios({
//   url: `/api/v1/orders/${id}`,
//   method: 'PATCH',
//   data
// })
