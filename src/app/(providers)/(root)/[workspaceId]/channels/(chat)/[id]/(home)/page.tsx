import { useGetPrefetchChannelInfo } from '@/hooks/queries/useChannel';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ChatHeader from './_feature/ChatHeader';
import ChatList from './_feature/ChatList';
import MessageForm from './_feature/MessageForm';

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = await useGetPrefetchChannelInfo(Number(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatHeader />
      <ChatList />
      <MessageForm />
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
