import Typography from '@/components/Typography';
import clsx from 'clsx';
import { ChatTextProps } from './types';

const ChatText = ({ content, className, color: _color, ...props }: ChatTextProps) => {
  return (
    <Typography
      variant="Body14px"
      className={clsx(
        `max-w-[280px] px-3 py-2 rounded-[20px] whitespace-pre-wrap break-words selection:bg-transparent break-keep`,
        className
      )}
      color="grey700Black"
      {...props}
    >
      {content}
    </Typography>
  );
};

export default ChatText;
