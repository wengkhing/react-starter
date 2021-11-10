#!/usr/bin/env node
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const appConfig = require('../config/app.config');

let s3 = new AWS.S3();

const DEPLOY_ENV = process.argv[2];

if (!DEPLOY_ENV) {
  console.log(`${process.argv[1]} [dev|prod]`);
  process.exit(1);
}

const config = {
  bucketName: `${appConfig.bucketName}-${DEPLOY_ENV}`,
  bucketRegion: appConfig.region,
  buildPath: 'dist',
};

const IS_DEV = DEPLOY_ENV === 'dev';

const uploadDir = async function (s3Path, bucketName) {
  function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
      const filePath = path.join(currentDirPath, name);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walkSync(filePath, callback);
      }
    });
  }

  walkSync(s3Path, function (filePath, stat) {
    let bucketPath = filePath.substring(s3Path.length + 1);
    let params = {
      Bucket: bucketName,
      Key: bucketPath,
      Body: fs.readFileSync(filePath)
    };

    if (bucketPath.match(/.css$/)) {
      params.ContentType = 'text/css';
    }

    if (bucketPath.match(/.html$/)) {
      params.ContentType = 'text/html';
    }

    if (bucketPath.match(/.js$/)) {
      params.ContentType = 'text/javascript';
    }

    if (bucketPath.match(/.jpg$/) || bucketPath.match(/.jpeg$/)) {
      params.ContentType = 'image/jpeg';
    }

    if (bucketPath.match(/.png$/)) {
      params.ContentType = 'image/png';
    }

    if (bucketPath.match(/.svg$/)) {
      params.ContentType = 'image/svg+xml';
    }

    s3.putObject(params, function (err, data) {
      if (err) {
        console.log('Error uploading object');
        throw err;
      } else {
        console.log(
          `Uploaded ${bucketPath}${
            !!params.ContentType ? `, Content-Type: ${params.ContentType}` : ''
          }`
        );
      }
    });
  });
};

const createBucket = async function (bucket) {
  try {
    await s3.headBucket({ Bucket: bucket }).promise();
    console.log('Bucket:', bucket, 'exists. Skipping bucket creation.');
  } catch (err) {
    try {
      console.log('Bucket:', bucket, 'creating..');
      await s3
        .createBucket({
          Bucket: bucket,
          ACL: 'public-read',
          CreateBucketConfiguration: {
            LocationConstraint: config.bucketRegion,
          },
        })
        .promise();

      console.log('Bucket:', bucket, 'created succesfully.');
      console.log('Bucket:', bucket, 'updating bucket policy..');

      await s3
        .putBucketPolicy({
          Bucket: bucket,
          Policy: JSON.stringify({
            Version: '2012-10-17',
            Statement: [
              {
                Sid: 'PublicReadGetObject',
                Effect: 'Allow',
                Principal: '*',
                Action: 's3:GetObject',
                Resource: `arn:aws:s3:::${bucket}/*`
              }
            ]
          })
        }).promise()

        console.log('Bucket:', bucket, 'updated bucket policy successfully');
    } catch (err) {
      console.error('Error creating bucket');
      throw err;
    }
  }
};

const clearBucket = async function (bucket) {
  let data;
  try {
    data = await s3.listObjects({ Bucket: bucket }).promise();
  } catch (err) {
    console.log('Error listing bucket objects');
  }

  if (data.Contents.length === 0) return;

  const objects = data.Contents.map((item) => ({ Key: item.Key }));
  const deleteParams = {
    Bucket: bucket,
    Delete: { Objects: objects },
  };

  try {
    await s3.deleteObjects(deleteParams).promise();
    console.log('Succesfully cleared bucket');
  } catch (err) {
    console.error('Error clearing bucket');
    throw err;
  }
};

const putBucketCors = async function (bucket) {
  try {
    const params = {
      Bucket: bucket,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: ['*'],
            AllowedMethods: ['GET'],
          },
        ],
      },
    };

    await s3.putBucketCors(params).promise();
    console.log('Successfully set bucket cors');
  } catch (err) {
    console.error('Error setting bucket cors');
    throw err;
  }
};

const execute = async function () {
  try {
    await createBucket(config.bucketName);
    await putBucketCors(config.bucketName);
    if (!IS_DEV) {
      await clearBucket(config.bucketName);
    }
    await uploadDir(config.buildPath, config.bucketName);
  } catch (err) {
    console.error(err);
    console.error('Bucket sync error. Exiting..');
    process.exit(1);
  }
};

execute();
