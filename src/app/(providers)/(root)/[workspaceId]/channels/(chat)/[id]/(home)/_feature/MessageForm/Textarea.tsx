'use client';

import { PlusIcon, SendIcon } from '@/icons';
import { forwardRef, type FormEvent, type KeyboardEvent, type RefObject } from 'react';

type TextareaProps = {
  handleOpenMenu: () => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  ref: RefObject<HTMLTextAreaElement>;
  buttonRef: RefObject<HTMLButtonElement>;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ handleOpenMenu, onCompositionStart, onCompositionEnd, handleSubmit, handleKeyDown, buttonRef }, ref) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex py-4 w-full bg-white p-4 pb-[14px] gap-[10px] border-t border-grey50 items-center">
          <button
            type="button"
            onClick={handleOpenMenu}
            aria-label="파일 추가"
            className="w-6 h-6 rounded-full bg-primary200Main flex justify-center items-center shrink-0 lg:hidden"
          >
            <PlusIcon className="w-5 h-5 text-white stroke-current" />
          </button>
          <div className="relative w-full">
            <textarea
              ref={ref}
              rows={1}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요"
              className="rounded w-full px-2 py-[12px] bg-[#fafafa] text-[12px] leading-[130%] tracking-[-0.24px] pr-9 resize-none h-[40px] max-h-[86px] block"
              onCompositionStart={onCompositionStart}
              onCompositionEnd={onCompositionEnd}
            />
          </div>
          <button ref={buttonRef} type="submit" aria-label="전송">
            <SendIcon className="w-5 h-5 text-grey700Black" />
          </button>
        </div>
      </form>
    );
  }
);

export default Textarea;
