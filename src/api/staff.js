import http from '@/utils/http';

export const reqGetStaff = (params) =>
  http({
    url: '/v1/staff',
    method: 'GET',
    params,
  });
export const reqShowStaff = (id) =>
  http({
    url: `/v1/staff/${id}`,
    method: 'GET',
  });
export const reqStoreStaff = (data) =>
  http({
    url: '/v1/staff',
    method: 'POST',
    data,
  });
export const reqUpdateStaff = (id, data) =>
  http({
    url: `/v1/staff/${id}`,
    method: 'PUT',
    data,
  });
export const reqDelStaff = (id) =>
  http({
    url: `/v1/staff/${id}`,
    method: 'DELETE',
  });
