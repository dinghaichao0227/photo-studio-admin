import http from '@/utils/http';

export const reqGetReservation = (params) =>
  http({
    url: '/v1/intention',
    method: 'GET',
    params,
  });
export const reqStoreReservation = (data) =>
  http({
    url: '/v1/intention',
    method: 'POST',
    data,
  });
export const reqUpdateReservation = (id, data) =>
  http({
    url: `/v1/intention/${id}`,
    method: 'PUT',
    data,
  });
export const reqDelReservation = (id) =>
  http({
    url: `/v1/intention/${id}`,
    method: 'DELETE',
  });
export const reqShowReservation = (id) =>
  http({
    url: `/v1/intention/${id}`,
    method: 'GET',
  });
