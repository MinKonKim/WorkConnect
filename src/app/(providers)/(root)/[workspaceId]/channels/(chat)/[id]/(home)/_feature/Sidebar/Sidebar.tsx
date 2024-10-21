'use client';

import useChatSidebarStore from '@/store/useChatSidebar';
import { SidebarHeader, SidebarMenu, SidebarUserList, SidebarWrapper } from './components';
import { useMemo } from 'react';
import useGetChatPathname from '../../_hooks/useGetChatPathname';
import { createMenuItems } from './utils';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { useSortedMembers } from '../../_hooks/useSortedMembers';
import { useFetchChannelInfos } from '../../_hooks/useFetchChannelName';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useChatSidebarStore();

  const pathname = useGetChatPathname();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();

  const menuItems = useMemo(() => createMenuItems(pathname), [pathname]);
  const { name: channelName } = useFetchChannelInfos();

  const sortedMembers = useSortedMembers();

  return (
    <SidebarWrapper isOpen={isOpen} toggleSidebar={toggleSidebar}>
      <SidebarHeader title={channelName} />
      <SidebarUserList sortedMembers={sortedMembers} workspaceUserId={workspaceUserId} workspaceId={workspaceId} />
      <SidebarMenu menuItems={menuItems} />
    </SidebarWrapper>
  );
};

export default Sidebar;
