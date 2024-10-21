import { CHAT_TYPE } from '@/constants/chat';
import { ChatFile, ChatNotice, ChatText } from './components';
import { ContentProps } from './types';
import ChatImage from '@/components/ChatImage';
import ChatVideo from '@/components/ChatVideo';

export const componentsMap = {
  [CHAT_TYPE.image]: ({ noticeUrl, content, ...props }: ContentProps) => {
    return <ChatImage {...props} src={content} width={200} height={200} />;
  },
  [CHAT_TYPE.document]: ({ noticeUrl, content, ...props }: ContentProps) => {
    return <ChatFile name={content.split('/').pop() || ''} href={content} {...props} />;
  },
  [CHAT_TYPE.video]: ({ noticeUrl, content, ...props }: ContentProps) => {
    return <ChatVideo {...props} src={content} width={200} height={200} />;
  },
  [CHAT_TYPE.text]: ({ noticeUrl, ...props }: ContentProps) => {
    return <ChatText {...props} />;
  },
  [CHAT_TYPE.notice]: ({ noticeUrl, ...props }: ContentProps) => {
    return <ChatNotice {...props} noticeUrl={noticeUrl} />;
  }
};

export const styleMap = {
  me: {
    [CHAT_TYPE.image]: 'rounded-lg w-[200px] h-auto',
    [CHAT_TYPE.document]: '',
    [CHAT_TYPE.video]: 'rounded-lg',
    [CHAT_TYPE.text]: 'bg-[#EBECFE] rounded-br-none',
    [CHAT_TYPE.notice]: 'rounded-br-none'
  },
  other: {
    [CHAT_TYPE.image]: 'rounded-lg w-[200px] h-auto',
    [CHAT_TYPE.document]: '',
    [CHAT_TYPE.video]: 'rounded-lg',
    [CHAT_TYPE.text]: 'bg-grey50 rounded-tl-none',
    [CHAT_TYPE.notice]: 'rounded-tl-none'
  }
};
