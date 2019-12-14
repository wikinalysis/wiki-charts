import * as axios from "axios";

const createAxiosConfig = (env: string): axios.AxiosRequestConfig => {
  switch (env) {
    case "development":
      return { baseURL: "http://localhost:4000/api" };
    case "production":
      return { baseURL: "https://api.wikinalysis.com/api" };
    default:
      return { baseURL: "http://localhost:4000/api" };
  }
};

const axiosInstance = axios.default.create(
  createAxiosConfig(process.env.NODE_ENV)
);

axiosInstance.interceptors.response.use(response => response.data);

export { axiosInstance };
