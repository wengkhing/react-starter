import { readFileSync } from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetData } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';
import { StaticRouter } from 'react-router-dom';

const html = readFileSync('./dist/index.html').toString();

export default (path: string) => {
  console.log('rndering!');
  const context = { helmet: {} as HelmetData };

  const markup = renderToString(
    <HelmetProvider context={context}>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  return html
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace('<title>React App</title>', context.helmet.title.toString())
    .replace('</head>', `${context.helmet.meta.toString()}</head>`)
    .replace('</head>', `${context.helmet.link.toString()}</head>`)
    .replace('<body>', `<body ${context.helmet.bodyAttributes.toString()}>`)
    .replace(/(\.\/)?static/g, 'http://localhost:8080/static');
};
