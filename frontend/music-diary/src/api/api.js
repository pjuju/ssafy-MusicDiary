import baseAxios from "axios";

const api = baseAxios.create({
  baseURL: "http://j7d204.p.ssafy.io:8080/rest",
  headers: {
    Authorization: "Bearer" + sessionStorage.getItem("accessToken"),
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem(
    "accessToken",
  )}`;
  return config;
});

export default api;