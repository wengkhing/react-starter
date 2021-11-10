import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchPath, RouteProps } from 'react-router';
import { renderToString } from 'react-dom/server';
import { HelmetData, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import App from '../App';
import routes from '../app.route';
import store from '../store/store';
import config from '../../config/app.config';
import html from '../../dist/index.html';

interface AsyncComponent {
  (): JSX.Element;
  asyncData?(): Promise<any>;
}

const matchRoute = (path: string, routes: RouteProps[]): RouteProps => {
  for (const route of routes) {
    if (matchPath(path, route)) return route;
  }

  return {};
};

export default async (path: string) => {
  const helmetContext = { helmet: {} as HelmetData };
  const { component: Component } = matchRoute(path, routes);

  try {
    const data = await (Component as AsyncComponent)?.asyncData?.call(null);

    const markup = renderToString(
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={path} context={data}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </Provider>
    );

    const { helmet } = helmetContext;

    return html
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
      .replace('<title>React App</title>', helmet.title.toString())
      .replace('<meta name="placeholder">', `${helmet.meta.toString()}`)
      .replace('</head>', `${helmet.link.toString()}</head>`)
      .replace(
        '</head>',
        `<script>window.ASYNC_DATA=${JSON.stringify(data)}</script></head>`
      )
      .replace('<body>', `<body ${helmet.bodyAttributes.toString()}>`)
      .replace(/(\.\/)?static/g, `${config.staticDomain}/static`);
  } catch (err) {
    console.error(err);
  }
};
