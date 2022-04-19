import axios from 'axios';
export const reqGetActivity = (params) =>
  axios({
    url: '/api/v1/activity',
    method: 'GET',
    params,
  });
export const reqShowActivity = (id) =>
  axios({
    url: `/api/v1/activity/${id}`,
    method: 'GET',
  });
export const reqStoreActivity = (data) =>
  axios({
    url: '/api/v1/activity',
    method: 'POST',
    data,
  });
export const reqUpdateActivity = (id, data) =>
  axios({
    url: `/api/v1/activity/${id}`,
    method: 'PUT',
    data,
  });
export const reqDelActivity = (id) =>
  axios({
    url: `/api/v1/activity/${id}`,
    method: 'DELETE',
  });
