import http from '@/utils/http';
export const reqGetActivity = (params) =>
  http({
    url: '/v1/activity',
    method: 'GET',
    params,
  });
export const reqShowActivity = (id) =>
  http({
    url: `/v1/activity/${id}`,
    method: 'GET',
  });
export const reqStoreActivity = (data) =>
  http({
    url: '/v1/activity',
    method: 'POST',
    data,
  });
export const reqUpdateActivity = (id, data) =>
  http({
    url: `/v1/activity/${id}`,
    method: 'PUT',
    data,
  });
export const reqDelActivity = (id) =>
  http({
    url: `/v1/activity/${id}`,
    method: 'DELETE',
  });
