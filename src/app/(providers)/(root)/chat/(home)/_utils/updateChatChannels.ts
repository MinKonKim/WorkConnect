import type { GetChatChannelsResponse } from '@/types/channel';
import type { ChatSubscribePayloadProps } from '@/types/chat';

export const updateChatChannels = (
  prev: GetChatChannelsResponse[],
  payload: ChatSubscribePayloadProps
): GetChatChannelsResponse[] => {
  const existingIndex = prev.findIndex((item) => item.channel_id === payload.channel_id);
  if (existingIndex === -1) return prev;

  return [
    {
      ...prev[existingIndex],
      message: payload.content,
      message_created_at: payload.created_at
    },
    ...prev.filter((_, index) => index !== existingIndex)
  ];
};
