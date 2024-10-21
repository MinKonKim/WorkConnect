import { useCallback, useState } from 'react';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useGetSearchWorkspaceUsers } from '@/hooks/queries/useWorkspaceUser';

export const useSearch = () => {
  const workspaceId = useWorkspaceId();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: searchUsers, refetch: refetchSearchUsers } = useGetSearchWorkspaceUsers({
    workspace_id: workspaceId,
    term: searchTerm
  });

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      setSearchTerm(term);
      refetchSearchUsers();
    },
    [refetchSearchUsers]
  );

  return { searchTerm, handleSearch, searchUsers };
};
