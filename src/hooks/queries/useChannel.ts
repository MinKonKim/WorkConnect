import api from '@/api';
import {
  GetUsersInChannelResponse,
  GetChannelMessagesResponseTypes,
  GetChannelMessageTypes,
  ChannelInsertType
} from '@/types/channel';
import { CHANNEL_QUERY_KEYS } from '@/constants/queryKeys';
import {
  createQueryOptions,
  getPrefetchQuery,
  useCreateInvalidateQueries,
  useGetQuery,
  useMutationQuery
} from './common';
import { useCreateSetQueryData } from './common/createSetQueryData';
import { PostUploadFileProps } from '@/types/storage';
import { QueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CreateChannelUsersProps } from '@/types/channelUser';

const OPTIONS = {
  getChannels: (workspaceId: number) => {
    return createQueryOptions({
      key: CHANNEL_QUERY_KEYS.CHANNELS(workspaceId),
      fn: api.channel.getChannels
    });
  },
  getMessages: (channelId: number) => {
    return createQueryOptions<GetChannelMessagesResponseTypes>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_MESSAGES(channelId),
      fn: () => api.channel.getChannelMessages(channelId)
    });
  },
  getUsers: (channelId: number) =>
    createQueryOptions<GetUsersInChannelResponse>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_USERS(channelId),
      fn: () => api.channel.getUsersInChannel(channelId),
      refetchOnWindowFocus: false,
      staleTime: 0
    }),
  getInfo: (id: number) =>
    createQueryOptions({
      key: CHANNEL_QUERY_KEYS.CHANNEL_INFO(id),
      fn: () => api.channel.getChannelInfo(id),
      refetchOnWindowFocus: false,
      staleTime: 0,
      select: (data) => data[0]
    }),
  getDocuments: (channelId: number) =>
    createQueryOptions<GetChannelMessageTypes[]>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_DOCUMENTS(channelId),
      fn: () => api.channel.getChannelDocuments(channelId),
      refetchOnWindowFocus: false,
      staleTime: 0
    }),
  getMedia: (channelId: number) =>
    createQueryOptions<GetChannelMessageTypes[]>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_MEDIA(channelId),
      fn: () => api.channel.getChannelMedia(channelId),
      refetchOnWindowFocus: false,
      staleTime: 0
    }),
  getNotices: (channelId: number) =>
    createQueryOptions<GetChannelMessageTypes[]>({
      key: CHANNEL_QUERY_KEYS.CHANNEL_NOTICES(channelId),
      fn: () => api.channel.getChannelNotices(channelId),
      refetchOnWindowFocus: false,
      staleTime: 0
    })
};

const MUTATIONS = {
  updateLastActive: () => ({
    mutationFn: (channelId: number) => {
      return api.channel.updateChannelLastActive(channelId);
    }
  }),
  updateChannelThumbnail: (options: UseMutationOptions<AxiosResponse<string, any>, Error, PostUploadFileProps>) => ({
    mutationFn: ({ formData, storagePath, maxFileSize = 3 }: PostUploadFileProps) => {
      return api.storage.postUploadFile({
        formData,
        storagePath,
        maxFileSize
      });
    },
    ...options
  }),
  createChannel: (workspace_id: number) => ({
    mutationFn: ({ name, type, thumbnail }: Omit<ChannelInsertType, 'workspace_id'>) =>
      api.channel.postChannel({
        name,
        type,
        workspace_id,
        thumbnail
      })
  }),
  createChannelUsers: () => ({
    mutationFn: ({ channel_id, workspaceUserIds }: CreateChannelUsersProps) =>
      api.channelUser.createChannelUsers({ channel_id, workspaceUserIds })
  })
};

/** GET */
export const useGetChannels = (workspaceId: number) => {
  return useGetQuery(OPTIONS.getChannels(workspaceId));
};
export const useGetChannelInfo = (id: number) => {
  return useGetQuery(OPTIONS.getInfo(id));
};
export const useGetChannelDocuments = (channelId: number) => {
  return useGetQuery(OPTIONS.getDocuments(channelId));
};
export const useGetChannelMedia = (channelId: number) => {
  return useGetQuery(OPTIONS.getMedia(channelId));
};
export const useGetChannelNotices = (channelId: number) => {
  return useGetQuery(OPTIONS.getNotices(channelId));
};
export const useGetChannelUsers = (channelId: number) => {
  return useGetQuery(OPTIONS.getUsers(channelId));
};
export const useGetChannelMessages = (channelId: number) => {
  return useGetQuery(OPTIONS.getMessages(channelId));
};

/** MUTATION */
export const useMutationUpdateChannelLastActive = () => {
  return useMutationQuery(MUTATIONS.updateLastActive());
};
export const useMutationUpdateChannelThumbnail = (
  options: UseMutationOptions<AxiosResponse<string, any>, Error, PostUploadFileProps>
) => {
  return useMutationQuery(MUTATIONS.updateChannelThumbnail(options));
};
export const useMutationCreateChannel = (workspaceId: number) => {
  return useMutationQuery(MUTATIONS.createChannel(workspaceId));
};
export const useMutationCreateChannelUsers = () => {
  return useMutationQuery(MUTATIONS.createChannelUsers());
};

/** INVALIDATE */
export const useInvalidateChannels = () => {
  const invalidate = useCreateInvalidateQueries();

  return (workspaceId: number) => {
    return invalidate(CHANNEL_QUERY_KEYS.CHANNELS(workspaceId));
  };
};
export const useInvalidateChannelUsers = () => {
  const invalidate = useCreateInvalidateQueries();

  return (channelId: number) => {
    return invalidate(CHANNEL_QUERY_KEYS.CHANNEL_USERS(channelId));
  };
};
export const useInvalidateChannelMessages = () => {
  const invalidate = useCreateInvalidateQueries();

  return (channelId: number) => {
    return invalidate(CHANNEL_QUERY_KEYS.CHANNEL_MESSAGES(channelId));
  };
};

/** PREFETCH */
export const useGetPrefetchChannelInfo = async (id: number) => {
  return await getPrefetchQuery(OPTIONS.getInfo(id));
};

/** SET QUERY DATA */
export const useSetQueryDataChannels = () => {
  const setQueryData = useCreateSetQueryData();

  return {
    setQueryData: (workspaceId: number, callback: unknown) => {
      return setQueryData(CHANNEL_QUERY_KEYS.CHANNELS(workspaceId), callback);
    }
  };
};
