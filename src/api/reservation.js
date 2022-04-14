import axios from "axios";
export const getReservation = (params) =>
  axios({
    url: "/api/v1/advance/list",
    method: "GET",
    params,
  });
export const createReservation = (data) =>
  axios({
    url: "/api/v1/advance/add",
    method: "POST",
    data,
  });
