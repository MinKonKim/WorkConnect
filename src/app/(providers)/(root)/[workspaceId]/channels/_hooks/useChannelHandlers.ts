import { useCallback } from 'react';
import { updateChatChannels } from '../_utils/updateChatChannels';
import { ChatSubscribePayloadProps } from '@/types/chat';
import { GetChannelsResponse } from '@/types/channel';
import { useInvalidateChannels, useSetQueryDataChannels } from './useChannelQuery';

type WorkspaceInfoProps = {
  workspaceId: number;
};

export const useChannelHandlers = () => {
  const { setQueryData: setQueryDataChannels } = useSetQueryDataChannels();
  const { invalidate: invalidateChannels } = useInvalidateChannels();

  const handleChatInserts = useCallback(({ workspaceId }: WorkspaceInfoProps) => {
    return ({ new: payload }: { new: ChatSubscribePayloadProps }) => {
      setQueryDataChannels(workspaceId, (prev: GetChannelsResponse[]) => updateChatChannels(prev, payload));
    };
  }, []);

  const handleChannelUserUpdates = useCallback(({ workspaceId }: WorkspaceInfoProps) => {
    return () => {
      invalidateChannels(workspaceId);
    };
  }, []);

  return { handleChatInserts, handleChannelUserUpdates };
};
