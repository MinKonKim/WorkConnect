import { useGetPrefetchChannelInfo } from '@/hooks/queries/useChannel';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ChatHeader from './_feature/ChatHeader';
import ChatList from './_feature/ChatList';
import MessageForm from './_feature/MessageForm';
import Sidebar from './_feature/Sidebar';
import ContextMenu from './_feature/ContextMenu';

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
