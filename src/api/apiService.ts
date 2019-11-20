import { AxiosInstance } from "axios";

const doNothing = () => Promise.resolve({});

export const createApiService = (axios: AxiosInstance) => ({
  getPosts: doNothing,
  getPostById: doNothing,
  getRevisions: doNothing,
  getRevisionById: doNothing
});
