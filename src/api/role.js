import axios from 'axios';
export const getRole = (params) =>
  axios({
    url: '/api/v1/role/list',
    method: 'GET',
    params,
  });
export const createRole = (data) =>
  axios({
    url: '/api/v1/role/add',
    method: 'POST',
    data,
  });
export const editRole = (data) =>
  axios({
    url: '/api/v1/role/edit',
    method: 'POST',
    data,
  });
export const delRole = (data) =>
  axios({
    url: '/api/v1/role/del',
    method: 'POST',
    data,
  });
