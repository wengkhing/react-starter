// Configuration for deployment

const appName = 'react-serverless';
const region = 'ap-southeast-1';

// Do not change the below

const bucketName = `${appName}-assets`;
const environment = process.env.APP_ENV === 'production' ? 'prod' : 'dev';
const deployedDomain = `https://${bucketName}-${environment}.s3.${region}.amazonaws.com`;
const staticDomain =
  process.env.IS_OFFLINE === 'true'
    ? 'http://localhost:8080'
    : deployedDomain;

console.log('APP_ENV:', process.env.APP_ENV);
console.log('bucketName:', bucketName);
console.log('environment:', environment);
console.log('staticDomain:', staticDomain);

exports.appName = appName;
exports.region = region;
exports.bucketName = bucketName;
exports.staticDomain = staticDomain
