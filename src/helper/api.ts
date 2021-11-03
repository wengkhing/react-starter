import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { startLoading, endLoading, setError } from '../store/app.slice';
import store from '../store/store';
import { isClient } from './detect';

export interface LoadingConfig {
  requestKey: string;
  isInterruptive?: boolean;
}

export type ExtendedAxiosRequestConfig<T = any> = AxiosRequestConfig<T> &
  LoadingConfig;

const dispatch = (action: any) => {
  isClient && store.dispatch(action);
};

const interceptor = async <T = any>(
  request: (...args: any[]) => Promise<AxiosResponse>,
  url: string,
  config: ExtendedAxiosRequestConfig,
  body?: any
): Promise<T> => {
  const { requestKey, isInterruptive, ...axiosConfig } = config;

  dispatch(startLoading({ requestKey, isInterruptive }));

  try {
    const payload = [url, body, axiosConfig].filter(Boolean);
    const { data } = await request(...payload);

    return data as T;
  } catch (error) {
    store.dispatch(setError({ requestKey, error: error as Error }));
    throw error;
  } finally {
    dispatch(endLoading({ requestKey, isInterruptive }));
  }
};

const interceptedAxios = {
  ...axios,
  get: <T = any>(
    url: string,
    config: ExtendedAxiosRequestConfig
  ): Promise<T> => {
    return interceptor(axios.get, url, config);
  },
  delete: <T = any>(
    url: string,
    config: ExtendedAxiosRequestConfig
  ): Promise<T> => {
    return interceptor(axios.delete, url, config);
  },
  post: <T = any>(
    url: string,
    body: any,
    config: ExtendedAxiosRequestConfig
  ): Promise<T> => {
    return interceptor(axios.post, url, config, body);
  },
  put: <T = any>(
    url: string,
    body: any,
    config: ExtendedAxiosRequestConfig
  ): Promise<T> => {
    return interceptor(axios.put, url, config, body);
  },
};

export default interceptedAxios;
