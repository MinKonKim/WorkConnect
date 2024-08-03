import { useRef } from 'react';
import { useMutationChatMessage } from '../../../_hooks/useMutationChat';
import MessageTextarea from '../MessageTextarea';
import UtilsMenu from '../UtilsMenu';
import ContextMenu from '../ContextMenu';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';

type ChatFooterProps = {
  id: string;
  handleOpenUtil: () => void;
};

const ChatFooter = ({ id, handleOpenUtil }: ChatFooterProps) => {
  const workspaceUserId = useWorkspaceUserId();
  const ref = useRef<HTMLTextAreaElement>(null);
  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(id),
    workspace_user_id: workspaceUserId
  });

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ref.current?.value || ref.current?.value.trim() === '') return;

    mutateChatMessage({ content: ref.current.value, type: 'text' });
    ref.current.value = '';
  };

  return (
    <div className="relative z-50">
      <form onSubmit={handleSendMessage}>
        <MessageTextarea handleOpenUtil={handleOpenUtil} ref={ref} />
      </form>
      <UtilsMenu handleOpenUtil={handleOpenUtil} />
      <ContextMenu />
    </div>
  );
};

export default ChatFooter;
