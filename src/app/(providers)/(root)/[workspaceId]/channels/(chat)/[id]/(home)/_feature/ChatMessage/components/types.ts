import type { ComponentProps } from 'react';

export type ChatNoticeProps = ComponentProps<'div'> & { noticeUrl: string; content: string };
export type ChatTextProps = ComponentProps<'div'> & { content: string };
export type ChatFileProps = ComponentProps<'button'> & { name: string; href: string };
