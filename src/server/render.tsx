import { readFileSync } from 'fs';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { matchPath, RouteProps } from 'react-router';
import { renderToString } from 'react-dom/server';
import { HelmetData } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';

import App from '../App';
import routes from '../app.route';
import { AxiosResponse } from 'axios';

const html = readFileSync('./dist/index.html').toString();

interface AsyncComponent {
  (): JSX.Element;
  asyncData?(): Promise<AxiosResponse>;
}

const matchRoute = (path: string, routes: RouteProps[]): RouteProps => {
  for (const route of routes) {
    if (matchPath(path, route)) return route;
  }

  return {};
};

export default async (path: string) => {
  const context = { helmet: {} as HelmetData };
  const { component: Component } = matchRoute(path, routes);

  try {
    const response = (await (Component as AsyncComponent)?.asyncData?.call(
      null
    )) as AxiosResponse;

    const { data } = response || {};

    const markup = renderToString(
      <HelmetProvider context={context}>
        <StaticRouter location={path} context={data}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    );

    return html
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
      .replace('<title>React App</title>', context.helmet.title.toString())
      .replace('</head>', `${context.helmet.meta.toString()}</head>`)
      .replace('</head>', `${context.helmet.link.toString()}</head>`)
      .replace(
        '</head>',
        `<script>window.ASYNC_DATA=${JSON.stringify(data)}</script></head>`
      )
      .replace('<body>', `<body ${context.helmet.bodyAttributes.toString()}>`)
      .replace(/(\.\/)?static/g, 'http://localhost:8080/static');
  } catch (err) {
    console.error(err);
  }
};
