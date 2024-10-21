import { STORAGE_BUCKET_NAME } from './_constants';

export type StorageBucketNameKeys = keyof typeof STORAGE_BUCKET_NAME;
export type OnUploadFileTypes = {
  blob: Blob;
  name: StorageBucketNameKeys;
};
