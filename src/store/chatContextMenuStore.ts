'use client';

import { ChatType } from '@/types/chat';
import { MouseEvent } from 'react';
import { create } from 'zustand';

const TOP_BAR_HEIGHT = 84;

export type MenuTypes = {
  isOpen: boolean;
  id: number | null;
  type: ChatType['type'] | null;
  position: { y: number; isAtTop: boolean };
  content: string | null;
  isMe: boolean;
};

export type MenuStoreTypes = {
  openMenu: (props: OpenMenuProps) => void;
  closeMenu: () => void;
  menu: MenuTypes;
};

export type OpenMenuProps = {
  event: MouseEvent<HTMLElement>;
} & Pick<MenuTypes, 'type' | 'content' | 'id' | 'isMe'>;

const defaultMenu: MenuTypes = {
  isOpen: false,
  id: null,
  type: null,
  position: { y: 0, isAtTop: false },
  content: null,
  isMe: false
};

const calcMenuPosition = (target: HTMLElement, topBarHeight: number) => {
  const { bottom, top } = target.closest('[data-target="message"]')?.getBoundingClientRect() ?? {
    bottom: 0,
    top: 0
  };

  const adjustedBottom = bottom - topBarHeight;
  const adjustedTop = top - topBarHeight;
  const isAtTop = window.innerHeight - adjustedBottom >= 250;
  const positionY = isAtTop ? adjustedBottom + 10 : adjustedTop - 10;

  return { y: positionY, isAtTop };
};

const useChatContextMenuStore = create<MenuStoreTypes>((set) => ({
  menu: defaultMenu,
  openMenu: ({ event, ...props }: OpenMenuProps) => {
    event.preventDefault?.();

    const target = event.target as HTMLElement;
    const position = calcMenuPosition(target, TOP_BAR_HEIGHT);

    set(({ menu }) => ({
      menu: {
        ...menu,
        isOpen: true,
        position,
        ...props
      }
    }));
  },
  closeMenu: () => set({ menu: defaultMenu })
}));

export default useChatContextMenuStore;
