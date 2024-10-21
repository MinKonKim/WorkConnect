import { ChatType } from '@/types/chat';
import { StorageBucketNameKeys } from './_types';

export const MAX_FILE_SIZE = 3;

export const STORAGE_BUCKET_NAME = {
  imageFile: 'photos',
  videoFile: 'videos',
  documentFile: 'documents'
} as const;

export const CHAT_FILE_TYPE: Record<StorageBucketNameKeys, ChatType['type']> = {
  imageFile: 'image',
  videoFile: 'video',
  documentFile: 'document'
} as const;
