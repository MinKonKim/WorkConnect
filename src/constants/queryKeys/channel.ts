export const CHANNEL_QUERY_KEYS = {
  CHANNELS: (workspaceId: number | null) => ['channels', workspaceId] as const,
  CHANNEL_INFO: (id: number) => ['channelInfo', id] as const,
  CHANNEL_DOCUMENTS: (id: number) => ['channelDocuments', id] as const,
  CHANNEL_MEDIA: (id: number) => ['channelMedia', id] as const,
  CHANNEL_NOTICES: (id: number) => ['channelNotices', id] as const,
  CHANNEL_MESSAGES: (channel_id: number) => ['channelMessages', channel_id] as const,
  CHANNEL_USERS: (channel_id: number) => ['channelUsers', channel_id] as const
};
