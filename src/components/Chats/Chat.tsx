'use client';

import { CHAT_TYPE } from '@/constants/chat';
import useLongPress from '@/hooks/useLongPress';
import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { ChatFile, ChatImage, ChatNotice, ChatText, ChatVideo, OtherProfile, Time, ReadBadge } from './components';
import { GetChatMessageType } from '@/types/chat';
import { formatDate } from '@/utils/time';
import { type OtherProfileProps } from './components/OtherProfile';
type HandleContextMenuEventProps = React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLVideoElement>;

export type ChatProps = {
  chat: GetChatMessageType;
  isMe: boolean;
  noticeUrl: string;
  hasRead: boolean;
  otherProfileProps?: OtherProfileProps;
  onContextMenu?: (params: { targetElement: DOMRect } & Omit<ChatProps, 'onContextMenu'>) => void;
};

type ChatType = (typeof CHAT_TYPE)[keyof typeof CHAT_TYPE];

const DATA_TARGET = 'message';

const componentsMap: Record<ChatType, (props: any) => JSX.Element> = {
  [CHAT_TYPE.image]: (props: any) => <ChatImage {...props} />,
  [CHAT_TYPE.document]: (props: any) => <ChatFile {...props} />,
  [CHAT_TYPE.video]: (props: any) => <ChatVideo {...props} />,
  [CHAT_TYPE.text]: (props: any) => <ChatText {...props} />,
  [CHAT_TYPE.notice]: (props: any) => <ChatNotice {...props} />
};

const getStyles = (type: ChatType, isMe: boolean) => {
  const baseStyles = {
    margin: isMe ? '' : 'ml-[40px] mt-[6px]',
    rounded: isMe ? 'rounded-br-none' : 'rounded-tl-none',
    background: isMe ? 'bg-[#EBECFE]' : 'bg-grey50',
    select: 'prevent-select'
  };

  const additionalStyles: Record<ChatType, string> = {
    [CHAT_TYPE.image]: 'rounded-lg w-[200px] h-auto',
    [CHAT_TYPE.document]: '',
    [CHAT_TYPE.video]: 'rounded-lg',
    [CHAT_TYPE.text]: clsx(baseStyles.background, baseStyles.rounded),
    [CHAT_TYPE.notice]: baseStyles.rounded
  };

  return clsx(baseStyles.margin, baseStyles.select, additionalStyles[type]);
};

const Chat = memo(({ hasRead, isMe, noticeUrl, onContextMenu, otherProfileProps, chat }: ChatProps) => {
  const className = useMemo(() => getStyles(chat.type, isMe), [chat.type, isMe]);

  const handleContextMenu = useCallback(
    (event: React.TouchEvent | HandleContextMenuEventProps) => {
      event.preventDefault?.();

      const targetElement = (event.target as HTMLElement)?.closest('[data-target="message"]')?.getBoundingClientRect();
      if (!targetElement) return;

      onContextMenu?.({ targetElement, chat, noticeUrl, isMe, hasRead, otherProfileProps: otherProfileProps });
    },
    [onContextMenu, isMe, chat, noticeUrl, isMe, hasRead, otherProfileProps]
  );

  const { onTouchStart, onTouchEnd } = useLongPress(handleContextMenu);

  const Component = componentsMap[chat.type];
  if (!Component) return null;

  const commonProps = {
    'data-target': DATA_TARGET,
    onContextMenu: handleContextMenu,
    onTouchStart,
    onTouchEnd
  };

  const componentProps: Record<ChatType, Object> = {
    [CHAT_TYPE.text]: { ...commonProps, children: chat.content },
    [CHAT_TYPE.notice]: { ...commonProps, children: chat.content, src: noticeUrl },
    [CHAT_TYPE.image]: { ...commonProps, src: chat.content, width: 300, height: 300 },
    [CHAT_TYPE.document]: { ...commonProps, src: chat.content },
    [CHAT_TYPE.video]: { ...commonProps, src: chat.content, width: 200, controls: true }
  };

  return (
    <div className={`flex items-end gap-2 justify-end ${isMe ? '' : 'flex-wrap flex-row-reverse'}`}>
      {!isMe && otherProfileProps && <OtherProfile {...otherProfileProps} />}
      <div className="flex flex-col gap-1">
        {hasRead && <ReadBadge />}
        <Time>{formatDate(chat.created_at, 'A h:mm').toKor()}</Time>
      </div>
      <Component {...componentProps[chat.type]} className={className} />
    </div>
  );
});

export default Chat;
