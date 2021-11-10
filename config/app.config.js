const appName = process.env.APP_NAME;
const bucketName = `${appName}-assets`;
const bucketRegion = process.env.region;
const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const deployedDomain = `https://${bucketName}-${environment}.s3.${bucketRegion}.amazonaws.com`;
const staticDomain =
  process.env.IS_OFFLINE === 'true'
    ? 'http://localhost:8080'
    : deployedDomain;

exports.appName = appName;
exports.bucketName = bucketName;
exports.bucketRegion = bucketRegion;
exports.staticDomain = staticDomain
