'use client';

import { useGetChannelUsers, useMutationUpdateChannelLastActive } from '@/hooks/queries/useChannel';
import { isEmpty } from '@/utils/isEmpty';
import { useEffect, useRef } from 'react';
import useChatMessageList from '../../_hooks/useChatMessageList';
import useGetParamsChannelId from '@/hooks/useGetParamsChannelId';
import Chats from './Chats';
import useChatContextMenuStore from '@/store/chatContextMenuStore';

const ChatList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const channelId = useGetParamsChannelId();
  const { openMenu } = useChatContextMenuStore();

  const { chatMessageList, lastActiveAt } = useChatMessageList();

  const { data: channelUsers = {} } = useGetChannelUsers(Number(channelId));
  const { mutate: updateChannelActiveAt } = useMutationUpdateChannelLastActive();

  useEffect(() => {
    if (!channelId) return;

    updateChannelActiveAt(channelId);
  }, [channelId]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ block: 'end' });
  }, [chatMessageList.length]);

  return (
    <article className="flex-grow overflow-y-scroll px-4 scroll-container flex-1">
      <div className="relative flex flex-col gap-6 py-4" ref={ref}>
        {!isEmpty(channelUsers) && (
          <Chats
            data={chatMessageList}
            lastActiveAt={lastActiveAt}
            onContextMenu={({ event, type, content, id, isMe }) =>
              openMenu({
                event,
                type,
                content,
                id,
                isMe
              })
            }
          />
        )}
      </div>
    </article>
  );
};

export default ChatList;
