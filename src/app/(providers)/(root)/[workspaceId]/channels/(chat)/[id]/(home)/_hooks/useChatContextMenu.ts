import { useSnackBar } from '@/providers/SnackBarContext';
import { useParams } from 'next/navigation';
import { CHAT_TYPE } from '@/constants/chat';
import { useCallback } from 'react';
import useChatContextMenuStore from '@/store/chatContextMenuStore';
import { useMutationCreateMessage, useMutationDeleteMessage } from '@/hooks/queries/useChat';

export const useChatContextMenu = () => {
  const { id } = useParams();
  const { menu, closeMenu } = useChatContextMenuStore();
  const { openSnackBar } = useSnackBar();

  const { mutate: mutateChatMessage } = useMutationCreateMessage(Number(id));

  const { mutateAsync: mutateDeleteChatMessage } = useMutationDeleteMessage(Number(id));

  const deleteChat = useCallback(async () => {
    if (!menu.id) return;

    await mutateDeleteChatMessage(menu.id);

    openSnackBar({ message: '삭제가 완료되었어요' });
    closeMenu();
  }, [menu.id]);

  const copyText = useCallback(() => {
    window.navigator.clipboard.writeText(menu.content || '').then(() => {
      openSnackBar({ message: '복사가 완료되었어요' });
    });

    closeMenu();
  }, [menu.content]);

  const handleNotice = useCallback(() => {
    mutateChatMessage({ content: menu.content || '', type: CHAT_TYPE.notice });
    closeMenu();
  }, [menu.content]);

  return { menu, closeMenu, copyText, deleteChat, handleNotice };
};
