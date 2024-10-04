import dayjs, { type Dayjs } from 'dayjs';
import ChatMessage from '../ChatMessage';
import { MenuStoreTypes } from '@/store/chatContextMenuStore';
import { UseChatMessageListReturnTypes } from '../../_hooks/useChatMessageList';

type ChatsProps = {
  data: UseChatMessageListReturnTypes[];
  onContextMenu: MenuStoreTypes['openMenu'];
  lastActiveAt: Dayjs | null;
};

const Chats = ({ data = [], onContextMenu, lastActiveAt }: ChatsProps) => {
  return data.map(({ chat, isMe, noticeUrl, otherProfileProps }) => {
    const hasRead = isMe && lastActiveAt?.isAfter(dayjs(chat.created_at));

    return (
      <ChatMessage
        key={chat.id}
        id={chat.id}
        isMe={isMe}
        hasRead={hasRead ?? false}
        createdAt={chat.created_at}
        type={chat.type}
        content={chat.content}
        onContextMenu={onContextMenu}
        otherProfileProps={otherProfileProps}
        noticeUrl={noticeUrl}
      />
    );
  });
};

export default Chats;
