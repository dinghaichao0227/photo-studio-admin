import axios from 'axios';
export const reqGetReservation = (params) =>
  axios({
    url: '/api/v1/intention',
    method: 'GET',
    params,
  });
export const reqStoreReservation = (data) =>
  axios({
    url: '/api/v1/intention',
    method: 'POST',
    data,
  });
export const reqUpdateReservation = (id, data) =>
  axios({
    url: `/api/v1/intention${id}`,
    method: 'PUT',
    data,
  });
export const reqDelReservation = (id) =>
  axios({
    url: `/api/v1/intention/${id}`,
    method: 'DELETE',
  });
export const reqShowReservation = (id) =>
  axios({
    url: `/api/v1/intention/${id}`,
    method: 'GET',
  });
