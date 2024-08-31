const { Storage } = require('@google-cloud/storage');
const keys = require('../config/keys');

const storage = new Storage({
  projectId: keys.GCP_PROJECT_ID,
  keyFilename: `${keys.GCP_KEY_FILENAME}`,
});

const fetchSignedUrl = async (action, fileName, fileType) => {
  const bucketName = keys.GCP_BUCKET_NAME;

  const options = {
    version: 'v4',
    action,
    expires: Date.now() + 3 * 60 * 1000, // 3-minute expiration
    contentType: fileType,
  };

  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  return url;
};

module.exports = fetchSignedUrl;
