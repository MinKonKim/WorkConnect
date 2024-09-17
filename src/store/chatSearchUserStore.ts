'use client';

import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import type { SearchWorkspaceUserType } from '@/types/workspaceUser';
import { create } from 'zustand';

type SearchUsersState = {
  selectedUsers: SearchWorkspaceUserType[];
  handleSelectUser: (user: SearchWorkspaceUserType) => void;
  handleRemoveUser: (user: SearchWorkspaceUserType) => void;
  getSelectedUserIds: (workspaceUserId: string) => string[];
};

const useChatSearchUsersStore = create<SearchUsersState>((set, get) => ({
  selectedUsers: [],
  handleSelectUser: (user) => {
    const { selectedUsers, handleRemoveUser } = get();
    if (selectedUsers.find((selectedUser) => selectedUser.id === user.id)) {
      handleRemoveUser(user);
      return;
    }
    set((state) => ({ selectedUsers: [...state.selectedUsers, user] }));
  },
  handleRemoveUser: (user) => {
    set((state) => ({
      selectedUsers: state.selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
    }));
  },
  getSelectedUserIds: (workspaceUserId: string) => {
    const { selectedUsers } = get();
    return selectedUsers.map((user) => user.id).concat([workspaceUserId]);
  }
}));

export default useChatSearchUsersStore;
