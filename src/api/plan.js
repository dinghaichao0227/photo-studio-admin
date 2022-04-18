import axios from 'axios';
export const getPlan = (params) =>
  axios({
    url: '/api/v1/plan/list',
    method: 'GET',
    params,
  });
export const createPlan = (data) =>
  axios({
    url: '/api/v1/plan/add',
    method: 'POST',
    data,
  });
export const editPlan = (data) =>
  axios({
    url: '/api/v1/plan/edit',
    method: 'POST',
    data,
  });
export const delPlan = (data) =>
  axios({
    url: '/api/v1/plan/del',
    method: 'POST',
    data,
  });
