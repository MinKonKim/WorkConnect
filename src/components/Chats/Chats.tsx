import dayjs, { type Dayjs } from 'dayjs';
import Chat, { ChatProps } from './Chat';

type ChatsProps = {
  data: Omit<ChatProps, 'hasRead'>[];
  onContextMenu: ChatProps['onContextMenu'];
  lastActiveAt: Dayjs | null;
};

const Chats = ({ data = [], onContextMenu, lastActiveAt }: ChatsProps) => {
  return data.map(({ chat, isMe, noticeUrl, otherProfileProps }) => {
    const hasRead = isMe && lastActiveAt?.isAfter(dayjs(chat.created_at));

    return (
      <Chat
        key={chat.id}
        chat={chat}
        isMe={isMe}
        noticeUrl={noticeUrl}
        hasRead={hasRead ?? false}
        otherProfileProps={otherProfileProps}
        onContextMenu={onContextMenu}
      />
    );
  });
};

export default Chats;
