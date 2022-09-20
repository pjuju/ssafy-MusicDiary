import baseAxios from "axios";

const api = baseAxios.create({
  baseURL: "https://i7d204.p.ssafy.io/rest",
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