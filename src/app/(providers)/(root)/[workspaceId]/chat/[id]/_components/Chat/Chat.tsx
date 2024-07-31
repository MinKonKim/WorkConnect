import type { ComponentProps } from 'react';
import Typography from '@/components/Typography';
import { CHAT_TYPE } from '@/constants/chat';
import { GetChatMessageType } from '@/types/chat';
import { StrictNextImagePropsType, StrictPropsWithChildren } from '@/types/common';
import { handleDownloadFile } from '@/utils/file';
import Image from 'next/image';
import clsx from 'clsx';
import ChatImage from '../ChatImage';
import ChatVideo from '../ChatVideo';

type ClassNameProps = Pick<ComponentProps<'div'>, 'className'>;

export const ChatContainer = ({ className, children }: StrictPropsWithChildren<ClassNameProps>) => {
  return <div className={clsx('flex flex-col', className)}>{children}</div>;
};

export const ChatThumbnail = ({ src = '', width, height, ...props }: StrictNextImagePropsType) => {
  return (
    <Image
      src={src}
      width={width || 50}
      height={height || 50}
      className="rounded-full object-cover w-[32px] h-[32px]"
      unoptimized
      {...props}
    />
  );
};

export const ChatOtherProfileContainer = ({ children }: StrictPropsWithChildren) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

export const ChatOtherProfileName = ({ children }: StrictPropsWithChildren) => {
  return (
    <Typography variant="Title16px" color="grey900">
      {children}
    </Typography>
  );
};

const ChatText = ({ children, className }: StrictPropsWithChildren<ClassNameProps>) => {
  return (
    <div className={clsx(`max-w-xs px-3 py-2 text-white rounded-[20px] whitespace-pre-wrap`, className)}>
      <div>{children}</div>
    </div>
  );
};

const ChatFile = ({ fileUrl, fileName }: { fileUrl: string; fileName: string }) => {
  return (
    <button
      type="button"
      onClick={() => handleDownloadFile(fileUrl, fileName)}
      className="rounded-lg border-b-2 border-gray-300 bg-white p-2 shadow-xl"
    >
      파일: {fileName}
    </button>
  );
};

export const ChatMessage = ({ chat, isMe }: { chat: GetChatMessageType; isMe: boolean }) => {
  switch (chat.type) {
    case CHAT_TYPE.image:
      return <ChatImage src={chat.content} className="rounded-lg w-[200px] h-auto" width={300} height={300} />;
    case CHAT_TYPE.document:
      return <ChatFile fileUrl={chat.content} fileName={chat.content.split('/').pop() || ''} />;
    case CHAT_TYPE.video:
      return <ChatVideo src={chat.content} className="rounded-lg" width={200} controls />;
    case CHAT_TYPE.text:
      return (
        <ChatText className={isMe ? 'rounded-tr-none bg-[#EBECFE]' : 'rounded-tl-none bg-grey50 ml-[40px] mt-[6px]'}>
          <Typography variant="Body12px" color="grey700Black">
            {chat.content}
          </Typography>
        </ChatText>
      );
    default:
      return null;
  }
};
