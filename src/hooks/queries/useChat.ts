import api from '@/api';
import { createQueryOptions, useCreateInvalidateQueries, useGetQuery, useMutationQuery } from './common';
import { CHAT_QUERY_KEYS } from '@/constants/queryKeys';
import { QueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { CreateChatMessageProps } from '@/types/chat';
import { GetChannelMessageTypes } from '@/types/channel';
import { PostUploadFileProps } from '@/types/storage';

const OPTIONS = {
  getLatestNotice: (id: number) => {
    return createQueryOptions<GetChannelMessageTypes>({
      key: CHAT_QUERY_KEYS.LATEST_NOTICE(id),
      fn: () => api.chat.getLatestNotice(id)
    });
  }
};

const MUTATIONS = {
  createMessage: (channelId: number) => ({
    mutationFn: ({ content, type }: Omit<CreateChatMessageProps, 'channel_id'>) => {
      return api.chat.createChatMessage({
        channel_id: channelId,
        content,
        type
      });
    }
  }),
  deleteMessage: (channelId: number) => ({
    mutationFn: (id: number) => {
      return api.chat.deleteChatMessage({ channel_id: channelId, id });
    }
  }),
  uploadFile: (options: QueryOptions) => ({
    mutationFn: ({ formData, storagePath, maxFileSize }: PostUploadFileProps) => {
      return api.storage.postUploadFile({
        formData,
        storagePath,
        maxFileSize
      });
    },
    ...options
  })
};

export const CHAT_QUERY_OPTIONS = OPTIONS;

/** GET */
export const useGetLatestNotice = (id: number) => {
  return useGetQuery(OPTIONS.getLatestNotice(id));
};

/** MUTATION */
export const useMutationCreateMessage = (channelId: number) => {
  return useMutationQuery(MUTATIONS.createMessage(channelId));
};
export const useMutationDeleteMessage = (channelId: number) => {
  return useMutationQuery(MUTATIONS.deleteMessage(channelId));
};
export const useMutationUploadFile = (options: UseMutationOptions) => {
  return useMutationQuery(MUTATIONS.uploadFile(options));
};

/** INVALIDATE */
export const useInvalidateLatestNotice = () => {
  const invalidate = useCreateInvalidateQueries();

  return (channelId: number) => {
    return invalidate(CHAT_QUERY_KEYS.LATEST_NOTICE(channelId));
  };
};
