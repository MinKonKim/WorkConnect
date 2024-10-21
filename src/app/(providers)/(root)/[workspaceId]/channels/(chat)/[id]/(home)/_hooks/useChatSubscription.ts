import { useEffect } from 'react';
import { GetUsersInChannelResponse } from '@/types/channel';
import { isEmpty } from '@/utils/isEmpty';
import { useChatHandlers } from './useChatHandlers';
import { handleSubscribeToChat, handleSubscribeToNotice } from '../_utils/subscribe';

type UseChatSubscriptionProps = {
  channelId: number;
  usersInChannel: GetUsersInChannelResponse;
  isPending: boolean;
  latestNoticeId?: number;
};

const useChatSubscription = ({ channelId, usersInChannel, isPending, latestNoticeId }: UseChatSubscriptionProps) => {
  const {
    handleMessagesUpdates,
    handleUserInfoUpdates,
    payloadMessages,
    handleNoticeUpdates: handleUpdates
  } = useChatHandlers();

  useEffect(() => {
    if (!channelId || isPending || isEmpty(usersInChannel)) return;

    const channel = handleSubscribeToChat({
      handleMessagesUpdates: handleMessagesUpdates({ channelId }),
      handleUserInfoUpdates: handleUserInfoUpdates({ channelId }),
      userIds: Object.keys(usersInChannel).join(',')
    }).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [channelId, isPending, usersInChannel]);

  useEffect(() => {
    if (!channelId) return;

    const channel = handleSubscribeToNotice({
      handler: handleUpdates({ latestNoticeId, channelId })
    }).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [channelId, latestNoticeId]);

  return { payloadMessages };
};

export default useChatSubscription;
