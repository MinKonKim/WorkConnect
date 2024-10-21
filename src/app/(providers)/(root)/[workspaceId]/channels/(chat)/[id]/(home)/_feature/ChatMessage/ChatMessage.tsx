import clsx from 'clsx';
import { type MouseEvent, useCallback } from 'react';
import { UseChatMessageListReturnTypes } from '../../_hooks/useChatMessageList';
import { MenuStoreTypes } from '@/store/chatContextMenuStore';
import { componentsMap, styleMap } from './utils';
import { MeChat, OtherChat } from './components';

type ChatMessageProps = {
  onContextMenu: MenuStoreTypes['openMenu'];
  hasRead: boolean;
  createdAt: UseChatMessageListReturnTypes['chat']['created_at'];
  noticeUrl: UseChatMessageListReturnTypes['noticeUrl'];
  otherProfileProps: UseChatMessageListReturnTypes['otherProfileProps'];
  isMe: UseChatMessageListReturnTypes['isMe'];
} & Pick<UseChatMessageListReturnTypes['chat'], 'id' | 'type' | 'content'>;

const ChatMessage = ({
  isMe,
  hasRead,
  createdAt,
  type,
  noticeUrl,
  content,
  otherProfileProps,
  onContextMenu,
  id
}: ChatMessageProps) => {
  const Content = componentsMap[type];

  const handleContextMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      onContextMenu?.({ event, type, content, id, isMe });
    },
    [id]
  );

  if (isMe) {
    return (
      <MeChat hasRead={hasRead} createdAt={createdAt}>
        <Content
          data-target="message"
          content={content}
          noticeUrl={noticeUrl}
          className={clsx('prevent-select', styleMap.me[type])}
          onContextMenu={handleContextMenu}
        />
      </MeChat>
    );
  }

  if (!otherProfileProps) return null;

  return (
    <OtherChat createdAt={createdAt} {...otherProfileProps}>
      <Content
        data-target="message"
        content={content}
        noticeUrl={noticeUrl}
        className={clsx('ml-[40px] mt-[6px]', 'prevent-select', styleMap.other[type])}
        onContextMenu={handleContextMenu}
      />
    </OtherChat>
  );
};

export default ChatMessage;
