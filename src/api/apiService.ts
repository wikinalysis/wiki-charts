import { AxiosInstance } from "axios";

const doNothing = () => Promise.resolve({});

export interface ApiResponse<Data extends any, Meta extends any = {}> {
  data: Data;
  meta: Meta;
}

export interface SelectData {
  id: string;
  language: string;
  revisionCount?: number;
  createdAt?: string;
  textLength?: number;
}

export const createApiService = (axios: AxiosInstance) => ({
  getPosts: doNothing,
  getPostById: doNothing,
  getRevisions: doNothing,
  getRevisionById: doNothing,
  getCurrentWikis: (params: {}) => {
    return axios.get("/wikis/current", { params }) as Promise<
      ApiResponse<any[], any>
    >;
  },
  getRevisionsField: (params: {
    language: string;
    field: "createdAt" | "textLength";
  }) => {
    return axios.get("/revisions/select", { params }) as Promise<
      ApiResponse<SelectData[], any>
    >;
  },
  getPagesField: (params: { language: string; field: "revisionCount" }) => {
    return axios.get("/pages/select", { params }) as Promise<
      ApiResponse<SelectData[], any>
    >;
  },
  getRevisionsHistogram: (params: {
    language: string;
    field: "createdAt" | "textLength";
  }) => {
    return axios.get("/histogram/revisions", { params }) as Promise<
      ApiResponse<
        { floor: any; ceiling: any; count: number }[],
        { minimum: any; maximum: any }
      >
    >;
  },
  getPagesHistogram: (params: { language: string; field: "revisionCount" }) => {
    return axios.get("/histogram/pages", { params }) as Promise<
      ApiResponse<
        { floor: any; ceiling: any; count: number }[],
        { minimum: any; maximum: any }
      >
    >;
  }
});
