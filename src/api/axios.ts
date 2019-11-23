import * as axios from "axios";

const axiosInstance = axios.default.create({
  baseURL: "http://localhost:4000/api"
});

axiosInstance.interceptors.response.use(response => response.data);

export { axiosInstance };
