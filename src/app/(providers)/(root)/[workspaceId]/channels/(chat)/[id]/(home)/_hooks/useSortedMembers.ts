'use client';

import { useGetChannelUsers } from '@/hooks/queries/useChannel';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { useParams } from 'next/navigation';

export const useSortedMembers = () => {
  const { id } = useParams();
  const workspaceUserId = useWorkspaceUserId();

  const channelUsers = useGetChannelUsers(Number(id));
  const members = channelUsers || {};
  return Object.values(members).sort((a, _) => (a?.workspace_user_id === workspaceUserId ? -1 : 1));
};
