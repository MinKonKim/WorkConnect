import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery } from '@tanstack/react-query';

const useWorkspaceUser = (userId: string | null) => {
  const {
    data: workspaceUser,
    isPending,
    isError
  } = useQuery<Tables<'workspace_user'> | undefined>({
    queryKey: ['workspaceUser'],
    queryFn: () => {
      if (!userId) return;
      return api.workspaceUser.getWorkspaceUser(userId);
    },
    enabled: !!userId
  });

  const { mutateAsync: updateWorkspaceUser } = useMutation({
    mutationFn: (workspaceUser: Partial<Tables<'workspace_user'>>) =>
      api.workspaceUser.updateWorkspaceUser(workspaceUser)
  });
  return { workspaceUser, isPending, isError, updateWorkspaceUser };
};

export default useWorkspaceUser;
