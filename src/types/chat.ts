import { CHAT_TYPE } from '@/constants/chat';
import { Tables, TablesInsert } from './supabase';
import { CHAT_STATUS } from '@/constants/chat';

export type ChatType = {
  type: keyof typeof CHAT_TYPE;
  user_state: keyof typeof CHAT_STATUS;
} & Omit<Tables<'chat'>, 'type' | 'user_state'>;

export type ChatInsertType = TablesInsert<'chat'>;

export type ChatSubscribePayloadProps = ChatInsertType & Pick<ChatType, 'created_at'>;

export type GetChatMessagesProps = Pick<ChatType, 'channel_id'>;

export type GetLatestNoticeProps = Pick<ChatType, 'channel_id'>;

export type CreateChatMessageProps = Pick<ChatType, 'channel_id' | 'content' | 'type'>;
