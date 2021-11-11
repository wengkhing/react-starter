# Serverless React

Serverless SSR data fetching enabled minimal react starter.

## Motivation
- Getting the power of server-side rendering
- Maximize cost efficiency, there's no need to run an instance 24/7 to serve the web application
- Scale with 100% efficiency
- Save time, no provisioning or managing of infrastructure

## Concept

### Server-side Rendering (SSR)
There are 2 conditions to fulfill in order to achieve true SSR:
- Page can be rendered on server-side
- Data can be fetched on server-side and render on the page

Custom `useAsyncData` hook for fetching data on server. Check out how to use this at the [auth component](https://github.com/wengkhing/serverless-react-starter/blob/master/src/page/Auth/Auth.tsx).

### Serverless

It can be tricky when comes to serving web application using serverless, the motive to use serverless is just for enabling server-side rendering capability, so be extra careful that the assets of the web application is not served through the lambda endpoint, else we might end up having multiple calls to the lambda with a single client request. To mitigate the issue, the static assets should be served using S3.

## Getting Started

### Development

For general development purpose with live hot reload enabled,
it is best to use `yarn start`.

However, to test server-side rendering capabilities locally, run `yarn start:ssr` and go to [localhost:3000](localhost:3000).
This script imitate production-like environment where static files are served from S3, and SSR is done on lambda.

- [localhost:8080](localhost:8080) => Serve static files
- [localhost:3000](localhost:3000) => Server-side rendering entry

Please take note that the development experience for `yarn start:ssr` is not perfect, changes on the code require to re-run the script.

### Deployment

Github pipeline action is written for the ease of deployment.
Any push to master branch would trigger a prod deployment, any other branches except master would trigger a dev deployment.

For initial setup for deployment:

1. Update app name and region in `app.config.js`
2. Update region in the pipeline files
3. Create a new repository in github
4. Add secrets (AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY) in the repository

For manual deployment, just run `yarn deploy (dev|prod)`
