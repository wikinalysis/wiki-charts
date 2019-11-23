import { AxiosInstance } from "axios";

const doNothing = () => Promise.resolve({});

export type RevisionCountLatestLengthResponse = {
  data: Array<{
    latest_length: number;
    revision_count: number;
    revision_id: string;
    page_id: string;
  }>;
};

export const createApiService = (axios: AxiosInstance) => ({
  getPosts: doNothing,
  getPostById: doNothing,
  getRevisions: doNothing,
  getRevisionById: doNothing,
  getRevisionCountVsLatestLength: (params: { language: string }) => {
    return axios.get(`/revision-count-latest-length`, { params });
  }
});
