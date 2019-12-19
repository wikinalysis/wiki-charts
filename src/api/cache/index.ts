import { AxiosInstance } from "axios";
import qs from "qs";

interface CacheService {
  hasKey: (key: string) => boolean;
  getKey: (key: string) => object;
  setKey: (key: string, val: object) => void;
}

// const cacheService: CacheService = undefined as any;

class CacheService {
  private option: {};
  private maxCacheSize: number = 15;
  private cacheMap: Map<string, object> = new Map();

  constructor(option: {}) {
    this.option = option || {};
  }

  setKey = (key: string, value: object) => {
    this.cacheMap.set(key, value);
    // if (this.maxCacheSize && this.cacheMap.size > this.maxCacheSize) {
    //   this.cacheMap.delete(this.cacheMap.keys()[0]);
    // }
  };

  hasKey = (key: string) => {
    return this.cacheMap.has(key);
  };

  getKey = (key: string): object => {
    const result = this.cacheMap.get(key);
    if (!result) throw Error;
    return result;
  };

  clear = () => this.cacheMap.clear();
}

export const wrapWithCache = (
  instance: AxiosInstance,
  options: any
): AxiosInstance => {
  const originalGet = instance.get;
  const cacheService = new CacheService(options);
  instance.get = (string, config) => {
    const cacheKey =
      config && config.params
        ? `${string}?${qs.stringify(config.params)}`
        : string;
    if (cacheService.hasKey(cacheKey)) {
      return Promise.resolve(cacheService.getKey(cacheKey)) as any;
    } else {
      const query = originalGet(string, config);
      query.then(response => cacheService.setKey(cacheKey, response));
      return query;
    }
  };
  return instance;
};
