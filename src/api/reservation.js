import axios from 'axios';
export const getReservation = (params) =>
  axios({
    url: '/api/v1/advance/list',
    method: 'GET',
    params,
  });
export const createReservation = (data) =>
  axios({
    url: '/api/v1/advance/add',
    method: 'POST',
    data,
  });
export const editReservation = (data) =>
  axios({
    url: '/api/v1/advance/edit',
    method: 'POST',
    data,
  });
export const delReservation = (data) =>
  axios({
    url: '/api/v1/advance/del',
    method: 'POST',
    data,
  });
