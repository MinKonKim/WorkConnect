import { WORKSPACE_USER_QUERY_KEYS } from '@/constants/queryKeys';
import { createQueryOptions, useGetQuery } from './common';
import api from '@/api';
import { GetSearchWorkspaceUsersProps } from '@/types/workspaceUser';

const OPTIONS = {
  getSearchWorkspaceUsers: ({ workspace_id, term }: GetSearchWorkspaceUsersProps) => {
    return createQueryOptions({
      key: WORKSPACE_USER_QUERY_KEYS.SEARCH_WORKSPACE_USERS(workspace_id),
      fn: () => api.workspace.getSearchWorkspaceUsers({ workspace_id, term })
    });
  }
};

/** GET */
export const useGetSearchWorkspaceUsers = ({ workspace_id, term }: GetSearchWorkspaceUsersProps) => {
  return useGetQuery(OPTIONS.getSearchWorkspaceUsers({ workspace_id, term }));
};
