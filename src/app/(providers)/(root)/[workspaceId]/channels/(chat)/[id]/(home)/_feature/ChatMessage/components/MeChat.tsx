import ChatItem from './ChatItem';
import type { MeChatProps } from '../types';

const MeChat = ({ hasRead, createdAt, children }: MeChatProps) => {
  return (
    <ChatItem.Wrapper>
      <ChatItem.Utility>
        {hasRead && <ChatItem.ReadBadge />}
        <ChatItem.Time createdAt={createdAt} />
      </ChatItem.Utility>
      {children}
    </ChatItem.Wrapper>
  );
};

export default MeChat;
