import { StrictPropsWithChildren } from '@/types/common';
import type { MouseEvent } from 'react';

export type ProfileProps = {
  src: string | null;
  userName: string;
  href: string;
};
export type TimeProps = { createdAt: string };
export type OtherChatProps = StrictPropsWithChildren<ProfileProps & TimeProps>;
export type MeChatProps = StrictPropsWithChildren<{ hasRead: boolean } & TimeProps>;
export type WrapperProps = StrictPropsWithChildren<{ className?: string }>;

export type ContentProps = {
  'data-target': string;
  content: string;
  noticeUrl: string;
  className: string;
  onContextMenu: (event: MouseEvent<HTMLElement>) => void;
};
