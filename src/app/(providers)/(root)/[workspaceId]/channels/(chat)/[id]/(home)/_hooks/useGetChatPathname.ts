'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useParams } from 'next/navigation';

const useGetChatPathname = () => {
  const { id } = useParams();
  const workspaceId = useWorkspaceId();

  return `/${workspaceId}/channels/${id}`;
};

export default useGetChatPathname;
