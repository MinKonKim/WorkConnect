import { useGetChannelInfo } from '@/hooks/queries/useChannel';
import useGetParamsChannelId from '@/hooks/useGetParamsChannelId';

export const useFetchChannelInfos = () => {
  const channelId = useGetParamsChannelId();

  const { data, isPending } = useGetChannelInfo(channelId);

  if (isPending) {
    return {
      name: '',
      channel_thumbnail: ''
    };
  }

  return {
    name: data?.name ?? '',
    channel_thumbnail: data?.channel_thumbnail ?? ''
  };
};
