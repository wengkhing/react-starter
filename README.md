# React + Typescript + Webpack 5 + Jest

A simple react starter with Serverless server-side rendering (SSR), TypeScript, Webpack 5, Jest configured.

Prettier is also added for better development experience.

## Getting Started

For general development purpose with live hot reload enabled,
You could simply just `yarn start`.

However, if you would like to test server side rendering capabilities, first, `yarn build` and then have two terminal sessions to run these commands:
- `yarn start:ssr` 
- `yarn serve-static`

This will imitate production-like environment where static files are served from S3, and server-side rendering is done on lambda.