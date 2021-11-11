#!/bin/sh

DEPLOY_ENV=${1:-dev}

case $DEPLOY_ENV in
  prod)
    export NODE_ENV=production
    ;;
  *)
    export NODE_ENV=development
    ;;
esac

yarn build
echo "NODE_ENV: $NODE_ENV"
yarn upload $DEPLOY_ENV &&
echo "NODE_ENV: $NODE_ENV"
npx sls deploy --stage $DEPLOY_ENV
