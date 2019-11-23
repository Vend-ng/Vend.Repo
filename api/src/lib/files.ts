import awsSdk from "aws-sdk";
import { Readable } from "stream";
import { config } from "../config";

const s3: awsSdk.S3 = new awsSdk.S3({
  accessKeyId: config.S3_ACCESS_KEY_ID,
  endpoint: config.S3_ENDPOINT,
  region: config.S3_REGION,
  secretAccessKey: config.S3_SECRET_KEY_ID
});

export const deleteFile: (url: string) => void = async (url: string) => {
  // The URL will be something like
  // https://mstacm-cdn-test.nyc3.digitaloceanspaces.com/test/UUID.pdf
  // so this will split it down the middle and just give the 'test/UUID.pdf'
  // portion.
  const splitUrl: string[] = url.split(
    `${config.S3_BUCKET_NAME}.${config.S3_ENDPOINT}/`
  );
  const filename: string = splitUrl[1];
  await s3
    .deleteObject({ Bucket: config.S3_BUCKET_NAME, Key: filename })
    .promise();
};

export const uploadFile = async (
  stream: Readable,
  filename: string,
  contentType?: string
): Promise<string> => {
  const response: awsSdk.S3.ManagedUpload.SendData = await s3
    .upload({
      ACL: "public-read",
      Body: stream,
      Bucket: config.S3_BUCKET_NAME,
      ContentType: contentType,
      Key: filename
    })
    .promise();

  return response.Location;
};