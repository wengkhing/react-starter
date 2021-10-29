import axios, { AxiosRequestConfig } from 'axios';
import { startLoading, endLoading } from '../store/app.slice';
import store from '../store/store';
import { isClient, isServer } from './detect';

export interface LoadingConfig {
  requestKey: string;
  isInterruptive?: boolean;
}

export type ExtendedAxiosRequestConfig<T = any> = AxiosRequestConfig<T> &
  LoadingConfig;

const appInterceptedAxios = async (config: ExtendedAxiosRequestConfig) => {
  const { requestKey, isInterruptive, ...axiosConfig } = config;
  let data;

  const http = axios.create();

  if (isServer) {
    ({ data } = await http.request(axiosConfig));
  } else if (isClient) {
    store.dispatch(startLoading({ requestKey, isInterruptive }));
    ({ data } = await http.request(axiosConfig));
    store.dispatch(endLoading({ requestKey, isInterruptive }));
  }

  return data;
};

export default appInterceptedAxios;
