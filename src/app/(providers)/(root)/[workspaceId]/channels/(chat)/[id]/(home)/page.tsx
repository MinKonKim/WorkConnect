import { useGetPrefetchChannelInfo } from '@/hooks/queries/useChannel';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ChatList from './_feature/ChatList';
import ContextMenu from './_feature/ContextMenu';
import ChatHeader from './_feature/ChatHeader';
import Sidebar from './_feature/Sidebar';
import MessageForm from './_feature/MessageForm';

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = await useGetPrefetchChannelInfo(Number(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatHeader />
      <ChatList />
      <MessageForm />
      <Sidebar />
      <ContextMenu />
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
