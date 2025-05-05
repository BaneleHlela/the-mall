import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: 'the-mall-440813',
  keyFilename: 'C:/Users/banel/Desktop/The Mall/public/the-mall-440813-25bf86cf94b3.json',
});

export const uploadsBucket = storage.bucket('the-mall-uploads-giza69');
const publicAssetsBucket = storage.bucket('the-mall-public-assets-giza69');
const tempFilesBucket = storage.bucket('the-mall-temp-giza69');

// Export upload functions
export const uploadToUploads = async (fileBuffer, destFileName) => {
  try {
    const file = uploadsBucket.file(destFileName);
    await file.save(fileBuffer, {
      resumable: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    console.log(`${destFileName} uploaded to ${uploadsBucket.name}`);
  } catch (error) {
    console.error('Error uploading to the bucket:', error);
    throw new Error('Error uploading file');
  }
};


export const uploadToPublicAssets = async (filePath, destFileName) => {
  await publicAssetsBucket.upload(filePath, {
    destination: destFileName,
    resumable: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });
  console.log(`${filePath} uploaded to ${publicAssetsBucket.name}`);
};

export const uploadToTempFiles = async (filePath, destFileName) => {
  await tempFilesBucket.upload(filePath, {
    destination: destFileName,
    resumable: true,
    metadata: {
      cacheControl: 'no-cache',
    },
  });
  console.log(`${filePath} uploaded to ${tempFilesBucket.name}`);
};



// import { Storage } from "@google-cloud/storage";
// import path from "path";

// const storage = new Storage({
//   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
// });

// const bucket = storage.bucket("banele_first_bucket");

// export default bucket;