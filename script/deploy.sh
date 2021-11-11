#!/bin/sh

DEPLOY_ENV=${1:-dev}

yarn build
yarn upload $DEPLOY_ENV &&

case $DEPLOY_ENV in
  prod)
    export NODE_ENV=production
    ;;
  *)
    export NODE_ENV=development
    ;;
esac

npx sls deploy --stage $DEPLOY_ENV
