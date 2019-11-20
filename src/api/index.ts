import { createApiService } from "./apiService";
import { axiosInstance } from "./axios";

export default createApiService(axiosInstance);
