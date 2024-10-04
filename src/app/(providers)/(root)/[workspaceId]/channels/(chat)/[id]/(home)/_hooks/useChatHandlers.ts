import { GetChannelMessageTypes } from '@/types/channel';
import { RealtimeSubscribeProps } from '@/utils/createRealtimeChannel';
import { useCallback, useState } from 'react';

import { useInvalidateLatestNotice } from '@/hooks/queries/useChat';
import {
  useInvalidateChannelMessages,
  useInvalidateChannelUsers,
  useMutationUpdateChannelLastActive
} from '@/hooks/queries/useChannel';

type PayloadMessagesTypes = GetChannelMessageTypes & { channel_id: string };
export type UpdatePayloadTypes = {
  new: PayloadMessagesTypes;
  old: PayloadMessagesTypes;
  eventType: RealtimeSubscribeProps['eventHandlers'][0]['event'];
};
type HandleNoticeUpdatesTypes = { latestNoticeId: number | undefined; channelId: number };
type HandleChatUpdatesTypes = { channelId: number };
type HandleUserInfoUpdatesTypes = { channelId: number };

export const useChatHandlers = () => {
  const invalidateChannelUsers = useInvalidateChannelUsers();
  const invalidateChatMessages = useInvalidateChannelMessages();
  const invalidateLatestNotice = useInvalidateLatestNotice();
  const { mutateAsync: updateChannelActiveAt } = useMutationUpdateChannelLastActive();
  const [payloadMessages, setPayloadMessages] = useState<PayloadMessagesTypes[]>([]);

  const handleMessagesUpdates = useCallback(({ channelId }: HandleChatUpdatesTypes) => {
    return async (payload: UpdatePayloadTypes) => {
      const { eventType, new: newPayload } = payload;

      switch (eventType) {
        case 'INSERT':
          setPayloadMessages((prev) => [...prev, newPayload]);
          await updateChannelActiveAt(channelId);
          await invalidateChannelUsers(channelId);
          break;
        case 'DELETE':
          invalidateChatMessages(channelId);
          setPayloadMessages([]);
          break;
      }
    };
  }, []);

  const handleNoticeUpdates = useCallback(({ latestNoticeId, channelId }: HandleNoticeUpdatesTypes) => {
    return (payload: UpdatePayloadTypes) => {
      const { eventType, new: newPayload, old } = payload;

      const isNoticeDeleted = eventType === 'DELETE' && latestNoticeId === old.id;
      const isNoticeUpdated = newPayload.type === 'notice';

      if (isNoticeDeleted || isNoticeUpdated) {
        invalidateLatestNotice(channelId);
      }
    };
  }, []);

  const handleUserInfoUpdates = useCallback(({ channelId }: HandleUserInfoUpdatesTypes) => {
    return () => {
      invalidateChannelUsers(channelId);
    };
  }, []);

  return {
    handleNoticeUpdates,
    handleMessagesUpdates,
    payloadMessages,
    handleUserInfoUpdates
  };
};
