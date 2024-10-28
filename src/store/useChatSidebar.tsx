import { create } from 'zustand';

export type ChatSidebarStateTypes = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const useChatSidebarStore = create<ChatSidebarStateTypes>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen }))
}));

export default useChatSidebarStore;
