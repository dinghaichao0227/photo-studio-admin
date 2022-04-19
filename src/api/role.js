import http from '@/utils/http';

export const reqGetRole = (params) =>
  http({
    url: '/v1/role',
    method: 'GET',
    params,
  });
export const reqStoreRole = (data) =>
  http({
    url: '/v1/role',
    method: 'POST',
    data,
  });
export const reqUpdateRole = (id, data) =>
  http({
    url: `/v1/role/${id}`,
    method: 'PUT',
    data,
  });
export const rquDelRole = (id) =>
  http({
    url: `/v1/role/${id}`,
    method: 'DELETE',
  });
export const rquShowRole = (id) =>
  http({
    url: `/v1/role/${id}`,
    method: 'GET',
  });
