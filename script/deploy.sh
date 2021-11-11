#!/bin/sh

DEPLOY_ENV=${1:-dev}

case $DEPLOY_ENV in
  prod)
    export NODE_ENV=production
    export APP_ENV=production
    ;;
  *)
    export NODE_ENV=development
    export APP_ENV=development
    ;;
esac

yarn build
yarn upload $DEPLOY_ENV &&
npx sls deploy --stage $DEPLOY_ENV
