export const QUERY_KEYS = {
  CHANNELS: (workspaceId: number | null) => ['channels', workspaceId] as const,
  CHANNEL_ID: (workspaceId: number | null) => ['channelId', workspaceId] as const,
  SEARCH_WORKSPACE_USERS: (workspaceId: number) => ['searchWorkspaceUsers', workspaceId] as const
};
