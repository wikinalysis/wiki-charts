import { createApiService } from "./apiService";
import { axiosInstance } from "./axios";
import { wrapWithCache } from "./cache";

export default createApiService(wrapWithCache(axiosInstance, {}));
