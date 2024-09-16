import { StrictPropsWithChildren } from '@/types/common';
import { forwardRef } from 'react';
import MessagesContainer from './MessagesContainer';
import NoticeBar from './NoticeBar';

const MessagesWrapper = forwardRef<HTMLDivElement, StrictPropsWithChildren>(({ children }, ref) => {
  return (
    <MessagesContainer>
      <NoticeBar />
      <article className="flex-grow overflow-y-scroll px-4 scroll-container">
        <div className="relative flex flex-col gap-6 py-4" ref={ref}>
          {children}
        </div>
      </article>
    </MessagesContainer>
  );
});

export default MessagesWrapper;
