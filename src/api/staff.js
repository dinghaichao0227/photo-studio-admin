import axios from 'axios';
export const reqGetStaff = (params) =>
  axios({
    url: '/api/v1/staff',
    method: 'GET',
    params,
  });
export const reqShowStaff = (id) =>
  axios({
    url: `/api/v1/staff/${id}`,
    method: 'GET',
  });
export const reqStoreStaff = (data) =>
  axios({
    url: '/api/v1/staff',
    method: 'POST',
    data,
  });
export const reqUpdatePlan = (id, data) =>
  axios({
    url: `/api/v1/staff/${id}`,
    method: 'PUT',
    data,
  });
export const reqDelStaff = (id) =>
  axios({
    url: `/api/v1/staff/${id}`,
    method: 'DELETE',
  });
