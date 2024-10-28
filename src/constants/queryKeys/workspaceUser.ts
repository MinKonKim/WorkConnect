export const WORKSPACE_USER_QUERY_KEYS = {
  SEARCH_WORKSPACE_USERS: (workspaceId: number | null) => ['searchWorkspaceUsers', workspaceId] as const
};
