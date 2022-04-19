import axios from 'axios';
export const reqGetRole = (params) =>
  axios({
    url: '/api/v1/role',
    method: 'GET',
    params,
  });
export const reqStoreRole = (data) =>
  axios({
    url: '/api/v1/role',
    method: 'POST',
    data,
  });
export const reqUpdateRole = (id, data) =>
  axios({
    url: `/api/v1/role/${id}`,
    method: 'PUT',
    data,
  });
export const rquDelRole = (id) =>
  axios({
    url: `/api/v1/role/${id}`,
    method: 'DELETE',
  });
export const rquShowRole = (id) =>
  axios({
    url: `/api/v1/role/${id}`,
    method: 'GET',
  });
