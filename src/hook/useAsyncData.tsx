import { useEffect, useState } from 'react';
import { StaticRouterContext } from 'react-router';
import { isServer, isClient } from '../helper/detect';

export const useAsyncData = (
  context: StaticRouterContext,
  request: () => Promise<any>
) => {
  let data;
  if (isServer) {
    data = context;
  } else if (isClient) {
    if (window.ASYNC_DATA) {
      data = window.ASYNC_DATA;
      delete window.ASYNC_DATA;
    } else {
      let setData: React.Dispatch<any>;
      [data, setData] = useState();

      useEffect(() => {
        request().then(setData);
      }, []);
    }
  }

  return data;
};
