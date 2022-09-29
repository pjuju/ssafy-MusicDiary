import baseAxios from "axios";
import axios from "axios";

const fileapi = baseAxios.create({
  baseURL: "http://j7d204.p.ssafy.io:8080/rest",
  headers: {
    "Content-Type": `multipart/form-data`,
    Authorization: "Bearer" + sessionStorage.getItem("accessToken"),
  },
});

fileapi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem(
    "accessToken",
  )}`;
  return config;
});


export default fileapi;